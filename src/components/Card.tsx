import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { motion } from 'framer-motion';

interface CardProps {
	title: string;
	description: string;
	src: string | StaticImageData;
}

const Card = ({ src, title, description }: CardProps) => {
	return (
		<motion.div
			className="border rounded-lg shadow-xl bg-primary border-primary"
			initial={{ opacity: 0.8, scale: 0.9, x: -100 }}
			whileInView={{ opacity: 1, scale: 1, x: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.5 }}
		>
			<Image src={src} alt="Search" className="rounded-lg" />
			<div className="p-5">
				<h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
					{title}
				</h5>
				<p className="mb-3 font-normal text-white">{description}</p>
			</div>
		</motion.div>
	);
};

export default Card;
