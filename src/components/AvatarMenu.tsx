import React, { useRef } from 'react';
import Avatar from 'assets/avatar.svg';
import { useCloseComponent } from 'hooks/useCloseComponent';
import AvatarMenuItemu from 'components/AvatarMenuItem';
import router from 'next/router';
import { logout } from '../firebase/firebase';

const AvatarMenu = () => {
	const wrapperRef = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useCloseComponent(wrapperRef);

	const toggle = () => {
		setIsOpen((prev) => !prev);
	};

	const handleLogout = () => {
		logout(() => router.push('/profile'));
	};

	return (
		<div ref={wrapperRef} className="relative">
			<Avatar className="rounded-full cursor-pointer" onClick={toggle} />
			{isOpen && (
				<div className="absolute right-0 z-10 mt-4 origin-top-right rounded-md shadow-lg w-36 bg-main">
					<div className="py-1 bg-gray-700 border border-gray-600 rounded-lg">
						<AvatarMenuItemu onClick={() => router.push('/ustawienia')}>
							Ustawienia
						</AvatarMenuItemu>
						<AvatarMenuItemu onClick={() => router.push('/ustawienia')}>
							Ksiąźki
						</AvatarMenuItemu>
						<AvatarMenuItemu onClick={() => router.push('/ustawienia')}>
							Notatki
						</AvatarMenuItemu>
						<AvatarMenuItemu onClick={() => router.push('/ustawienia')}>
							Zarządzanie
						</AvatarMenuItemu>
						<AvatarMenuItemu onClick={() => router.push('/ustawienia')}>
							Ustawienia
						</AvatarMenuItemu>
						<AvatarMenuItemu onClick={handleLogout}>Wyloguj</AvatarMenuItemu>
					</div>
				</div>
			)}
		</div>
	);
};

export default AvatarMenu;
