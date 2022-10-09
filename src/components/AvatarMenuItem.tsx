import React from 'react';

interface AvatarMenuItemuProps {
	onClick: () => void;
	children: React.ReactNode;
	logout?: boolean;
}

const AvatarMenuItemu = ({
	children,
	onClick,
	logout,
}: AvatarMenuItemuProps) => {
	return (
		<a
			className={`rounded-lg block px-4 py-2 text-base text-white cursor-pointer ${
				logout ? `hover:bg-red-600` : `hover:bg-primary`
			}`}
			onClick={onClick}
		>
			{children}
		</a>
	);
};

export default AvatarMenuItemu;
