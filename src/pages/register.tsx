import type { NextPage } from 'next';
import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { googleLogin, auth, facebookLogin } from '../firebase/firebase';
import Google from 'assets/google.svg';
import Facebook from 'assets/facebook.svg';
import Button from 'components/Button';
import Input from 'components/Input';
import register from 'assets/register.json';
import { useRouter } from 'next/router';
import Lottie from 'lottie-react';
import HeadInformation from 'components/HeadInformation';

const initialValues = {
	firstName: '',
	lastName: '',
	email: '',
	password: '',
	repeatPassword: '',
	message: '',
};

type FormValues = typeof initialValues;

const RegisterSchema = Yup.object().shape({
	firstName: Yup.string().required('Required field'),
	lastName: Yup.string().required('Required field'),
	email: Yup.string()
		.email('Incorrect email addressl')
		.required('Required field'),
	password: Yup.string()
		.matches(
			/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
			'The password must contain at least 8 characters, including at least one letter and a number. No special characters.'
		)
		.required('Required field'),
	repeatPassword: Yup.string()
		.required('Passwords must be the same')
		.oneOf([Yup.ref('password'), null], 'Passwords must be the same'),
});

const Register: NextPage = () => {
	const router = useRouter();

	const handleGoogleLogin = () => {
		googleLogin(() => router.push('/profile'));
	};

	const handleFacebookLogin = () => {
		facebookLogin(() => router.push('/profile'));
	};

	const onSubmit = async (
		values: FormValues,
		{ resetForm, setFieldError }: FormikHelpers<FormValues>
	) => {
		try {
			const res = await createUserWithEmailAndPassword(
				auth,
				values.email,
				values.password
			);
			if (res.user && auth.currentUser) {
				updateProfile(auth.currentUser, {
					displayName: `${values.firstName} ${values.lastName}`,
				});
			}
			resetForm();
			router.push('/login');
		} catch (e) {
			setFieldError('message', 'Ops! Something go wrong.');
		}
	};
	return (
		<>
			<HeadInformation title={'Register'} content={'Register'} />
			<div className="flex justify-center p-6 text-white border border-solid rounded-lg shadow-xl bg-secondary border-secondary">
				<div className="items-center justify-center hidden w-1/2 lg:flex">
					<Lottie
						animationData={register}
						loop={true}
						className="md:h-96 lg:h-[30rem]"
					/>
				</div>
				<div className="flex flex-col items-center justify-center lg:items-center md:items-center md:w-full lg:w-1/2">
					<h3 className="px-4 mb-4 text-2xl font-bold">Register</h3>
					<Formik
						initialValues={initialValues}
						onSubmit={onSubmit}
						validationSchema={RegisterSchema}
					>
						{({ values, errors, handleChange, handleSubmit, touched }) => (
							<Form className="flex flex-col w-64 sm:w-80">
								<Input
									type="text"
									value={values.firstName}
									error={touched.firstName ? errors.firstName : ''}
									required
									placeholder="First name"
									onChange={handleChange('firstName')}
								/>
								<Input
									type="text"
									value={values.lastName}
									error={touched.lastName ? errors.lastName : ''}
									required
									placeholder="Last name"
									onChange={handleChange('lastName')}
								/>
								<Input
									type="email"
									value={values.email}
									error={touched.email ? errors.email : ''}
									required
									placeholder="E-mail"
									onChange={handleChange('email')}
								/>
								<Input
									type="password"
									value={values.password}
									error={touched.password ? errors.password : ''}
									required
									placeholder="Password"
									onChange={handleChange('password')}
								/>
								<Input
									type="password"
									value={values.repeatPassword}
									error={touched.repeatPassword ? errors.repeatPassword : ''}
									required
									placeholder="Repeat password"
									onChange={handleChange('repeatPassword')}
								/>
								<p className="self-center max-w-sm mb-4 text-sm text-center text-red-300">
									{errors.message}
								</p>
								<Button onClick={handleSubmit}>Register</Button>
								<div className="flex flex-row justify-between mt-4">
									<Button outline onClick={handleGoogleLogin}>
										<Google width={25} height={25} />
									</Button>
									<Button outline onClick={handleFacebookLogin}>
										<Facebook width={25} height={25} />
									</Button>
								</div>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		</>
	);
};

export default Register;
