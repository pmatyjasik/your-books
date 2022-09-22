import type { NextPage } from 'next';
import AuthorizedPage from 'templates/AuthorizedPage';

const Profil: NextPage = () => {
	return (
		<AuthorizedPage title={'Profile'} content={'Profile'}>
			<h1>Profile</h1>
		</AuthorizedPage>
	);
};

export default Profil;
