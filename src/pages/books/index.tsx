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
} from '../../firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BookColumns, isValidColumn } from './types';
import { BookStatus } from '../../firebase/types';

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
			<div
				style={{ display: 'flex', justifyContent: 'center', height: '100%' }}
			>
				<DragDropContext onDragEnd={onDragEnd(columns, setColumns)}>
					{Object.entries(columns).map(([columnId, column]) => {
						if (!isValidColumn(column)) {
							return;
						}
						return (
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
								}}
								key={columnId}
							>
								<h2>{column.name}</h2>
								<div style={{ margin: 8 }}>
									<Droppable droppableId={columnId} key={columnId}>
										{(provided, snapshot) => {
											return (
												<div
													{...provided.droppableProps}
													ref={provided.innerRef}
													style={{
														background: snapshot.isDraggingOver
															? 'lightblue'
															: 'lightgrey',
														padding: 4,
														width: 250,
														minHeight: 500,
													}}
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
																			style={{
																				userSelect: 'none',
																				padding: 16,
																				margin: '0 0 8px 0',
																				minHeight: '50px',
																				backgroundColor: snapshot.isDragging
																					? '#263B4A'
																					: '#456C86',
																				color: 'white',
																				...provided.draggableProps.style,
																			}}
																		>
																			{item.title}
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
		</>
	);
};
export default AuthorizedPage(Books);
