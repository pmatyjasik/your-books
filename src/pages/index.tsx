import type { NextPage } from 'next';
import UnauthorizedPage from 'templates/UnauthorizedPage';

const Home: NextPage = () => {
	return (
		<UnauthorizedPage title={'Home'} content={'Home'}>
			<h1>Strona główna</h1>
		</UnauthorizedPage>
	);
};

export default Home;
