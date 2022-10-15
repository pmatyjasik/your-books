import React, { useEffect } from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase';
import { useRouter } from 'next/router';

interface AuthorizedPageProps {
	children: React.ReactNode;
}

const unAuthorizedPages = ['/', '/login', '/register', '/404'];

const PageTemplate = ({ children }: AuthorizedPageProps) => {
	const [currentUser, loading] = useAuthState(auth);
	const router = useRouter();
	const authorizedPage = !unAuthorizedPages.includes(router.route);

	useEffect(() => {
		if (currentUser && !authorizedPage) {
			router.push('/profile');
		} else if (authorizedPage && !currentUser) {
			router.push('/login');
		}
	}, [authorizedPage, currentUser, router]);

	if (
		loading ||
		(authorizedPage && !currentUser) ||
		(!authorizedPage && currentUser)
	) {
		return null;
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
