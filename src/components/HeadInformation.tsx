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
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
			/>
			<meta name="theme-color" content="#111827" />
			<link rel="icon" href="/favicon.ico" />
		</Head>
	);
};

export default HeadInformation;
