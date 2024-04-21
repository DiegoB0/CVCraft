import { setCurrentStep, updateFormData } from '@/features/stepSlice';
import 'react-toastify/dist/ReactToastify.css';

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
import { Textarea } from '@/components/ui/textarea';
import { RootState } from '@/store';
import { useForm } from 'react-hook-form';
import { FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

function Experience() {
	//Redux state
	const currentStep = useSelector(
		(store: RootState) => store.steps.currentStep
	);
	const formData = useSelector((store: RootState) => store.steps.formData);
	const dispatch = useDispatch();

	async function processData(data: FormData) {
		console.log('Processing data:', data);
		console.log(currentStep);
		dispatch(updateFormData(data));
		dispatch(setCurrentStep(currentStep + 1));
	}

	function handlePrevious() {
		dispatch(setCurrentStep(currentStep - 1));
	}

	//React hook form
	const { handleSubmit } = useForm<FormData>({
		defaultValues: {
			...formData,
		},
	});

	return (
		<Card className="w-[350px] xl:w-[650px] md:w-[450px] lg:w-[500px] bg-base-800 border-none h-full">
			<CardHeader>
				<CardTitle className="text-custom-light font-bold text-2xl text-center">
					NUEVO CURRICULUM
				</CardTitle>
				<CardDescription className="text-2xl">Experiencia</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit(processData)}>
					<div className="grid w-full items-center gap-4">
						<div className="flex flex-row space-x-4">
							<div className="flex flex-col space-y-1.5 w-full">
								<Label htmlFor="name" className="text-custom-mate">
									Posicion
								</Label>
								<Input
									id="name"
									placeholder="Escribe cual era tu posicion"
									className="border-custom-gray text-custom-mate focus:border-accent-yellow"
								/>
							</div>
							<div className="flex flex-col space-y-1.5 w-full">
								<Label htmlFor="last_names" className="text-custom-mate">
									Empresa
								</Label>
								<Input
									id="last_names"
									placeholder="Escribe la empresa/institucion"
									className="border-custom-gray text-custom-mate focus:border-accent-yellow"
								/>
							</div>
						</div>
						<div className="flex flex-row space-x-4">
							<div className="flex flex-col space-y-1.5 w-full">
								<Label htmlFor="occupation" className="text-custom-mate">
									Responsabilidades
								</Label>
								<Textarea
									id="occupation"
									placeholder="Escribe una breve descripcion de tus responsabilidades en la empresa/institucion"
									className="border-custom-gray text-custom-mate focus:border-accent-yellow h-24 resize-none overflow-auto"
								/>
							</div>
						</div>
						<div className="flex flex-row space-x-4">
							<div className="flex flex-col space-y-1.5 w-full">
								<Label htmlFor="name" className="text-custom-mate">
									Fecha de comienzo
								</Label>
								<Input
									id="name"
									placeholder="Escribe tu nombre"
									className="border-custom-gray text-custom-mate focus:border-accent-yellow"
									type="date"
								/>
							</div>
							<div className="flex flex-col space-y-1.5 w-full">
								<Label htmlFor="last_names" className="text-custom-mate">
									Fecha de culminacion
								</Label>
								<Input
									id="last_names"
									placeholder="Escribe tus apellidos"
									className="border-custom-gray text-custom-mate focus:border-accent-yellow"
									type="date"
								/>
							</div>
						</div>
					</div>
					<div className="flex justify-between mt-3">
						<Button
							className="bg-custom-gray text-custom-light hover:bg-base-800 hover:border-custom-gray border border-transparent gap-2"
							onClick={handlePrevious}
							type="button"
						>
							<FaLongArrowAltLeft className="mt-[1px]" />
							Anterior
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

export default Experience;
