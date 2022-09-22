import type { NextPage } from 'next';
import UnauthorizedPage from 'templates/UnauthorizedPage';

const Login: NextPage = () => {
	return (
		<UnauthorizedPage title={'Login'} content={'Login'}>
			<h1>Login</h1>
		</UnauthorizedPage>
	);
};

export default Login;
