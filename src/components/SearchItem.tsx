import Link from 'next/link';
import React from 'react';

interface SearchItemProps {
	title: string;
	author: string;
	id: string;
	onClick?: () => void;
}

const SearchItem = ({ title, author, id, onClick }: SearchItemProps) => {
	return (
		<Link href={`/book/${id}`} key={id}>
			<p className="pl-10 text-xl text-white cursor-pointer" onClick={onClick}>
				{title}
				{author}
			</p>
		</Link>
	);
};

export default React.memo(SearchItem);
