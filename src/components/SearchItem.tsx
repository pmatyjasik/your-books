import Link from 'next/link';
import React from 'react';
import { AiOutlineBook } from 'react-icons/ai';
import Image from 'next/image';

interface SearchItemProps {
	title: string;
	authors: string[];
	id: string;
	publishedDate?: string;
	imageLinks?: { thumbnail: string };
	onClick?: () => void;
}

const SearchItem = ({
	title,
	authors,
	id,
	publishedDate,
	imageLinks,
	onClick,
}: SearchItemProps) => {
	return (
		<Link href={`/book/${id}`} key={id}>
			<div
				className="flex flex-row pt-2 pb-2 shadow-md cursor-pointer hover:bg-primary"
				onClick={onClick}
			>
				<div className="flex items-center justify-center w-1/5">
					{imageLinks ? (
						<Image
							loader={() => imageLinks.thumbnail}
							unoptimized={true}
							src={imageLinks.thumbnail}
							width={50}
							height={50}
							alt="Thumnbail"
						/>
					) : (
						<AiOutlineBook className="text-4xl text-white w-[50px] h-[50px] opacity-50" />
					)}
				</div>
				<div className="flex flex-col w-4/5">
					<p className="pr-2 text-sm font-bold text-white">{title}</p>
					{authors ? (
						<p className="pr-2 text-sm text-white">{authors[0]}</p>
					) : (
						<p className="pr-2 text-sm text-white">-</p>
					)}
					{publishedDate ? (
						<p className="pr-2 text-sm text-white">
							{publishedDate?.split('-')[0]}
						</p>
					) : (
						<p className="pr-2 text-sm text-white">-</p>
					)}
				</div>
			</div>
		</Link>
	);
};

export default React.memo(SearchItem);
