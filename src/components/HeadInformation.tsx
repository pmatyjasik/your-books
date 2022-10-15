import Head from 'next/head';
import React from 'react';

interface HeadInformationProps {
	title: string;
	content: string;
}

const HeadInformation = ({ title, content }: HeadInformationProps) => {
	return (
		<Head>
			<title>{title}</title>
			<meta name="description" content={content} />
			<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			<link rel="icon" href="/favicon.ico" />
		</Head>
	);
};

export default HeadInformation;
