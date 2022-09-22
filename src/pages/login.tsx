import type { NextPage } from 'next';
import UnauthorizedPage from 'templates/UnauthorizedPage';
import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { GoogleLogin, auth } from '../firebase/firebase';
import Google from 'assets/google.svg';
import Facebook from 'assets/facebook.svg';
import Button from 'components/Button';
import Input from 'components/Input';
import login from 'assets/login.json';
import { useRouter } from 'next/router';
import Lottie from 'lottie-react';

const initialValues = {
	email: '',
	password: '',
	message: '',
};

type FormValues = typeof initialValues;

const LoginSchema = Yup.object().shape({
	email: Yup.string()
		.email('Niepoprawny adres email')
		.required('Pole wymagane'),
	password: Yup.string()
		.matches(
			/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
			'Hasło musi zawierać przynajmniej 8 znaków, w tym co najmniej jedną literę i cyfrę'
		)
		.required('Pole wymagane'),
});

const Login: NextPage = () => {
	const router = useRouter();

	const handleGoogleLogin = () => {
		GoogleLogin(() => router.push('/profil'));
	};

	const onSubmit = async (
		values: FormValues,
		{ resetForm, setFieldError }: FormikHelpers<FormValues>
	) => {
		try {
			await signInWithEmailAndPassword(auth, values.email, values.password);
			resetForm();
			router.push('/profil');
		} catch (e) {
			setFieldError('message', 'Coś poszło nie tak');
		}
	};
	return (
		<UnauthorizedPage title={'Login'} content={'Login'}>
			<div className="flex justify-center p-6 text-white border border-solid rounded-lg shadow-xl bg-secondary border-secondary">
				<div className="items-center justify-center hidden w-1/2 lg:flex">
					<Lottie
						animationData={login}
						loop={true}
						className="md:h-96 lg:h-[30rem]"
					/>
				</div>
				<div className="flex flex-col items-center justify-center lg:items-center md:items-center md:w-full lg:w-1/2">
					<h3 className="px-4 mb-4 text-2xl font-bold">Login</h3>
					<Formik
						initialValues={initialValues}
						onSubmit={onSubmit}
						validationSchema={LoginSchema}
					>
						{({ values, errors, handleChange, handleSubmit, touched }) => (
							<Form className="flex flex-col w-64 sm:w-80">
								<Input
									type="text"
									value={values.email}
									required
									error={touched.email ? errors.email : undefined}
									placeholder="E-mail"
									onChange={handleChange('email')}
								/>
								<Input
									type="password"
									value={values.password}
									error={touched.password ? errors.password : undefined}
									required
									placeholder="Password"
									onChange={handleChange('password')}
								/>
								<p className="text-red-300">{errors.message}</p>
								<Button onClick={handleSubmit}>Login</Button>
								<div className="flex flex-row justify-between mt-4">
									<Button outline onClick={handleGoogleLogin}>
										<Google width={25} height={25} />
									</Button>
									<Button outline onClick={handleGoogleLogin}>
										<Facebook width={25} height={25} />
									</Button>
								</div>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		</UnauthorizedPage>
	);
};

export default Login;
