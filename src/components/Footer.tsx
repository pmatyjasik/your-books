import React from 'react';

const Footer = () => {
	return (
		<footer className="p-4 shadow bg-secondary md:p-4">
			<p className="text-base text-center text-white">
				&copy; {new Date().getFullYear()} - Piotr Matyjasik
			</p>
		</footer>
	);
};

export default Footer;
