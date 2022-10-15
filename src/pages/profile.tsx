import type { NextPage } from 'next';
import GridItem from 'components/GridItem';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, logout } from '../firebase/firebase';
import StatsItem from 'components/StatsItem';
import router from 'next/router';
import Lottie from 'lottie-react';
import profile from 'assets/profile.json';
import HeadInformation from 'components/HeadInformation';

const Profil: NextPage = () => {
	const [user] = useAuthState(auth);

	const handleLogout = () => {
		logout(() => router.push('/login'));
	};

	return (
		<>
			<HeadInformation title={'Profile'} content={'Profile'} />
			<div className="rounded-lg shadow-xl bg-secondary">
				<div className="w-full border rounded-t-lg shadow-md bg-secondary">
					<ul className="text-xl font-bold text-center text-white divide-x sm:flex">
						<li className="w-full">
							<p className="inline-block w-full p-4 text-white rounded-t-lg bg-primary">
								{user?.displayName || 'User name'}
							</p>
						</li>
					</ul>
					<div className="w-full text-center">
						<p className="inline-block w-full p-4 text-base text-white bg-secondary">
							Your statistics
						</p>
					</div>
					<div className="border-t border-secondary">
						<dl className="grid max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto text-white sm:grid-cols-2 xl:grid-cols-4 sm:p-8">
							<StatsItem title={'10'} subtitle={'To read'} />
							<StatsItem title={'3'} subtitle={'Reading'} />
							<StatsItem title={'7'} subtitle={'Read'} />
							<StatsItem title={'0'} subtitle={'Notes'} />
						</dl>
					</div>
				</div>
				<div className="items-center block md:flex">
					<div className="grid gap-2 py-2 rounded-lg md:w-1/2 md:grid-cols-1">
						<GridItem cardTitle="News" onClick={() => router.push('/news')} />
						<GridItem cardTitle="Books" onClick={() => router.push('/books')} />
						<GridItem cardTitle="Notes" onClick={() => router.push('/notes')} />
						<GridItem
							cardTitle="Settings"
							onClick={() => router.push('/settings')}
						/>
						<GridItem cardTitle="Logout" onClick={handleLogout} logout={true} />
					</div>
					<div className="hidden md:block">
						<Lottie
							animationData={profile}
							loop={true}
							className="md:h-80 lg:h-[35rem]"
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default Profil;
