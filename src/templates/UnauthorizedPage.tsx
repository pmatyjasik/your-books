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
}

const UnauthorizedPage = ({
	title,
	content,
	children,
}: UnauthorizedPageProps) => {
	const [user, loading] = useAuthState(auth);
	const router = useRouter();
	useEffect(() => {
		if (user) {
			router.push('/profil');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);
	if (loading) {
		return null;
	}
	if (!user) {
		return (
			<div>
				<Head>
					<title>{title}</title>
					<meta name="description" content={content} />
					<meta
						name="viewport"
						content="initial-scale=1.0, width=device-width"
					/>
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<Header authorized={false} />
				<div className="container px-5 py-3 mx-auto min-h-[85.3vh]">
					{children}
				</div>
				<Footer />
			</div>
		);
	}
};

export default UnauthorizedPage;
