import React from 'react';
import Image, { StaticImageData } from 'next/image';

interface CardProps {
	title: string;
	description: string;
	src: string | StaticImageData;
}

const Card = ({ src, title, description }: CardProps) => {
	return (
		<div className="border rounded-lg shadow-xl bg-primary border-primary">
			<Image src={src} alt="Search" className="rounded-lg" />
			<div className="p-5">
				<h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
					{title}
				</h5>
				<p className="mb-3 font-normal text-white">{description}</p>
			</div>
		</div>
	);
};

export default Card;
