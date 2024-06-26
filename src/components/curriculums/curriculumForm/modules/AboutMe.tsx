import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { setCurrentStep, updateFormData } from '@/features/stepSlice';
import aboutMeSchema from '@/schemas/about_me';
import { RootState } from '@/store';
import { zodResolver } from '@hookform/resolvers/zod';
import defaultImage from '@src/assets/default.svg';
import React, { DragEvent, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface FormData {
	name: string;
	last_names: string;
	occupation: string;
	age: number;
	images: FileList;
}

function AboutMe() {
	//Redux
	const currentStep = useSelector(
		(store: RootState) => store.steps.currentStep
	);
	const formData = useSelector((store: RootState) => store.steps.formData);
	const dispatch = useDispatch();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		defaultValues: {
			...formData,
		} as FormData,
		resolver: zodResolver(aboutMeSchema),
	});

	const ageField = register('age', {
		setValueAs: (value) => parseInt(value, 10), // Parse the value as an integer
	});

	//Routing
	const navigate = useNavigate();

	//State of the image
	const inputRef = useRef<HTMLInputElement>(null);
	const [image, setImage] = useState('');

	const handleImageClick = () => {
		if (inputRef.current) {
			inputRef.current.click();
		}
	};

	const handleImageChange = (
		event: React.ChangeEvent<HTMLInputElement> | DragEvent
	) => {
		event.preventDefault();
		const file =
			'dataTransfer' in event && event.dataTransfer
				? event.dataTransfer.files[0]
				: event.target && 'files' in event.target && event.target.files
				? event.target.files[0]
				: null;
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				if (typeof reader.result === 'string') {
					setImage(reader.result);
				}
			};
			reader.readAsDataURL(file);
		}
	};

	//set state to change classes later
	const [isDraggingOver, setIsDraggingOver] = useState(false);

	const handleDragOver = (event: DragEvent<HTMLInputElement>) => {
		event.preventDefault();
		setIsDraggingOver(true);
	};

	const handleDragEnter = (event: DragEvent<HTMLInputElement>) => {
		event.preventDefault();
		setIsDraggingOver(true);
	};

	const handleDragLeave = (event: DragEvent<HTMLInputElement>) => {
		event.preventDefault();
		setIsDraggingOver(false);
	};

	const handleDrop = (event: DragEvent<HTMLInputElement>) => {
		event.preventDefault();
		setIsDraggingOver(false);

		const file = event.dataTransfer.files[0];
		if (file && file.type.startsWith('image/')) {
			// Process the image file further
			handleImageChange(event);
		} else {
			toast.warn('Formato de la imagen incorrecto', {
				position: 'top-right',
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'dark',
			});
		}
	};

	const onSubmit = async (data: FormData) => {
		try {
			// Dispatch an action to update form data in Redux store
			console.log(data);
			const someshit = dispatch(updateFormData(data));
			console.log(someshit);

			// Increment current step in Redux store
			dispatch(setCurrentStep(currentStep + 1));
		} catch (error) {
			console.error('Error submitting form', error);
			// Handle error, show toast message, etc.
		}
	};

	return (
		<Card className="w-[350px] xl:w-[650px] md:w-[450px] lg:w-[500px] bg-base-800 border-none h-full">
			<CardHeader>
				<CardTitle className="text-custom-light font-bold text-2xl text-center">
					NUEVO CURRICULUM
				</CardTitle>
				<CardDescription className="text-2xl">
					Informacion Personal
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="grid w-full items-center gap-4">
						<div className="flex flex-row space-x-4">
							<div className="flex flex-col space-y-1.5 w-full">
								<Label htmlFor="name" className="text-custom-mate">
									Nombre
								</Label>
								<Input
									id="name"
									placeholder="Escribe tu nombre"
									className="border-custom-gray text-custom-mate focus:border-accent-yellow"
									{...register('name')}
								/>
								{errors.name?.message && (
									<p className="text-red-400 text-sm">{errors.name?.message}</p>
								)}
							</div>
							<div className="flex flex-col space-y-1.5 w-full">
								<Label htmlFor="last_names" className="text-custom-mate">
									Apellidos
								</Label>
								<Input
									id="last_names"
									placeholder="Escribe tus apellidos"
									className="border-custom-gray text-custom-mate focus:border-accent-yellow"
									{...register('last_names')}
								/>
								{errors.last_names?.message && (
									<p className="text-red-400 text-sm">
										{errors.last_names?.message}
									</p>
								)}
							</div>
						</div>
						<div className="flex flex-row space-x-4">
							<div className="flex flex-col space-y-1.5 w-full">
								<Label htmlFor="occupation" className="text-custom-mate">
									Ocupacion
								</Label>
								<Input
									id="occupation"
									placeholder="A que te dedicas"
									className="border-custom-gray text-custom-mate focus:border-accent-yellow"
									{...register('occupation')}
								/>
								{errors.occupation?.message && (
									<p className="text-red-400 text-sm">
										{errors.occupation?.message}
									</p>
								)}
							</div>
							<div className="flex flex-col space-y-1.5 w-full">
								<Label htmlFor="age" className="text-custom-mate">
									Edad
								</Label>
								<Input
									id="age"
									placeholder="Escribe tu edad"
									className="border-custom-gray text-custom-mate focus:border-accent-yellow"
									{...ageField}
									{...register('age')}
								/>
								{errors.age?.message && (
									<p className="text-red-400 text-sm">{errors.age?.message}</p>
								)}
							</div>
						</div>
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="images" className="text-custom-mate">
								Foto de perfil
							</Label>
							<Input
								type="file"
								id="images"
								accept=".png, .jpg, .jpeg, .svg"
								className="hidden"
								{...register('images')}
								ref={inputRef}
								onChange={handleImageChange}
								onDragOver={handleDragOver}
								onDragEnter={handleDragEnter}
								onDragLeave={handleDragLeave}
								onDrop={handleDrop}
							/>
							{errors.images?.message && (
								<p className="text-red-400 text-sm">{errors.images?.message}</p>
							)}
							<div
								className={`flex flex-col items-center border border-dashed border-custom-gray rounded-lg p-5 hover:border-solid hover:border-custom-mate hover:bg-custom-mate transition-colors duration-300${
									isDraggingOver
										? 'border-custom-mate bg-custom-mate transition-colors duration-300'
										: ''
								}`}
								onClick={handleImageClick}
								onDragOver={handleDragOver}
								onDragEnter={handleDragEnter}
								onDragLeave={handleDragLeave}
								onDrop={handleDrop}
							>
								<h1 className="text-custom-gray mb-2">
									{' '}
									Toca o arrastra una imagen aqui
								</h1>
								{image ? (
									<img src={image} className="w-20 h-20 m-auto rounded-full" />
								) : (
									<img src={defaultImage} className="w-20 h-20 m-auto" />
								)}
							</div>
						</div>
					</div>
					<div className="flex justify-between mt-3">
						<Button
							className="bg-custom-gray text-custom-light hover:bg-base-800 hover:border-custom-gray border border-transparent"
							onClick={() => navigate('/curriculums')}
						>
							Regresar
						</Button>
						<Button
							variant={'ghost'}
							className="bg-accent-yellow text-base-800 hover:bg-base-900 hover:text-custom-mate flex items-center gap-2"
							type="submit"
						>
							Siguiente
							<FaLongArrowAltRight className="mt-[1px]" />
						</Button>
					</div>
				</form>
			</CardContent>
		</Card>
	);
}

export default AboutMe;
