import React from 'react';

interface AvatarMenuItemuProps {
	onClick: () => void;
	children: React.ReactNode;
}

const AvatarMenuItemu = ({ children, onClick }: AvatarMenuItemuProps) => {
	return (
		<a
			className="block px-4 py-2 text-base text-white cursor-pointer hover:bg-primary"
			onClick={onClick}
		>
			{children}
		</a>
	);
};

export default AvatarMenuItemu;
