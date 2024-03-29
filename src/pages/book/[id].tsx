import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { fetchBook } from 'service/book/fetchBooks';
import HeadInformation from 'components/HeadInformation';
import AuthorizedPage from 'hoc/Authorized';
import { SpinnerCircular } from 'spinners-react';
import Image from 'next/image';
import { AiOutlineBook } from 'react-icons/ai';
import Button from 'components/Button';
import { Book } from 'service/book/types';
import {
	auth,
	addBookToCollection,
	deleteBookFromCollection,
	isBookAdded,
	getBookFromCollection,
	updateBookNoteInCollection,
	updateBookReccomendationInCollection,
} from '../../firebase/firebase';
import { BookStatus } from '../../firebase/types';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import { motion } from 'framer-motion';

const variants = {
	open: { x: 0, transition: { type: 'linear' } },
	closed: { x: 100, transition: { type: 'linear' } },
};

const Book: NextPage = () => {
	const [booknInCollection, setBooknInCollection] = useState<boolean>(false);
	const [openNotes, setOpenNotes] = useState<boolean>(false);
	const [noteContent, setNoteContent] = useState<string | undefined>();
	const [reccomendation, setReccomendation] = useState<boolean>(false);
	const [bookStatus, setBookStatus] = useState<string>(BookStatus.ToRead);
	const router = useRouter();
	const [user] = useAuthState(auth);
	const bookID = typeof router.query?.id === 'string' ? router.query.id : '';
	const { isSuccess, data, isLoading, isError } = useQuery(
		['volumes', bookID],
		() => fetchBook(bookID),
		{
			enabled: bookID.length > 0,
		}
	);

	useEffect(() => {
		if (user) {
			isBookAdded(bookID, user?.uid).then(setBooknInCollection);
			getBookFromCollection(bookID).then((data) => {
				setBookStatus(data?.status);
				if (bookStatus !== BookStatus.ToRead) {
					setNoteContent(data?.note);
					setReccomendation(data?.reccomendation);
				}
			});
		}
	}, [
		bookID,
		user,
		booknInCollection,
		data?.status,
		data?.note,
		data?.reccomendation,
		bookStatus,
	]);

	const onAdd = () => {
		if (user) {
			addBookToCollection({
				bookID,
				title,
				userUID: user?.uid,
				status: BookStatus.ToRead,
				image: imageLinks?.thumbnail ? imageLinks?.thumbnail : '',
				reccomendation: null,
				note: '',
			});
			setBooknInCollection((prev) => !prev);
			toast.success('Book has been added!');
		}
	};

	const onDelete = () => {
		if (user) {
			deleteBookFromCollection(bookID, user?.uid);
			setBooknInCollection((prev) => !prev);
			setOpenNotes(false);
			toast.success('Book has been deleted!');
		}
	};

	const handleOnSave = () => {
		updateBookNoteInCollection(bookID, noteContent);
		toast.success('Note has been saved!');
	};

	const handleReccomendation = (isReccomended: boolean) => {
		isReccomended ? setReccomendation(true) : setReccomendation(false);
		updateBookReccomendationInCollection(bookID, reccomendation);
	};

	const {
		volumeInfo: {
			title,
			publishedDate,
			authors,
			description,
			categories,
			imageLinks,
		},
	}: Book = data;

	return (
		<>
			<HeadInformation
				title={title ? title : 'Book'}
				content={title ? title : 'Book'}
			/>
			{isLoading && (
				<p className="flex justify-center">
					<SpinnerCircular
						size={270}
						thickness={180}
						speed={270}
						color="#355FE5"
						secondaryColor="#111827"
					/>
				</p>
			)}
			{isError && (
				<p className="pl-10 text-xl text-center text-secondary">
					Ops! Something go wrong.
				</p>
			)}
			{isSuccess && (
				<>
					<motion.div
						className="flex justify-center rounded-lg"
						initial={{ opacity: 0.8, scale: 0.9 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
					>
						<div className="flex flex-col w-full rounded-lg shadow-xl lg:flex-row xl:w-4/5 bg-secondary">
							<div className="w-full border rounded-lg shadow-md lg:w-2/5 border-primary ">
								<div className="flex items-center justify-center p-2 rounded-lg bg-primary">
									{imageLinks?.thumbnail ? (
										<Image
											loader={() => imageLinks.thumbnail}
											unoptimized={true}
											src={imageLinks.thumbnail}
											width={140}
											height={180}
											alt="Thumnbail"
											placeholder="blur"
											blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gIoSUNDX1BST0ZJTEUAAQEAAAIYAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFlaAAABeAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAAAChnVFJDAAABoAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ0AAAB3AAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAFgAAAAcAHMAUgBHAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z3BhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABYWVogAAAAAAAA9tYAAQAAAADTLW1sdWMAAAAAAAAAAQAAAAxlblVTAAAAIAAAABwARwBvAG8AZwBsAGUAIABJAG4AYwAuACAAMgAwADEANv/bAEMAKBweIx4ZKCMhIy0rKDA8ZEE8Nzc8e1hdSWSRgJmWj4CMiqC05sOgqtqtiozI/8va7vX///+bwf////r/5v3/+P/bAEMBKy0tPDU8dkFBdviljKX4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+P/AABEIAgkDcgMBIgACEQEDEQH/xAAXAAEBAQEAAAAAAAAAAAAAAAAAAQIF/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AOUA0gAAAAAAAAAAAAAgAAAAAAgAAAAAAAAAAAAACKgAAAAAAAAAACKgoAAAAAAAAAgAAAAAAIqAAAAAAAAAAAAAAAAAKigAAAAAAAAAAAAAAAAAAAAAAAAAA2A0gAAAAAAAAAAAAAgAAAAIqAAAAAAAAAAAAAAAgAAAAAAAAAAACAKAAAAAAAIAAAAAAAACAAAAAAAAAAAAAAAAAAqAKAAAAAAAAAAAAAAAAAAAAAAAAADYDSAAAAAAAAAAAAAAACACAAAAAAAAAAAAAAAIqAAAAAAAAAAAAgAAoAAAAAAAgAAAAAAIAAAAAAAAAAAAAAAAAAAAAKIoAAAAAAAAAAAAAAAAAAAAAAAANgNIAAAAAAAAAAAAAiCoAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAgCgAAAAAAAACAAAAAgAAAAAAAAAAAAAAAAAAAAAAAKgCgAAAAAAAAAAAAAAAAAAAAAAA2A0gAAAAAAAAIAqAgAAAAAAAAAAAAAAAAAgAAAAAAAAAAAACAKAAAAAAAAAIAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAqAKAAAAAAAAAAAAAAAAAAAAADYg0iiAAAAAAAACAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAIAoAAAAAAAAAAAgAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACoAoAAAAAAAAAAAAAAAAAAANANIAAAIAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAgCgAAAAAAAAAACAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAogCiAKAAAAAAAAAAAAADQCoAAAAAAAAAAAAAAAAAgKIAAAAAAAAAAAAAAACAoAAAAAAAAAAAACAqAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAogCiANgKgAAAACAogCiAKIAAAAAAAAAAAAAAAAAAACAAAoAAAAAAAAAAAAgAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANAKgAAAAAAAAAAAAAAAAAAAAAAAAIAqAAAKAAAAAAAAAAAACAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADQCoAAAAAAAAAAAAAAAACAKIAqAAAAAKAAAAAAAAAAAgKIAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANCCoogCiAKIAogAAAAAAAAAAAAAAKAAAAAAAAAACAKgAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKAqAAAAAAAAAAAAAAoAAAAAAAAAAIAogAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAoCgAAAAAAAAAACAogCiAKIAogCoAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAoAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACgAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAoAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACgAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAoAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACgAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAoAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//Z"
										/>
									) : (
										<AiOutlineBook className="text-white w-[160px] h-[200px] opacity-80" />
									)}
								</div>
								<div className="p-5 text-xl text-white rounded-t-lg rounded-b-lg bg-secondary">
									<p className="inline-block w-full pt-4 text-center ">
										{title ? title : '-'}
									</p>
									<p className="pt-2 text-base font-light text-center">
										{authors
											? authors.map((authors, index, array) => {
													if (array.length === 1) {
														return `${authors}`;
													} else {
														if (array.length - 1 === index) {
															return `${authors}`;
														} else {
															return `${authors}, `;
														}
													}
											  })
											: '-'}
									</p>
									<p className="pt-2 text-base font-light text-center">
										{publishedDate ? publishedDate?.split('-')[0] : '-'}
									</p>
									<p className="pt-2 text-sm font-light text-center">
										{categories ? categories : ''}
									</p>
									<div className="flex justify-center p-4">
										{booknInCollection ? (
											<Button onClick={onDelete}>Remove from table</Button>
										) : (
											<Button onClick={onAdd}>Add to table</Button>
										)}
									</div>
									{bookStatus === BookStatus.Read && (
										<>
											<div className="flex justify-center">
												<Button
													outline
													onClick={() => setOpenNotes((prev) => !prev)}
												>
													{openNotes ? 'Hide note' : 'Show note'}
												</Button>
											</div>
											<div className="flex justify-center p-4">
												<AiFillLike
													className={`${
														reccomendation === true && reccomendation !== null
															? 'text-primary'
															: 'text-white'
													} w-8 h-8 mr-4`}
													onDoubleClick={() =>
														toast.success(
															'Positive reccomendation has beed saved!'
														)
													}
													onClick={() => handleReccomendation(true)}
												/>

												<AiFillDislike
													className={`${
														reccomendation === false && reccomendation !== null
															? 'text-primary'
															: 'text-white'
													} w-8 h-8 ml-4`}
													onDoubleClick={() =>
														toast.success(
															'Negative reccomendation has beed saved!'
														)
													}
													onClick={() => handleReccomendation(false)}
												/>
											</div>
										</>
									)}
									{bookStatus === BookStatus.Reading && (
										<div className="flex justify-center">
											<Button
												outline
												onClick={() => setOpenNotes((prev) => !prev)}
											>
												{openNotes ? 'Hide note' : 'Show note'}
											</Button>
										</div>
									)}
								</div>
							</div>
							<div className="flex items-center justify-center w-full p-2 text-white sm:p-8 lg:w-4/5">
								{description ? (
									<div
										className="first-letter:text-2xl"
										dangerouslySetInnerHTML={{ __html: description }}
									/>
								) : (
									'No description found.'
								)}
							</div>
						</div>
					</motion.div>
					{openNotes && booknInCollection && (
						<motion.div
							className="flex justify-center"
							animate={openNotes ? 'open' : 'closed'}
							initial="closed"
							variants={variants}
						>
							<div className="flex flex-col justify-center w-full mt-4 rounded-lg bg-secondary xl:w-4/5">
								<textarea
									className="flex flex-col w-full p-2 text-white rounded-lg shadow-xl lg:flex-col bg-secondary"
									rows={10}
									onChange={(event) => setNoteContent(event.target.value)}
									value={noteContent}
								/>
								<Button onClick={handleOnSave}>Save note</Button>
							</div>
						</motion.div>
					)}
					<ToastContainer />
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
