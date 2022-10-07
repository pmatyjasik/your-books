import type { NextPage } from 'next';
import AuthorizedPage from 'templates/AuthorizedPage';
import GridItem from 'components/GridItem';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, logout } from '../firebase/firebase';
import StatsItem from 'components/StatsItem';
import router from 'next/router';

const Profil: NextPage = () => {
	const [user] = useAuthState(auth);

	const handleLogout = () => {
		logout(() => router.push('/login'));
	};

	return (
		<AuthorizedPage title={'Profile'} content={'Profile'}>
			<div className="w-full border rounded-lg shadow-md bg-secondary">
				<ul className="text-xl font-bold text-center text-white divide-x rounded-lg sm:flex">
					<li className="w-full">
						<p className="inline-block w-full p-4 text-white rounded-t-lg bg-primary">
							{user?.displayName || 'User name'}
						</p>
						<li className="w-full">
							<p className="inline-block w-full p-4 text-base text-white rounded-t-lg bg-secondary">
								Your statistics
							</p>
						</li>
					</li>
				</ul>
				<div className="border-t border-secondary">
					<dl className="grid max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto text-white sm:grid-cols-2 xl:grid-cols-4 sm:p-8">
						<StatsItem title={'10'} subtitle={'To read'} />
						<StatsItem title={'3'} subtitle={'Reading'} />
						<StatsItem title={'7'} subtitle={'Read'} />
						<StatsItem title={'0'} subtitle={'Notes'} />
					</dl>
				</div>
			</div>
			<div className="grid gap-4 py-10 mb-8 rounded-lg md:mb-12 md:grid-cols-2">
				<GridItem cardTitle="Books" onClick={() => router.push('/books')} />
				<GridItem cardTitle="Notes" onClick={() => router.push('/notes')} />
				<GridItem
					cardTitle="Settings"
					onClick={() => router.push('/settings')}
				/>
				<GridItem cardTitle="Logout" onClick={handleLogout} logout={true} />
			</div>
		</AuthorizedPage>
	);
};

export default Profil;
