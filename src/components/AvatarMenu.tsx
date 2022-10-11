import React, { useRef } from 'react';
import { useCloseComponent } from 'hooks/useCloseComponent';
import AvatarMenuItemu from 'components/AvatarMenuItem';
import router from 'next/router';
import { auth, logout } from '../firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
	BsFillArrowDownCircleFill,
	BsFillArrowUpCircleFill,
} from 'react-icons/bs';

import { CgProfile } from 'react-icons/cg';

const AvatarMenu = () => {
	const wrapperRef = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useCloseComponent(wrapperRef);
	const [user] = useAuthState(auth);

	const toggle = () => {
		setIsOpen((prev) => !prev);
	};

	const handleLogout = () => {
		logout(() => router.push('/login'));
	};

	return (
		<div ref={wrapperRef} className="relative" onClick={toggle}>
			{
				<div className="relative inline-flex items-center justify-center px-4 py-2 overflow-hidden bg-gray-600 rounded-full">
					<p className="flex items-center text-lg font-medium text-white">
						<span className="hidden md:block">
							{user?.displayName ? user?.displayName : ''}
						</span>
						<CgProfile className="block w-8 h-8 md:hidden" />
						{isOpen ? (
							<BsFillArrowUpCircleFill className="ml-2" />
						) : (
							<BsFillArrowDownCircleFill className="ml-2" />
						)}
					</p>
				</div>
			}
			{isOpen && (
				<div className="absolute right-0 z-10 mt-4 origin-top-right rounded-md shadow-lg w-max md:w-40 bg-main">
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
						<AvatarMenuItemu logout={true} onClick={handleLogout}>
							Logout
						</AvatarMenuItemu>
					</div>
				</div>
			)}
		</div>
	);
};

export default AvatarMenu;
