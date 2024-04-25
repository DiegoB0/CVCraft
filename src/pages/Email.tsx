import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import React, { useEffect, useState } from 'react';

interface User {
	_id: string;
	first_name: string;
	last_name: string;
	username: string;
	email_address: string;
}

function Email() {
	const [users, setUsers] = useState<User[]>([]);
	const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
	const [message, setMessage] = useState('');
	const [image, setImage] = useState<File | null>(null);

	useEffect(() => {
		fetchUsers();
	}, []);

	const fetchUsers = async () => {
		try {
			const response = await fetch('http://localhost:5000/api/users');
			const data = await response.json();
			setUsers(data);
		} catch (error) {
			console.error('Error fetching users:', error);
		}
	};

	const handleSelectUser = (userId: string) => {
		setSelectedUserIds((prevSelected) => {
			if (prevSelected.includes(userId)) {
				// If the user is already selected, remove it from the selection
				const updatedSelection = prevSelected.filter((id) => id !== userId);
				console.log(updatedSelection);
				return updatedSelection;
			} else {
				// If the user is not selected, add it to the selection
				const updatedSelection = [...prevSelected, userId];
				console.log(updatedSelection);
				return updatedSelection;
			}
		});
	};

	const handleSendMessage = async () => {
		if (selectedUserIds.length === 0) {
			console.error('No valid recipients selected');
			return;
		}

		const recipients = selectedUserIds.join(',');

		const formData = new FormData();
		formData.append('subject', 'Some subject');
		formData.append('message', message);
		if (image) {
			formData.append('image', image);
		}
		formData.append('recipients', recipients);

		try {
			const response = await fetch('http://localhost:5000/api/send-email', {
				method: 'POST',
				body: formData,
			});
			if (response.ok) {
				console.log('Message sent successfully');
				console.log('Before clearing:');
				console.log('Message:', message);
				console.log('Image:', image);

				setMessage('');
				setImage(null); // Clear the image input
				const form = document.getElementById(
					'emailForm'
				) as HTMLFormElement | null;
				if (form) {
					form.reset();
				}
			} else {
				console.error('Error sending message:', response.statusText);
			}
		} catch (error) {
			console.error('Error sending message:', error);
		}
	};

	return (
		<div className="text-2xl text-custom-light md:p-8 p-6">
			<div className="mb-4">
				<h1>Email page</h1>
			</div>

			<div className="flex justify-center">
				<Card className="w-[600px] bg-base-800">
					<CardHeader>
						<CardTitle className="text-custom-light">Send Emails</CardTitle>
						<CardDescription>
							Send custom emails to all the users
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="flex flex-col space-y-1.5">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead className="w-[100px]">Select</TableHead>
										<TableHead>Username</TableHead>
										<TableHead>Full Name</TableHead>
										<TableHead className="text-right">Email Address</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{users.map((user) => (
										<TableRow
											key={user._id}
											className="text-custom-mate hover:text-base-900"
										>
											<TableCell className="font-medium">
												<Input
													type="checkbox"
													className="h-4 w-4 text-custom-mate checked:text-custom-mate"
													onChange={() => handleSelectUser(user.email_address)}
												/>
											</TableCell>
											<TableCell>{user.username}</TableCell>
											<TableCell>
												{user.first_name} {user.last_name}
											</TableCell>
											<TableCell className="text-right">
												{user.email_address}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</div>
						<form onSubmit={(e) => e.preventDefault()} id="emailForm">
							<div className="grid w-full items-center gap-4 mt-4">
								<div className="flex flex-col space-y-1.5">
									<Label htmlFor="message" className="text-custom-mate">
										Message
									</Label>
									<Textarea
										id="message"
										value={message}
										onChange={(e) => setMessage(e.target.value)}
										placeholder="Type your message here."
										rows={5}
										className="resize-none text-custom-mate"
									/>
								</div>
							</div>
							<div className="grid w-full items-center gap-4 mt-2">
								<div className="flex flex-col space-y-1.5">
									<Label htmlFor="file" className="text-custom-mate">
										Image
									</Label>
									<Input
										id="file"
										type="file"
										onChange={(e) => setImage(e.target.files?.[0] || null)}
										accept="image/*"
										className="text-custom-mate"
									/>
								</div>
							</div>
						</form>
					</CardContent>
					<CardFooter className="flex gap-2 justify-end">
						<Button variant="outline">Clear</Button>
						<Button
							className="bg-base-900 border border-base-900 hover:border-custom-mate transition-all duration-300 ease-in-out"
							onClick={handleSendMessage}
						>
							Send email
						</Button>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
}

export default Email;
