import React, { useRef } from 'react';
import { useCloseComponent } from 'hooks/useCloseComponent';
import AvatarMenuItemu from 'components/AvatarMenuItem';
import router from 'next/router';
import { auth, logout } from '../firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const AvatarMenu = () => {
	const wrapperRef = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useCloseComponent(wrapperRef);
	const [user] = useAuthState(auth);

	const toggle = () => {
		setIsOpen((prev) => !prev);
		console.log(user);
	};

	const handleLogout = () => {
		logout(() => router.push('/login'));
	};

	return (
		<div ref={wrapperRef} className="relative" onClick={toggle}>
			<div className="relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full w-14 h-14">
				<span className="font-medium text-white">U</span>
			</div>
			{isOpen && (
				<div className="absolute right-0 z-10 mt-4 origin-top-right rounded-md shadow-lg w-36 bg-main">
					<div className="py-1 bg-gray-700 border border-gray-600 rounded-lg">
						<AvatarMenuItemu onClick={() => router.push('/profile')}>
							Profile
						</AvatarMenuItemu>
						<AvatarMenuItemu onClick={() => router.push('/books')}>
							Books
						</AvatarMenuItemu>
						<AvatarMenuItemu onClick={() => router.push('/notes')}>
							Notes
						</AvatarMenuItemu>
						<AvatarMenuItemu onClick={() => router.push('/settings')}>
							Settings
						</AvatarMenuItemu>
						<AvatarMenuItemu onClick={handleLogout}>Logout</AvatarMenuItemu>
					</div>
				</div>
			)}
		</div>
	);
};

export default AvatarMenu;
