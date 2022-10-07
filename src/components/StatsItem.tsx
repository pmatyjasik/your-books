import React from 'react';

interface StatsItemProps {
	title: string;
	subtitle: string;
}

const StatsItem = ({ title, subtitle }: StatsItemProps) => {
	return (
		<div className="flex flex-col items-center justify-center">
			<dt className="mb-2 text-3xl font-extrabold">{title}</dt>
			<dd className="font-light text-gray-400 ">{subtitle}</dd>
		</div>
	);
};

export default StatsItem;
