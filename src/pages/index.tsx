import HeadInformation from 'components/HeadInformation';
import UnAuthorizedPage from 'hoc/UnAuthorized';
import type { NextPage } from 'next';

const Home: NextPage = () => {
	return (
		<>
			<HeadInformation title={'Your Books'} content={'Your Books'} />
			<h1>Strona główna</h1>
		</>
	);
};

export default UnAuthorizedPage(Home);
