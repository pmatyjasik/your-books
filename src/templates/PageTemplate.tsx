import React, { useEffect } from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase';
import { useRouter } from 'next/router';
import Loader from 'components/Loader';

interface AuthorizedPageProps {
	children: React.ReactNode;
}

const unAuthorizedPages = ['/', '/login', '/register'];

const PageTemplate = ({ children }: AuthorizedPageProps) => {
	const [currentUser, loading] = useAuthState(auth);
	const router = useRouter();
	const authorizedPage = !unAuthorizedPages.includes(router.route);

	useEffect(() => {
		if (router.route === '/404') return;
		if (currentUser && !authorizedPage) {
			router.push('/profile');
		} else if (authorizedPage && !currentUser) {
			setTimeout(() => {
				router.push('/login');
			}, 300);
		}
	}, [authorizedPage, currentUser, router]);

	if (
		router.route !== '/404' &&
		(loading ||
			(authorizedPage && !currentUser) ||
			(!authorizedPage && currentUser))
	) {
		return <Loader />;
	}

	return (
		<div>
			<Header authorized={!!currentUser} />
			<div className="container px-5 py-6 mx-auto min-h-[85.3vh]">
				{children}
			</div>
			<Footer />
		</div>
	);
};

export default PageTemplate;
