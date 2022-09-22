import React, { useEffect } from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Head from 'next/head';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase';
import { useRouter } from 'next/router';

interface AuthorizedPageProps {
	children: React.ReactNode;
	title: string;
	content: string;
}

const AuthorizedPage = ({ title, content, children }: AuthorizedPageProps) => {
	const [user, loading, error] = useAuthState(auth);
	const isLoggedIn = user && !error;
	const router = useRouter();

	useEffect(() => {
		if (!isLoggedIn && !loading) {
			router.push('/');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoggedIn, loading]);
	if (loading) {
		return null;
	}
	return (
		<div>
			{isLoggedIn && (
				<>
					<Head>
						<title>{title}</title>
						<meta name="description" content={content} />
						<meta
							name="viewport"
							content="initial-scale=1.0, width=device-width"
						/>
						<link rel="icon" href="/favicon.ico" />
					</Head>
					<Header authorized={true} />
					<div className="container px-5 py-3 mx-auto min-h-[85.3vh]">
						{children}
					</div>
					<Footer />
				</>
			)}
		</div>
	);
};

export default AuthorizedPage;
