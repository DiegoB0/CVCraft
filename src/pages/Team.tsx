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
import { BiSolidEdit } from 'react-icons/bi';
import { BsClipboardPlusFill } from 'react-icons/bs';
import { HiDotsVertical } from 'react-icons/hi';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

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

interface Board {
	_id: string;
	boardName: string;
	boardGradient: string;
}

interface ColorPickerProps {
	onChange: (color: string) => void;
	board: {
		_id: string;
		boardName: string;
		boardGradient: string;
	};
}

const Teams: React.FC<ColorPickerProps> = () => {
	const [boards, setBoards] = useState<Board[]>([]);
	const [newBoardName, setNewBoardName] = useState('');
	const [selectedGradient, setSelectedGradient] = useState<string>('');
	const [boardId, setBoardId] = useState('');
	const navigate = useNavigate();

	const editInitialValues = (event, board) => {
		event.stopPropagation();
		setNewBoardName(board.boardName);
		setSelectedGradient(board.boardGradient);
	};

	const fetchBoards = async () => {
		try {
			const response = await fetch('http://localhost:5000/api/boards');
			if (!response.ok) {
				throw new Error(`HTTP error: Status ${response.status}`);
			}
			const data = await response.json();
			setBoards(data);
		} catch (error) {
			console.error('Error fetching boards:', error);
		}
	};

	useEffect(() => {
		fetchBoards();
	}, [boards]);

	const handleClick = (boardId: string) => {
		navigate(`/board/${boardId}`);
	};

	const handleButtonCLick = (event) => {
		event.stopPropagation();
	};

	const handleDelete = async (event, boardId: string) => {
		event.stopPropagation();
		try {
			// Perform deletion logic
			const response = await fetch(
				`http://localhost:5000/api/boards/${boardId}`,
				{
					method: 'DELETE',
				}
			);

			if (response.ok) {
				// Show success message using Toast notification
				toast.success('Board deleted successfully');
				// Perform any additional logic (e.g., update state, reroute if needed)
			} else {
				// Show error message using Toast notification
				toast.error('Error deleting board');
			}
		} catch (error) {
			// Show error message using Toast notification
			toast.error('Error deleting board');
			console.error('Error deleting board:', error);
		}
	};

	const handleEdit = async (event, boardId: string) => {
		event.preventDefault();
		try {
			const updatedData = {
				boardName: newBoardName,
				boardGradient: selectedGradient,
			};

			const response = await fetch(
				`http://localhost:5000/api/boards/${boardId}`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(updatedData),
				}
			);

			if (!response.ok) {
				throw new Error('Failed to update board');
			}
			toast.success('Board updated successfully');
			setNewBoardName('');
			setSelectedGradient('');
		} catch (error) {
			console.error('Error updating board:', error);
			// Display error message using Toast
			toast.error('Failed to update board');
		}
	};

	const handleNewBoardSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const response = await fetch('http://localhost:5000/api/boards', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name: newBoardName,
					gradient: selectedGradient,
				}),
			});
			if (!response.ok) {
				throw new Error(`HTTP error: Status ${response.status}`);
			}
			const data = await response.json();
			setBoards([...boards, data]);
			setNewBoardName('');
			setSelectedGradient('');
		} catch (error) {
			console.error('Error creating board:', error);
		}
	};

	const handleGradientChange = (gradient: string) => {
		setSelectedGradient(gradient);
	};

	const gradients = [
		'linear-gradient(to right, #608a52, #8dd774)',
		'linear-gradient(to right, #259aa2, #3eccbd)',
		'linear-gradient(to right, #9d281b, #f35543)',
		'linear-gradient(to right, #872599, #cd51e3)',
		'linear-gradient(to right, #ab2b98, #db69ca)',
	];

	return (
		<AlertDialog>
			<div className="text-2xl text-custom-light md:p-8 p-6">
				{boards.length === 0 ? (
					<div>
						<div className="mb-5">
							<p>No boards found. Create a new board!</p>
						</div>
						<div className="flex justify-center w-full">
							<Dialog>
								<DialogTrigger asChild>
									<Button
										variant="outline"
										className="bg-accent-green flex px-4 py-5 border-custom-mate border-2 rounded-lg  gap-1 text-lg items-center hover:bg-emerald-700 transition-all duration-200 hover:border-base-900 font-bold"
									>
										<span>
											<BsClipboardPlusFill />
										</span>
										New Board
									</Button>
								</DialogTrigger>
								<DialogContent className="sm:max-w-[425px] bg-base-800">
									<DialogHeader>
										<DialogTitle>New Board</DialogTitle>
										<DialogDescription>Create a new board</DialogDescription>
									</DialogHeader>
									<form onSubmit={handleNewBoardSubmit}>
										<div className="grid gap-4 py-4">
											<div>
												<div className="flex justify-center">
													{gradients.map((gradient, index) => (
														<div
															key={index}
															className={`w-10 h-10 rounded-lg mx-2 border border-gray-300 cursor-pointer ${
																selectedGradient === gradient
																	? 'border-blue-500'
																	: ''
															}`}
															style={{ backgroundImage: gradient }}
															onClick={() => handleGradientChange(gradient)}
														></div>
													))}
												</div>

												<Label htmlFor="columnName">Name</Label>
												<Input
													id="columnName"
													value={newBoardName}
													onChange={(e) => setNewBoardName(e.target.value)}
												/>
											</div>
										</div>
										<DialogFooter>
											<DialogClose asChild>
												<Button
													type="submit"
													className="bg-base-900 border-2 border-custom-mate hover:border-base-900"
													style={{ background: selectedGradient }}
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
				) : (
					<div className="h-full">
						<h1>Boards</h1>
						<div className=" p-2 h-full overflow-y-auto my-4">
							{boards.map((board) => (
								<>
									<div>
										<div
											key={board._id}
											className="m-4 rounded-lg shadow-lg overflow-hidden div-propagation"
											style={{ backgroundImage: board.boardGradient }}
											onClick={(event) => {
												event.stopPropagation();
												handleClick(board._id);
											}}
										>
											<div className="p-4 flex justify-between">
												<h2 className="text-custom-mate text-lg font-semibold">
													{board.boardName}
												</h2>
												<Dialog>
													<DropdownMenu
														onOpenChange={() => {
															setBoardId(board._id);
														}}
													>
														<DropdownMenuTrigger asChild>
															<Button
																className="text-custom-mate p-1 rounded-lg bg-transparent border-none font-bold text-xl hover:bg-transparent transition duration-300 ease-in-out"
																onClick={handleButtonCLick}
															>
																<HiDotsVertical />
															</Button>
														</DropdownMenuTrigger>
														<DropdownMenuContent className="w-56 bg-base-900 border-custom-gray">
															<DropdownMenuLabel className="text-custom-light">
																Options
															</DropdownMenuLabel>
															<DropdownMenuGroup>
																<AlertDialogTrigger asChild>
																	<DropdownMenuItem
																		className=" rounded-lg text-custom-gray  focus:bg-base-800 focus:text-custom-mate"
																		onClick={handleButtonCLick}
																	>
																		Delete
																		<DropdownMenuShortcut>
																			<MdDelete />
																		</DropdownMenuShortcut>
																	</DropdownMenuItem>
																</AlertDialogTrigger>

																<DialogTrigger asChild>
																	<DropdownMenuItem
																		onClick={(event) =>
																			editInitialValues(event, board)
																		}
																		className="rounded-lg text-custom-gray focus:bg-base-800 focus:text-custom-mate"
																	>
																		Edit
																		<DropdownMenuShortcut>
																			<BiSolidEdit />
																		</DropdownMenuShortcut>
																	</DropdownMenuItem>
																</DialogTrigger>
															</DropdownMenuGroup>
														</DropdownMenuContent>
													</DropdownMenu>

													{/* Edit Modal Content */}
													<DialogContent
														className="sm:max-w-[425px] bg-base-800 border-custom-gray"
														onClick={handleButtonCLick}
													>
														<DialogHeader>
															<DialogTitle>Update Board</DialogTitle>
															<DialogDescription>
																Edit this board
															</DialogDescription>
														</DialogHeader>
														<form
															onClick={(event) => handleEdit(event, board._id)}
														>
															<div className="grid gap-4 py-4">
																<div>
																	<Label htmlFor="columnName">
																		Choose a New Color
																	</Label>
																	<div className="flex justify-center mt-1">
																		{gradients.map((gradient, index) => (
																			<div
																				key={index}
																				className={`w-10 h-10 rounded-lg mx-2 border border-gray-300 cursor-pointer ${
																					selectedGradient === gradient
																						? 'border-blue-500'
																						: ''
																				}`}
																				style={{ backgroundImage: gradient }}
																				onClick={(e) => {
																					e.stopPropagation();
																					handleGradientChange(gradient);
																				}}
																			></div>
																		))}
																	</div>
																	<Label htmlFor="columnName">New Name</Label>
																	<Input
																		id="columnName"
																		value={newBoardName}
																		onChange={(e) =>
																			setNewBoardName(e.target.value)
																		}
																	/>
																</div>
															</div>
															<DialogFooter>
																<DialogClose asChild>
																	<Button
																		type="submit"
																		className="bg-base-900 border border-base-800 hover:border-white hover:border font-bold transition-all duration-300"
																		style={{ background: selectedGradient }}
																	>
																		Save
																	</Button>
																</DialogClose>
															</DialogFooter>
														</form>
													</DialogContent>
												</Dialog>

												<AlertDialogContent
													className="bg-base-800 text-custom-mate border-custom-gray"
													onClick={handleButtonCLick}
												>
													<AlertDialogHeader>
														<AlertDialogTitle>
															Are you absolutely sure?
														</AlertDialogTitle>
														<AlertDialogDescription>
															This action will delete the board.
														</AlertDialogDescription>
													</AlertDialogHeader>
													<AlertDialogFooter>
														<AlertDialogCancel
															className="text-base-900"
															onClick={handleButtonCLick}
														>
															Cancel
														</AlertDialogCancel>
														<AlertDialogAction
															onClick={(event) => {
																handleDelete(event, boardId);
															}}
															className="bg-base-900 border border-base-800 hover:border-white hover:border font-bold transition-all duration-300"
														>
															Continue
														</AlertDialogAction>
													</AlertDialogFooter>
												</AlertDialogContent>
											</div>
										</div>
									</div>
								</>
							))}
						</div>

						<div className="flex justify-center w-full">
							<Dialog>
								<DialogTrigger asChild>
									<Button
										variant="outline"
										className="bg-accent-green flex px-4 py-5 border-custom-mate border-2 rounded-lg  gap-1 text-lg items-center hover:bg-emerald-700 transition-all duration-200 hover:border-base-900 font-bold"
									>
										<span>
											<BsClipboardPlusFill />
										</span>
										New Board
									</Button>
								</DialogTrigger>
								<DialogContent className="sm:max-w-[425px] bg-base-800 border-custom-gray">
									<DialogHeader>
										<DialogTitle>New Board</DialogTitle>
										<DialogDescription>Create a new board</DialogDescription>
									</DialogHeader>
									<form onSubmit={handleNewBoardSubmit}>
										<div className="grid gap-4 py-4">
											<div>
												<Label htmlFor="columnName">Choose a Color</Label>
												<div className="flex justify-center mt-1">
													{gradients.map((gradient, index) => (
														<div
															key={index}
															className={`w-10 h-10 rounded-lg mx-2 border border-gray-300 cursor-pointer ${
																selectedGradient === gradient
																	? 'border-blue-500'
																	: ''
															}`}
															style={{ backgroundImage: gradient }}
															onClick={() => handleGradientChange(gradient)}
														></div>
													))}
												</div>
												<Label htmlFor="columnName">Name</Label>
												<Input
													id="columnName"
													value={newBoardName}
													onChange={(e) => setNewBoardName(e.target.value)}
												/>
											</div>
										</div>
										<DialogFooter>
											<DialogClose asChild>
												<Button
													type="submit"
													className="bg-base-900 border border-base-800 hover:border-white hover:border font-bold transition-all duration-300"
													style={{ background: selectedGradient }}
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
				)}
			</div>
		</AlertDialog>
	);
};

export default Teams;
