import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import React from 'react';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { fetchBook } from 'service/books';
import HeadInformation from 'components/HeadInformation';
import AuthorizedPage from 'hoc/Authorized';

const Book: NextPage = () => {
	const router = useRouter();
	const bookID = typeof router.query?.id === 'string' ? router.query.id : '';
	const { isSuccess, data, isLoading, isError } = useQuery(
		['volumes', bookID],
		() => fetchBook(bookID),
		{
			enabled: bookID.length > 0,
		}
	);

	return (
		<>
			<HeadInformation
				title={data.volumeInfo.title}
				content={data.volumeInfo.title}
			/>
			{isLoading && <p className="pl-10 text-xl text-black">Loading...</p>}
			{isError && <p className="pl-10 text-xl text-black">Error</p>}
			{isSuccess && (
				<>
					<p className="pl-10 text-xl text-black">{data.id}</p>
					<p className="pl-10 text-xl text-black">{data.volumeInfo.title}</p>
					<p className="pl-10 text-xl text-black">
						{data.volumeInfo.description}
					</p>
					<p className="pl-10 text-xl text-black">
						{data.volumeInfo.categories}
					</p>
					<p className="pl-10 text-xl text-black">
						{data.volumeInfo.publishedDate}
					</p>
					<p className="pl-10 text-xl text-black">{data.volumeInfo.authors}</p>
				</>
			)}
		</>
	);
};

export default AuthorizedPage(Book);

export const getStaticProps: GetStaticProps = async (context) => {
	const id = context.params?.id as string;
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery(['volumes', id], () => fetchBook(id));

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: [],
		fallback: 'blocking',
	};
};
