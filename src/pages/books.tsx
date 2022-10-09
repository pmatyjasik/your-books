import type { NextPage } from 'next';
import AuthorizedPage from 'templates/AuthorizedPage';

const Books: NextPage = () => {
	return (
		<AuthorizedPage title={'Books'} content={'Books'}>
			<h1>Books</h1>
		</AuthorizedPage>
	);
};

export default Books;
