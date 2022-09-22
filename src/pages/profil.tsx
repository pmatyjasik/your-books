import type { NextPage } from 'next';
import AuthorizedPage from 'templates/AuthorizedPage';

const Profile: NextPage = () => {
	return (
		<AuthorizedPage title={'Strona główna'} content={'Strona główna'}>
			<h1>Profil</h1>
		</AuthorizedPage>
	);
};

export default Profile;
