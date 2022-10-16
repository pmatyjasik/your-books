import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase';
import { useRouter } from 'next/router';
import { ComponentType, useEffect } from 'react';

const UnAuthorizedPage = (WrappedComponent: ComponentType) => {
	const HocComponent = ({ ...props }) => {
		const [user, loading, error] = useAuthState(auth);
		const isLoggedIn = user && !error;
		const router = useRouter();

		useEffect(() => {
			if (isLoggedIn && !loading) {
				router.push('/profile');
			}
		}, [isLoggedIn, loading, router]);

		if (!isLoggedIn) {
			return <WrappedComponent {...props} />;
		}
		return null;
	};

	return HocComponent;
};

export default UnAuthorizedPage;
