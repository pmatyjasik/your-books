import React from 'react';

interface GridItemProps {
	cardTitle: string;
	onClick: () => void;
	logout?: boolean;
}

const GridItem = ({ cardTitle, onClick, logout }: GridItemProps) => {
	return (
		<div
			onClick={onClick}
			className={`cursor-pointer flex-col items-center justify-center p-8 text-center rounded-lg bg-secondary  ${
				logout ? `hover:bg-red-600` : `hover:bg-primary`
			}`}
		>
			<div className="flex items-center justify-center space-x-3">
				<div className="space-y-0.5 font-bold text-xl text-white text-left">
					<div>{cardTitle.toUpperCase()}</div>
				</div>
			</div>
		</div>
	);
};

export default GridItem;
