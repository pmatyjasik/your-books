import type { NextPage } from 'next';
import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import {
	signInWithGoogle,
	signInWithFacebook,
	signInWithCredentials,
} from '../firebase/firebase';
import Google from 'assets/google.svg';
import Facebook from 'assets/facebook.svg';
import Button from 'components/Button';
import Input from 'components/Input';
import login from 'assets/login.json';
import Lottie from 'lottie-react';
import HeadInformation from 'components/HeadInformation';
import UnAuthorizedPage from 'hoc/UnAuthorized';

const initialValues = {
	email: '',
	password: '',
	message: '',
};

type FormValues = typeof initialValues;

const LoginSchema = Yup.object().shape({
	email: Yup.string()
		.email('Incorrect email address')
		.required('Required field'),
	password: Yup.string()
		.matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Enter correct data')
		.required('Required field'),
});

const Login: NextPage = () => {
	const onSubmit = async (
		values: FormValues,
		{ resetForm, setFieldError }: FormikHelpers<FormValues>
	) => {
		try {
			await signInWithCredentials(values.email, values.password);
			resetForm();
		} catch (e) {
			setFieldError('message', 'Coś poszło nie tak');
		}
	};

	return (
		<>
			<HeadInformation title={'Login'} content={'Login'} />
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
								<p className="self-center max-w-sm mb-4 text-sm text-center text-red-300">
									{errors.message}
								</p>
								<Button onClick={handleSubmit} submit>
									Login
								</Button>
								<div className="flex flex-row justify-between mt-4">
									<Button outline onClick={signInWithGoogle}>
										<Google width={25} height={25} />
									</Button>
									<Button outline onClick={signInWithFacebook}>
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

export default UnAuthorizedPage(Login);
