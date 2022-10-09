import React, { useEffect } from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Head from 'next/head';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase';
import { useRouter } from 'next/router';

interface UnauthorizedPageProps {
	children: React.ReactNode;
	title: string;
	content: string;
	Custom404?: boolean;
}

const UnauthorizedPage = ({
	title,
	content,
	children,
	Custom404,
}: UnauthorizedPageProps) => {
	const [user, loading, error] = useAuthState(auth);
	const isLoggedIn = user && !error;
	const router = useRouter();

	useEffect(() => {
		if (isLoggedIn && !Custom404) {
			router.push('/profile');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoggedIn, loading]);
	if (loading) {
		return null;
	}
	return (
		<div>
			<Head>
				<title>{title}</title>
				<meta name="description" content={content} />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header authorized={false} />
			<div className="container px-5 py-6 mx-auto min-h-[85.3vh]">
				{children}
			</div>
			<Footer />
		</div>
	);
};

export default UnauthorizedPage;
