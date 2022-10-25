import type { NextPage } from 'next';
import HeadInformation from 'components/HeadInformation';
import AuthorizedPage from 'hoc/Authorized';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import type { DropResult } from 'react-beautiful-dnd';
import { useEffect, useState } from 'react';
import {
	auth,
	getBooksFromCollection,
	updateBookInCollection,
} from '../firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BookColumns, isValidColumn } from 'service/Books/types';
import { BookStatus } from '../firebase/types';
import Link from 'next/link';
import { AiOutlineBook } from 'react-icons/ai';
import Image from 'next/image';

const onDragEnd =
	(
		columns: BookColumns,
		setColumns: React.Dispatch<React.SetStateAction<BookColumns>>
	) =>
	(result: DropResult) => {
		if (!result.destination) return;
		const { source, destination, draggableId } = result;

		if (source.droppableId !== destination.droppableId) {
			const sourceColumn = columns[source.droppableId as keyof BookColumns];
			const destColumn = columns[destination.droppableId as keyof BookColumns];
			if (!isValidColumn(sourceColumn) || !isValidColumn(destColumn)) {
				return;
			}
			const sourceItems = [...sourceColumn.items];
			const destItems = [...destColumn.items];
			const [removed] = sourceItems.splice(source.index, 1);
			destItems.splice(destination.index, 0, removed);
			setColumns({
				...columns,
				[source.droppableId]: {
					...sourceColumn,
					items: sourceItems,
				},
				[destination.droppableId]: {
					...destColumn,
					items: destItems,
				},
			});
			updateBookInCollection(
				draggableId,
				BookStatus[destination.droppableId as keyof typeof BookStatus]
			);
		} else {
			const column = columns[source.droppableId as keyof BookColumns];
			if (!isValidColumn(column)) {
				return;
			}
			const copiedItems = [...column.items];
			const [removed] = copiedItems.splice(source.index, 1);
			copiedItems.splice(destination.index, 0, removed);
			setColumns({
				...columns,
				[source.droppableId]: {
					...column,
					items: copiedItems,
				},
			});
		}
	};

const Books: NextPage = () => {
	const [user] = useAuthState(auth);
	const [columns, setColumns] = useState<BookColumns>({
		Read: {},
		Reading: {},
		ToRead: {},
	});

	useEffect(() => {
		if (user)
			getBooksFromCollection(user?.uid).then((columns) => {
				if (columns) setColumns(columns);
			});
	}, [user]);

	return (
		<>
			<HeadInformation title={'Books'} content={'Books'} />
			<div className="rounded-lg shadow-xl bg-secondary">
				<ul className="text-xl font-bold text-center text-white divide-x sm:flex">
					<li className="w-full">
						<p className="inline-block w-full p-4 text-white rounded-t-lg bg-primary"></p>
					</li>
				</ul>
				<div className="flex h-full overflow-x-auto lg:overflow-hidden lg:justify-evenly scrollbar-track-rounded-lg scrollbar-thumb-rounded-lg scrollbar-thin scrollbar-thumb-primary scrollbar-track-secondary">
					<DragDropContext onDragEnd={onDragEnd(columns, setColumns)}>
						{Object.entries(columns).map(([columnId, column]) => {
							if (!isValidColumn(column)) {
								return;
							}
							return (
								<div
									className="flex flex-col items-center flex-shrink-0 "
									key={columnId}
								>
									<h2 className="mt-4 text-2xl text-white">{column.name}</h2>
									<div className="m-4">
										<Droppable droppableId={columnId} key={columnId}>
											{(provided, snapshot) => {
												return (
													<div
														className={`mb-4 border-2 border-primary rounded-lg p-2 w-[300px] min-h-[500px] ${
															snapshot.isDraggingOver
																? `opacity-80 bg-primary`
																: `opacity-100`
														}`}
														{...provided.droppableProps}
														ref={provided.innerRef}
													>
														{column.items.map((item, index) => {
															return (
																<Draggable
																	key={item.bookID}
																	draggableId={item.bookID}
																	index={index}
																>
																	{(provided, snapshot) => {
																		return (
																			<div
																				ref={provided.innerRef}
																				{...provided.draggableProps}
																				{...provided.dragHandleProps}
																				title={item.title}
																				className={`m-h-[50px] p-4 mb-2 text-white rounded-lg ${
																					snapshot.isDragging
																						? `bg-secondary`
																						: `bg-primary`
																				}`}
																			>
																				<Link href={`/book/${item.bookID}`}>
																					<div className="flex flex-row cursor-pointer">
																						<div className="flex items-center justify-center w-1/5">
																							{item.image ? (
																								<Image
																									loader={() => item.image}
																									unoptimized={true}
																									src={item.image}
																									width={40}
																									height={50}
																									blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gIoSUNDX1BST0ZJTEUAAQEAAAIYAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFlaAAABeAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAAAChnVFJDAAABoAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ0AAAB3AAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAFgAAAAcAHMAUgBHAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z3BhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABYWVogAAAAAAAA9tYAAQAAAADTLW1sdWMAAAAAAAAAAQAAAAxlblVTAAAAIAAAABwARwBvAG8AZwBsAGUAIABJAG4AYwAuACAAMgAwADEANv/bAEMAKBweIx4ZKCMhIy0rKDA8ZEE8Nzc8e1hdSWSRgJmWj4CMiqC05sOgqtqtiozI/8va7vX///+bwf////r/5v3/+P/bAEMBKy0tPDU8dkFBdviljKX4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+P/AABEIAhcDcgMBIgACEQEDEQH/xAAYAAEBAQEBAAAAAAAAAAAAAAAAAQMEAv/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAYAQEBAQEBAAAAAAAAAAAAAAAAAQIDBP/EABYRAQEBAAAAAAAAAAAAAAAAAAARAf/aAAwDAQACEQMRAD8AwAe5yAAAAAAAAAAQBAAAAAABAAAEBFQUAAABAEAAEAAAQEVBQBARUAAQQAAAEARQAEAQAAQBAAARURQAAAABAAAAAAAAEAFAAAAAABUUABQAAAEAAFRVAAAAAAAAAAAAAAHUA9DIAAAAAAAAgAAIAAAAAIAAAAgIqCgAACCAAAAgCAACACgCCAAAIIAAioigAAIAAgIqAAIAAIAigAAAAIgogCoAKIAKgIoAACgAAAAACiKoAAACAAACiiKAAAAAAAAAAAADqAehkAAAABAVAAAQAAAAAAEAABABBQAAABFRAAABAAEAEAAFARAAARUQAAEVEUAARUAAQEVAAEAEFAEAAAAEAQAAAAAAABAAFEVQAAAAAAVBRRFAAAAEAFAABUAUQBQAAAAAAAdQg9DKoCAAAAAAAAAAAIAAAAAAiCoAoAACAAIAAIAAAgIAoAgIAAAIAgAAgCKAAgCACAAIAACAKAIAICoCAAAAAAAAAAAAIAKCoAoigAAAKAAKIAoAgAoAAAAAAAAAAAAAA6gHdkAAAAAAEAUQAAAAAAQAQAAUAAEAAEAABAAAQEAAAUBEAABFRAAAQAAEUQAAEBAAAQEAABFAQAAABAAAAAAABAUQBQBAAABQAAVAFEUABQAAAEFQBRBRRFAAAAAAAAAAB1CDuyAAAAAAAAAAAiCiAAAoAACAqAgAAAgKgAAICAAAKAiAAACAAICKgACKIqAAICAAAAgIAAAIigAAAAIgAAAAAAAAAAAAACKIKKIoAAAAACiiAKICKAAAoAAAAAAAAAAAA6hB2ZUQBRAFEAVAAAAAFAABAFQAAEAAAQAAABEFQAABQQQAAAQABAQAAABBFAAEVEAABAQAAARFAAAQFQEAAAEBRAFEAVABRAFEAUQEUAABQAAVAFEFFEAUAAAQAAAUFQBRAFEAUQBRAHUA7IAAAACAKIAogCoAACAAAIAqAAAACIKgAAAAgqoCACAqAAAgIAAACAigACAgAAIAACAgAAIogAAIAICoAAAACAIAogCiCiiAKIoAAgAoKgCiAKIAoiqAAAAgACiAKIKKIAogCiAKIA6gHZABAAAAABAUQBRAFQAAAAABBBUAAAAQFVAQAABAAAAQQAAAQFQEUBAVAQAQAAAEQVAABEVUAAEBUBABAUQAAQAQFEAUQBRAFEAUQUURQABABRRAFEAUQBQFAAAAFEAUQEUQBRAFEAUQB1AOyAAAAAAAICiAKIAoggAAAACAKICgCACAqAAAAIIAAAICoAACKCAACAIAAACCAAAIIoCAqAACIKgAAiCoAAAAgCiCKogCiCoogCiAKIKKAAAAqCiiAKIAogCgKgAAqAKIAogCiAKIAogDqAdWQAAAAAAQBRAFEAUQFAAAABBBRAAAAEBRBAAABAVAAAQBAUAAEEAAAEAAQAQAAUEEAEBUBABAVAQBAFQEUAAAQAAAAAAAAAFoAFABQAAAUFQEUQBRBRQAAAAAAFAAAAAAAAHUCOrKiAKIAogCiCCiAKIAAAAACAKIAqAAAgCAKIAAAAiCiAoAAIIAAAgCoAAIgqAAIIoAAIAAiCoAAggAIoAgAAAAAAAAAAAAAAAAAAAAAAALQAKAC0AAAFAAQVAFEAUQUUQBRAFEAdQg6sqIAogCiAKIAqAAAACIKIAogCiAAAAICiCCiAoAAIAqAgAgKIAAACCCoAAgAAiggACAqAgCCAAVQBAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFoAFAAoALQAKABQAKABR0AOzAAAAAAAAACAogCiAKIAoggAAAgqiAKIAAACCCiAAAAgCoCACAogACIqoAAICoCAIAAJVAEoAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANxB3ZUQBRAFEAUQBRAFEAUQAAAAAEAUQQUQAAAEAUQBUBABAUQAAAEEUAAEAAEAQAASqAJQAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbCDuyogCoAAAACAAAIAogCiAKIAogAAAIAoggogAAAICqIIAAAgCoCACAoggAJVACgAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0EHZlRAFEAUQBRAFEAUQBRBAAAEBVEAUQBRAAAAQQUQBUAAEQUQBRBKABVAEoAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPQDqgAAAAIAogCiAKIAogCiAKIIKgAAAAgKIAoggqAKAJQAKACUAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAdEAAAAAAAAAQFEAUQBRBBUAAAUAAAQACgAlAAoAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADaAAAAAAAAoAAAAAgAAAAAIAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA2AAAAACAAAAAAAAAAgAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADYAAAAAAAAAIAAAAAAACAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACjoiCiCCgIKAgoCCgIKAgoCACgCAAAAgAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKKOiIKAgoCCgIKAgoCCgIKAgCAAAACCgIKIIKgoAkABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB7AdWQAAAAAEFEEFAQUBBQEFAQAAAURRBBQEFAQAABBBRBBUFAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGgDqyAAAAAAAAAAgoCCgIKAgoggAAAIKAgoCAIAAqCgIKiAiiCCiCACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANQHZkAAAAAAAAAQQUBBQEFAQVAAAAAQUQQVAAAAAQUQQVBQBBBQEAQQUQQAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABsA7MAAAAAAAAIKAgoCCgIKgoAgAAIoCCgIAAAgIoCCoAAgIoCCoigAIKIIAgIoggqKoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACggoIgoCCiCKAAAAAAAAAAAAAAANRR6GUFEEFAQUBBQEFAQAAAAAAABFBUFEEAAABBQEFRAAAABBUQAAEURUFQBFEEAZAAAAVBRRBQEAAAAAAAAAAAAAAAAAAAAAABQQUBFBEAAAAAAAAAABQEFAQUBBQEFARQAAAAAABqA9DIAAAAAAAAAAAAAggoCCoAAAAAAKgoggAAACKAgCAAAiiCAAAIqCogIoggqIAAAAoAAAAigIKKIKAgoCCgIKAgoAAgAAAAACAAAAAAAoCKAAAAAAAAAAAAAAAAAAAAAAANgHoZAAAAQUBBQEFQAAAAAAABARQEFQAAAAUAQQVAAAAEEFQAABFEEARQAEFRAAZEFAQAAAUAAAAAAAAAAAAAAAAAAAEAAAUEUAAAAAAAAAAAAABQEFEEFAAAAAAAAAAAAAagPSyAAAAAAAAAAIoCCoAAAAAAgAAgqAAAAIoACAAAAAIIAAAgIoCAIoAggCaACAigIAKAAAAAAAAAAAAAAAAAAAAKAgAAAAAAAAAAAAoAAIAAAAAAAAAAAAAAAAAANQHpZAAAAAAAAAAAAAAQVAAAAEAAAAEFQAAUAQEUBAAAEBFQABAABAEUAQQVEABAABBUFAAAAAAAAAAAAAAAAAAFAQAAAAAAAAAAAAUAAEAAAAAAAAAAAAAAAAAAAAGoD0sgAAAAAAAAAAAAACAAAAAAAgAAIAAAoAgAAgAACAgAAIAACAigCAgIACAAAgCgAAAAAAAAAAAAAAACgAAIAAAAAAAAAAAAoCAAAAAAAAAAAAAAAAAAAAAAD/2Q=="
																									placeholder="blur"
																									alt="Thumnbail"
																								/>
																							) : (
																								<AiOutlineBook className="text-4xl text-white w-[40px] h-[50px] opacity-50" />
																							)}
																						</div>
																						<div className="flex flex-col w-4/5 ml-2">
																							<p className="pr-2 text-sm font-bold text-white">
																								{item.title}
																							</p>
																						</div>
																					</div>
																				</Link>
																			</div>
																		);
																	}}
																</Draggable>
															);
														})}
														{provided.placeholder}
													</div>
												);
											}}
										</Droppable>
									</div>
								</div>
							);
						})}
					</DragDropContext>
				</div>
			</div>
		</>
	);
};
export default AuthorizedPage(Books);
