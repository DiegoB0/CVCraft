import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useEffect, useState } from 'react';
import {
	DragDropContext,
	Draggable,
	DropResult,
	Droppable,
} from 'react-beautiful-dnd';
import { BiSolidEdit } from 'react-icons/bi';
import { FaRegEye } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa6';
import { HiDotsHorizontal } from 'react-icons/hi';
import { LuBanana } from 'react-icons/lu';
import { MdClose, MdDelete, MdOutlineFileDownload } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

interface List {
	_id: string;
	listName: string;
}

interface Task {
	_id: string;
	title: string;
	description: string;
	listId: string;
}

interface Card {
	_id: string;
	title: string;
	description: string;
	cardUrl?: string;
	mediaUrl?: string;
}

function Board() {
	enum Dialogs {
		dialog1 = 'dialog1',
		dialog2 = 'dialog2',
	}
	const { id } = useParams();
	const [boardName, setBoardName] = useState('');
	const [boardGradient, setBoardGradient] = useState('');
	const [lists, setLists] = useState<List[]>([]);
	const [cardText, setCardText] = useState<string>('');
	const [tasks, setTasks] = useState<Task[]>([]);
	const [dialog, setDialog] = useState<string>('');
	const [newCardText, setNewCardText] = useState<{ [listId: string]: boolean }>(
		{}
	);

	//Shit for the edit functionality
	const [cardId, setCardId] = useState('');
	const [cardName, setCardName] = useState('');
	const [cardDescription, setCardDescription] = useState('');
	const [cardFile, setCardFile] = useState<File | null>(null);
	const [cardImage, setCardImage] = useState<File | null>(null);

	//Shit to see the card specifics
	const [cardInfo, setCardInfo] = useState<Card>();

	//loading shi
	const [loading, setLoading] = useState(false);

	//Shi for the lists
	const [listName, setListName] = useState('');
	const [submitSuccess, setSubmitSuccess] = useState(false);
	const [selectedListId, setSelectedListId] = useState('');

	async function saveListTitle(title, boardId) {
		try {
			const response = await fetch('http://localhost:5000/api/lists/new', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ title, boardId }),
			});
			const data = await response.json();
			console.log(data);

			setLists((prevLists) => [...prevLists, data.result]);
			setSubmitSuccess(true);
			setListName('');
		} catch (error) {
			console.error('Error saving list title:', error);
		}
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (listName.trim() === '') {
			console.error('List name cannot be empty');
			return;
		}
		await saveListTitle(listName, id);
	};

	const handleDeleteList = async (listId) => {
		try {
			const response = await fetch(
				`http://localhost:5000/api/lists/${listId}`,
				{
					method: 'DELETE',
				}
			);
			if (response.ok) {
				toast.success('List deleted successfully');
			}

			setLists((prevLists) => prevLists.filter((list) => list._id !== listId));
		} catch (error) {
			console.error('Error deleting list:', error);
			toast.error('Error deleting list');
		}
	};

	const handleListEdit = async (
		e: React.FormEvent<HTMLFormElement>,
		listId
	) => {
		e.preventDefault();

		try {
			const response = await fetch(
				`http://localhost:5000/api/lists/${listId}`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ newTitle: listName }), // Assuming listName is the new title
				}
			);
			if (response.ok) {
				toast.success('List updated successfully');
			}

			setLists((prevLists) =>
				prevLists.map((list) =>
					list._id === listId ? { ...list, listName: listName } : list
				)
			);

			setListName('');
		} catch (error) {
			toast.error('Error updating the list');
		}
	};

	//All the cards logic
	const fetchCardInfo = async (cardId) => {
		setLoading(true);
		try {
			const response = await fetch(`http://localhost:5000/api/cards/${cardId}`);

			if (response.ok) {
				const data = await response.json();
				setCardInfo(data);
				setDialog(Dialogs.dialog1);
			} else {
				console.error('Error fetching card info:', response.statusText);
				// Add error handling here
			}
		} catch (error) {
			console.error('Error fetching card info:', error);
			// Add error handling here
		} finally {
			setTimeout(() => {
				setLoading(false);
			}, 200);
		}
	};

	const handleAddCard = (listId: string) => {
		setNewCardText({ ...newCardText, [listId]: true });
	};

	const handleEditCard = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		try {
			const formData = new FormData();
			formData.append('title', cardName);
			formData.append('description', cardDescription);
			if (cardFile) {
				formData.append('cardFile', cardFile);
			}
			if (cardImage) {
				formData.append('mediaFile', cardImage);
			}

			const response = await fetch(
				`http://localhost:5000/api/cards/${cardId}`,
				{
					method: 'PUT',
					body: formData,
				}
			);

			if (response.ok) {
				setTasks((prevTasks) =>
					prevTasks.map((task) =>
						task._id === cardId ? { ...task, title: cardName } : task
					)
				);
				toast.success('Card updated successfully');
				setLoading(false);
			} else {
				// Show error message using Toast notification
				toast.error('Error updating card');
				setLoading(false);
			}

			setCardName('');
			setCardDescription('');
		} catch (error) {
			console.error('Error updating card:', error);
			setLoading(false);
			// Add error handling here
		}
	};

	//Delete card
	const handleDeleteCard = async (cardId: string) => {
		try {
			const response = await fetch(
				`http://localhost:5000/api/cards/${cardId}`,
				{
					method: 'DELETE',
				}
			);

			if (response.ok) {
				console.log('Card deleted successfully');
				// Update tasks state by removing the deleted card
				setTasks((prevTasks) =>
					prevTasks.filter((task) => task._id !== cardId)
				);
				toast.success('Card deleted successfully');
			} else {
				console.error('Error deleting card:', response.statusText);
				toast.error('Error deleting the card');
			}
		} catch (error) {
			console.error('Error deleting card:', error);
			// Add error handling here
		}
	};

	const handleCardSubmit = async (
		e: React.FormEvent<HTMLFormElement>,
		listId: string
	) => {
		e.preventDefault();
		try {
			// Check if listId is available
			if (!listId) {
				console.error('List ID is missing');
				return; // Exit the function if listId is missing
			}

			// Make the API call to create a new card
			const response = await fetch('http://localhost:5000/api/cards', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					listId,
					title: cardText,
					description: '',
				}),
			});

			if (response.ok) {
				const newCard = await response.json();
				setTasks((prevTasks) => [...prevTasks, newCard]);
			} else {
				console.error('Error creating card:', response.statusText);
			}

			setCardText('');
		} catch (error) {
			console.error('Error creating card:', error);
		}
	};

	useEffect(() => {
		const fetchBoardDetails = async () => {
			try {
				const response = await fetch(`http://localhost:5000/api/boards/${id}`);
				if (!response.ok) {
					throw new Error(`HTTP error: Status ${response.status}`);
				}
				const data = await response.json();
				setBoardName(data.boardName);
				setBoardGradient(data.boardGradient);

				const listIds = data.lists || [];
				const listsResponse = await fetch(`http://localhost:5000/api/lists`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ listIds }),
				});

				if (!listsResponse.ok) {
					throw new Error(`HTTP error: Status ${listsResponse.status}`);
				}

				const listsData = await listsResponse.json();
				setLists(listsData || []);

				setNewCardText(
					listIds.reduce((acc, curr) => ({ ...acc, [curr]: false }), {})
				);

				// Fetch tasks for each list in lists after fetching lists
				listIds.forEach(async (listId) => {
					try {
						const response = await fetch(
							`http://localhost:5000/api/cards/list/${listId}`
						);
						if (!response.ok) {
							throw new Error(`HTTP error: Status ${response.status}`);
						}
						const data = await response.json();

						setTasks((prevTasks) => {
							const existingTasks = prevTasks.filter(
								(task) => task.listId !== listId
							);
							return [...existingTasks, ...data];
						});
					} catch (error) {
						console.error('Error fetching tasks by list ID:', error);
					}
				});
			} catch (error) {
				console.error('Error fetching board details:', error);
			}
		};

		fetchBoardDetails();
	}, [id, submitSuccess]);

	//Drag and drop type shi
	const onDragEnd = async (result: DropResult) => {
		const { destination, draggableId } = result;
		if (!destination) {
			return;
		}
		// Update tasks state based on drag-and-drop
		const updatedTasks = [...tasks];
		const movedTask = updatedTasks.find((task) => task._id === draggableId);
		if (movedTask) {
			movedTask.listId = destination.droppableId;
			setTasks(updatedTasks);

			try {
				const response = await fetch(
					`http://localhost:5000/api/cards/move/${draggableId}`,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							newListId: destination.droppableId,
						}),
					}
				);
				if (!response.ok) {
					throw new Error(`HTTP error: Status ${response.status}`);
				}
				console.log('Task listId updated successfully.');
				// Handle success actions if needed
			} catch (error) {
				console.error('Error updating task listId:', error);
				// Handle error cases
			}
		}
	};

	//Shitty validator
	const isFormValid = cardName.trim() !== '' && cardDescription.trim() !== '';

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div
				style={{ background: boardGradient }}
				className="h-full m-5 rounded-lg "
			>
				<div className="p-5">
					<div className="mb-5">
						<h1 className="font-bold text-2xl text-custom-light">
							{boardName}
						</h1>
					</div>
					<div className="grid grid-cols-3 gap-4 items-center">
						<AlertDialog>
							<Dialog>
								{lists.map((list) => (
									<div
										key={list._id}
										className="bg-custom-mate text-base-800 rounded-lg p-5 font-bold"
									>
										<div className="mb-2 flex justify-between">
											<h2>{list.listName}</h2>
											<DropdownMenu
												onOpenChange={() => {
													console.log(list._id);
													setSelectedListId(list._id);
												}}
											>
												<DropdownMenuTrigger asChild>
													<button
														className="hover:bg-custom-light p-2 rounded-lg"
														type="button"
													>
														<HiDotsHorizontal />
													</button>
												</DropdownMenuTrigger>
												<DropdownMenuContent className="w-56 bg-custom-mate">
													<DropdownMenuLabel>Options</DropdownMenuLabel>
													<DropdownMenuGroup>
														<AlertDialogTrigger className="w-full" asChild>
															<DropdownMenuItem className="hover:bg-custom-light rounded-lg">
																Delete
																<DropdownMenuShortcut>
																	<MdDelete />
																</DropdownMenuShortcut>
															</DropdownMenuItem>
														</AlertDialogTrigger>

														<DialogTrigger asChild className="w-full">
															<DropdownMenuItem className="hover:bg-custom-light rounded-lg">
																Edit
																<DropdownMenuShortcut>
																	<BiSolidEdit />
																</DropdownMenuShortcut>
															</DropdownMenuItem>
														</DialogTrigger>
													</DropdownMenuGroup>
												</DropdownMenuContent>
											</DropdownMenu>
										</div>

										<div>
											<Dialog>
												<AlertDialog>
													<Droppable droppableId={list._id}>
														{(provided) => (
															<div
																ref={provided.innerRef}
																{...provided.droppableProps}
															>
																{tasks.filter(
																	(task) => task.listId === list._id
																).length > 0 ? (
																	tasks
																		.filter((task) => task.listId === list._id)
																		.map((task, index) => (
																			<>
																				<Draggable
																					key={task._id}
																					draggableId={task._id}
																					index={index}
																				>
																					{(provided) => (
																						<div
																							ref={provided.innerRef}
																							{...provided.draggableProps}
																							{...provided.dragHandleProps}
																						>
																							{loading ? (
																								<h2 className="text-sm text-custom-gray font-normal p-1 rounded-lg w-full hover:bg-custom-light flex justify-between items-center">
																									Loading...
																								</h2>
																							) : (
																								<h2 className="text-sm text-custom-gray font-normal p-1 rounded-lg w-full hover:bg-custom-light flex justify-between items-center">
																									{task.title}
																									<div className="flex">
																										<DialogTrigger
																											asChild
																											onClick={() => {
																												console.log(task._id);
																												setCardId(task._id);
																												fetchCardInfo(task._id);
																												setDialog(
																													Dialogs.dialog1
																												);
																											}}
																										>
																											<span className="mt-1 hover:bg-custom-mate p-2 rounded-lg hover:text-custom-gray">
																												<FaRegEye />
																											</span>
																										</DialogTrigger>

																										<DialogTrigger
																											asChild
																											onClick={() => {
																												console.log(task._id);
																												setCardId(task._id);
																												setDialog(
																													Dialogs.dialog2
																												);
																											}}
																										>
																											<span className="mt-1 hover:bg-custom-mate p-2 rounded-lg hover:text-custom-gray">
																												<BiSolidEdit />
																											</span>
																										</DialogTrigger>
																									</div>
																								</h2>
																							)}
																						</div>
																					)}
																				</Draggable>
																				<DialogContent className="sm:max-w-[425px] bg-custom-mate border-none text-base-900">
																					{dialog === Dialogs.dialog1 ? (
																						<>
																							<DialogHeader>
																								<DialogTitle className="text-base-900">
																									See Card
																								</DialogTitle>
																								<DialogDescription>
																									See all the card info and
																									delete if neccessary
																								</DialogDescription>
																							</DialogHeader>

																							<div className="grid gap-4 py-4 content-center">
																								{loading ? (
																									<div>Loading...</div>
																								) : (
																									<>
																										<div className="text-base-800">
																											Title: {cardInfo?.title}
																										</div>

																										{cardInfo?.description && (
																											<div className="text-base-800">
																												Description:{' '}
																												{cardInfo?.description}{' '}
																											</div>
																										)}
																										{cardInfo?.cardUrl && (
																											<div>
																												<a
																													href={
																														cardInfo.cardUrl
																													}
																													target="_blank"
																													rel="noopener noreferrer"
																													className="text-custom-gray border border-custom-gray flex py-2 rounded-lg justify-between px-4 text-lg hover:bg-custom-gray hover:text-custom-mate transition-colors duration-300 ease-in-out"
																												>
																													Download File
																													<span className="mt-1 font-bold text-xl">
																														<MdOutlineFileDownload />
																													</span>
																												</a>
																											</div>
																										)}
																										{cardInfo?.mediaUrl && (
																											<div className="flex flex-col justify-center">
																												{cardInfo.mediaUrl.endsWith(
																													'.mp4'
																												) ||
																												cardInfo.mediaUrl.endsWith(
																													'.webm'
																												) ? (
																													<video
																														controls
																														className="rounded-lg"
																													>
																														<source
																															src={
																																cardInfo.mediaUrl
																															}
																															type="video/mp4"
																														/>
																														Your browser does
																														not support the
																														video tag.
																													</video>
																												) : (
																													<img
																														src={
																															cardInfo.mediaUrl
																														}
																														alt="Image Preview"
																														className="rounded-lg"
																													/>
																												)}
																											</div>
																										)}
																									</>
																								)}
																							</div>

																							<DialogFooter>
																								<AlertDialogTrigger>
																									<Button className="bg-red-700 font-bold transition-all duration-300 hover:bg-red-800">
																										Delete
																									</Button>
																								</AlertDialogTrigger>

																								<DialogClose asChild>
																									<Button className="bg-base-900 font-bold transition-all duration-300">
																										Close
																									</Button>
																								</DialogClose>
																							</DialogFooter>
																						</>
																					) : (
																						<>
																							<DialogHeader>
																								<DialogTitle className="text-base-900">
																									Update Card
																								</DialogTitle>
																								<DialogDescription>
																									Edit this card
																								</DialogDescription>
																							</DialogHeader>
																							<form
																								onSubmit={(e) =>
																									handleEditCard(e)
																								}
																							>
																								<div className="grid gap-4 py-4">
																									<div>
																										<Label htmlFor="cardName">
																											New Name
																										</Label>
																										<Input
																											id="cardName"
																											value={cardName}
																											onChange={(e) =>
																												setCardName(
																													e.target.value
																												)
																											}
																											className="border-base-900"
																											required
																										/>
																									</div>
																									<div>
																										<Label htmlFor="cardDescription">
																											Add a description
																										</Label>
																										<Input
																											id="cardDescription"
																											value={cardDescription}
																											onChange={(e) =>
																												setCardDescription(
																													e.target.value
																												)
																											}
																											className="border-base-900"
																											required
																										/>
																									</div>
																									<div>
																										<Label htmlFor="cardFile">
																											Attach a file
																										</Label>
																										<Input
																											id="cardFile"
																											type="file"
																											accept=".pdf,.xlsx,.doc,.docx"
																											onChange={(e) =>
																												setCardFile(
																													e.target.files
																														? e.target.files[0]
																														: null
																												)
																											}
																											className="border-base-900"
																										/>
																									</div>
																									<div>
																										<Label htmlFor="cardImage">
																											Attach an image or video
																										</Label>
																										<Input
																											id="cardImage"
																											type="file"
																											accept="image/*,video/*"
																											onChange={(e) =>
																												setCardImage(
																													e.target.files
																														? e.target.files[0]
																														: null
																												)
																											}
																											className="border-base-900"
																										/>
																									</div>
																								</div>
																								<DialogFooter>
																									{isFormValid ? (
																										<DialogClose asChild>
																											<Button
																												type="submit"
																												className="bg-base-900 font-bold transition-all duration-300"
																											>
																												Save
																											</Button>
																										</DialogClose>
																									) : (
																										<Button className="bg-base-900 font-bold transition-all duration-300">
																											Save
																										</Button>
																									)}
																								</DialogFooter>
																							</form>
																						</>
																					)}
																				</DialogContent>
																			</>
																		))
																) : (
																	<p className="text-custom-gray font-normal text-sm p-2">
																		No cards yet
																	</p>
																)}
																{provided.placeholder}
															</div>
														)}
													</Droppable>

													<AlertDialogContent className="bg-base-800 text-custom-mate border-custom-gray">
														<AlertDialogHeader>
															<AlertDialogTitle>
																Are you absolutely sure?
															</AlertDialogTitle>
															<AlertDialogDescription>
																This action will delete the card.
															</AlertDialogDescription>
														</AlertDialogHeader>
														<AlertDialogFooter>
															<AlertDialogCancel className="text-base-900">
																Cancel
															</AlertDialogCancel>
															<AlertDialogAction
																onClick={() => handleDeleteCard(cardId)}
																className="bg-base-900 border border-base-800 hover:border-white hover:border font-bold transition-all duration-300"
															>
																Continue
															</AlertDialogAction>
														</AlertDialogFooter>
													</AlertDialogContent>
												</AlertDialog>
											</Dialog>

											{newCardText[list._id] && (
												<div>
													<form onClick={(e) => handleCardSubmit(e, list._id)}>
														<textarea
															placeholder="Enter card title"
															className="p-2 border border-gray-300 rounded-lg mt-2 w-full bg-custom-light text-sm font-normal text-base-800 resize-none"
															value={cardText}
															onChange={(e) => setCardText(e.target.value)}
															onClick={(e) => e.stopPropagation()}
															required
														/>
														<div className="flex hover:bg-custom-light rounded-lg">
															<button
																type="submit"
																className="text-sm text-custom-gray font-normal flex gap-2  rounded-lg p-2 w-full"
																onClick={() =>
																	setNewCardText({
																		...newCardText,
																		[list._id]: false,
																	})
																}
															>
																<span className="mt-1">
																	<LuBanana />
																</span>
																Save Card
															</button>

															<button
																type="button"
																className="text-sm text-base-900  hover:text-red-500 transition duration-200 ease-in-out font-normal rounded-full px-3 hover:bg-red-200"
																onClick={(event) => {
																	event.stopPropagation();
																	setNewCardText({
																		...newCardText,
																		[list._id]: false,
																	});
																}}
															>
																<MdClose />
															</button>
														</div>
													</form>
												</div>
											)}
										</div>

										{!newCardText[list._id] && (
											<button
												type="button"
												className="text-sm text-custom-gray font-normal flex gap-2 hover:bg-custom-light rounded-lg p-2 w-full"
												onClick={() => handleAddCard(list._id)}
											>
												<span className="mt-1">
													<FaPlus />
												</span>{' '}
												Add a card
											</button>
										)}
									</div>
								))}

								{/* Delete dialog for the lists */}
								<AlertDialogContent className="bg-base-800 text-custom-mate border-custom-gray">
									<AlertDialogHeader>
										<AlertDialogTitle>
											Are you absolutely sure?
										</AlertDialogTitle>
										<AlertDialogDescription>
											This action will delete the list.
										</AlertDialogDescription>
									</AlertDialogHeader>
									<AlertDialogFooter>
										<AlertDialogCancel className="text-base-900">
											Cancel
										</AlertDialogCancel>
										<AlertDialogAction
											onClick={() => handleDeleteList(selectedListId)}
											className="bg-base-900 border border-base-800 hover:border-white hover:border font-bold transition-all duration-300"
										>
											Continue
										</AlertDialogAction>
									</AlertDialogFooter>
								</AlertDialogContent>

								{/* Edit dialog for the lists */}
								<DialogContent className="sm:max-w-[425px] bg-custom-mate border-none text-base-900">
									<DialogHeader>
										<DialogTitle className="text-base-900">
											Update List
										</DialogTitle>
										<DialogDescription className="text-custom-gray">
											Update the current list
										</DialogDescription>
									</DialogHeader>
									<form onSubmit={(e) => handleListEdit(e, selectedListId)}>
										<div className="grid gap-4 py-4">
											<div>
												<div className="flex justify-center"></div>

												<Label htmlFor="listName" className="text-base-900">
													New Name
												</Label>
												<Input
													id="listName"
													className="text-base-900 border-base-900"
													value={listName}
													onChange={(e) => setListName(e.target.value)}
												/>
											</div>
										</div>
										<DialogFooter>
											<DialogClose asChild>
												<Button
													type="submit"
													className="bg-base-900 border-2 border-custom-mate hover:border-custom-mate"
												>
													Save
												</Button>
											</DialogClose>
										</DialogFooter>
									</form>
								</DialogContent>
							</Dialog>
						</AlertDialog>
					</div>
					<div className="w-full mt-4 flex justify-center">
						<Dialog>
							<DialogTrigger asChild>
								<Button
									variant="outline"
									className="bg-custom-mate bg-opacity-30 font-bold text-lg p-5 w-1/3 rounded-lg flex gap-2 hover:bg-opacity-40 transition duration-300 ease-in-out border-none hover:text-custom-light justify-start"
								>
									<span className="mt-1">
										<FaPlus />
									</span>
									Add list
								</Button>
							</DialogTrigger>
							<DialogContent className="sm:max-w-[425px] bg-custom-mate border-none text-base-900">
								<DialogHeader>
									<DialogTitle className="text-base-900">New List</DialogTitle>
									<DialogDescription className="text-custom-gray">
										Create a new list
									</DialogDescription>
								</DialogHeader>
								<form onSubmit={handleSubmit}>
									<div className="grid gap-4 py-4">
										<div>
											<div className="flex justify-center"></div>

											<Label htmlFor="listName" className="text-base-900">
												Name
											</Label>
											<Input
												id="listName"
												className="text-base-900 border-base-900"
												value={listName}
												onChange={(e) => setListName(e.target.value)}
											/>
										</div>
									</div>
									<DialogFooter>
										<DialogClose asChild>
											<Button
												type="submit"
												className="bg-base-900 border-2 border-custom-mate hover:border-custom-mate"
											>
												Save
											</Button>
										</DialogClose>
									</DialogFooter>
								</form>
							</DialogContent>
						</Dialog>
					</div>
				</div>
			</div>
		</DragDropContext>
	);
}

export default Board;
