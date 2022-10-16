import React, { useEffect } from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase';
import { AnimatePresence } from 'framer-motion';
import GlobalLoader from 'components/GlobalLoader';

interface AuthorizedPageProps {
	children: React.ReactNode;
}

const PageTemplate = ({ children }: AuthorizedPageProps) => {
	const [currentUser, loading] = useAuthState(auth);

	return (
		<>
			<AnimatePresence>{loading && <GlobalLoader />}</AnimatePresence>
			<div>
				<Header authorized={!!currentUser} />
				<div className="container px-5 py-6 mx-auto min-h-[85.3vh]">
					{children}
				</div>
				<Footer />
			</div>
		</>
	);
};

export default PageTemplate;
