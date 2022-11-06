import type { NextPage } from 'next';
import useRedirect from 'hooks/useRedirect';
import HeadInformation from 'components/HeadInformation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase';

const Custom404: NextPage = () => {
	const [user] = useAuthState(auth);

	const { secondsRemaining } = useRedirect('/', 5);
	return (
		<>
			<HeadInformation title={'404'} content={'404'} />
			<div className="p-6 text-center text-white border border-solid rounded-lg shadow-xl bg-secondary border-secondary">
				<h1 className="text-2xl font-bold text-white">
					This page cannot be found.
				</h1>
				<h2 className="mt-4 text-xl">
					Redirecting to {user ? 'Profile' : 'Homepage'} in {secondsRemaining}
					{secondsRemaining > 1 ? ' seconds' : ' second'}.
				</h2>
			</div>
		</>
	);
};

export default Custom404;
