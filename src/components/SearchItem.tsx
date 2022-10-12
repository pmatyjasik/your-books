import Link from 'next/link';
import React from 'react';

interface SearchItemProps {
	title: string;
	author: string;
	id: string;
}

const SearchItem = ({ title, author, id }: SearchItemProps) => {
	return (
		<Link href={`/book/${id}`} key={id}>
			<p className="pl-10 text-xl text-white">
				{title}
				{author}
			</p>
		</Link>
	);
};

export default SearchItem;
