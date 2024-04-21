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
	TableCaption,
	TableCell,
	TableFooter,
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

//Testing
const invoices = [
	{
		invoice: 'INV001',
		paymentStatus: 'Paid',
		totalAmount: '$250.00',
		paymentMethod: 'Credit Card',
	},
	{
		invoice: 'INV002',
		paymentStatus: 'Pending',
		totalAmount: '$150.00',
		paymentMethod: 'PayPal',
	},
	{
		invoice: 'INV003',
		paymentStatus: 'Unpaid',
		totalAmount: '$350.00',
		paymentMethod: 'Bank Transfer',
	},
	{
		invoice: 'INV004',
		paymentStatus: 'Paid',
		totalAmount: '$450.00',
		paymentMethod: 'Credit Card',
	},
	{
		invoice: 'INV005',
		paymentStatus: 'Paid',
		totalAmount: '$550.00',
		paymentMethod: 'PayPal',
	},
	{
		invoice: 'INV006',
		paymentStatus: 'Pending',
		totalAmount: '$200.00',
		paymentMethod: 'Bank Transfer',
	},
	{
		invoice: 'INV007',
		paymentStatus: 'Unpaid',
		totalAmount: '$300.00',
		paymentMethod: 'Credit Card',
	},
];

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
			const updatedSelection = [...prevSelected, userId];
			console.log(updatedSelection); // Check if the state updates here
			return updatedSelection;
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
						<CardTitle className="text-custom-light">Create project</CardTitle>
						<CardDescription>
							Deploy your new project in one-click.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form>
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="framework" className="text-custom-mate">
									Users
								</Label>
								<Table>
									<TableCaption>A list of your recent invoices.</TableCaption>
									<TableHeader>
										<TableRow>
											<TableHead className="w-[100px]">Invoice</TableHead>
											<TableHead>Status</TableHead>
											<TableHead>Method</TableHead>
											<TableHead className="text-right">Amount</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{invoices.map((invoice) => (
											<TableRow key={invoice.invoice}>
												<TableCell className="font-medium">
													{invoice.invoice}
												</TableCell>
												<TableCell>{invoice.paymentStatus}</TableCell>
												<TableCell>{invoice.paymentMethod}</TableCell>
												<TableCell className="text-right">
													{invoice.totalAmount}
												</TableCell>
											</TableRow>
										))}
									</TableBody>
									<TableFooter>
										<TableRow>
											<TableCell colSpan={3}>Total</TableCell>
											<TableCell className="text-right">$2,500.00</TableCell>
										</TableRow>
									</TableFooter>
								</Table>
							</div>
							<div className="grid w-full items-center gap-4 mt-2">
								<div className="flex flex-col space-y-1.5">
									<Label htmlFor="message" className="text-custom-mate">
										Message
									</Label>
									<Textarea
										id="message"
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
						<Button className="bg-base-900 border border-base-900 hover:border-custom-mate transition-all duration-300 ease-in-out">
							Send email
						</Button>
					</CardFooter>
				</Card>
			</div>

			<div className="flex justify-center">
				<div className="w-1/2">
					<div>
						{/* Display users */}
						{users.map((user) => (
							<div key={user._id}>
								<Input
									type="checkbox"
									onChange={() => handleSelectUser(user.email_address)}
								/>
								<span>{`${user.first_name} ${user.last_name} (${user.username}) - ${user.email_address}`}</span>
							</div>
						))}
					</div>

					<form
						onSubmit={(e) => e.preventDefault()}
						className="flex flex-col gap-4"
					>
						<textarea
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							placeholder="Write your message"
							rows={5}
							className="resize-none text-base-900 rounded-lg"
						/>
						<Input
							type="file"
							onChange={(e) => setImage(e.target.files?.[0] || null)}
							accept="image/*"
						/>
						<button onClick={handleSendMessage}>Send Message</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Email;
