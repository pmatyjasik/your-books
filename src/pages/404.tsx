import type { NextPage } from 'next';
import UnauthorizedPage from 'templates/UnauthorizedPage';
import useRedirect from 'hooks/useRedirect';

const Custom404: NextPage = () => {
	const { secondsRemaining } = useRedirect('/', 5);
	return (
		<UnauthorizedPage
			title={'Page not found'}
			content={'Page not found'}
			Custom404={true}
		>
			<div className="p-6 text-center text-white border border-solid rounded-lg shadow-xl bg-secondary border-secondary">
				<h1 className="text-2xl font-bold text-white">
					This page cannot be found.
				</h1>
				<h2 className="mt-4 text-xl">
					Redirecting to homepage in {secondsRemaining}
					{secondsRemaining > 1 ? ' seconds' : ' second'}.
				</h2>
			</div>
		</UnauthorizedPage>
	);
};

export default Custom404;
