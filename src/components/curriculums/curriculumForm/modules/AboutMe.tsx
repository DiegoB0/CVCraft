import * as React from 'react';

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
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function AboutMe() {
	const navigate = useNavigate();
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
				<form>
					<div className="grid w-full items-center gap-4">
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="name" className="text-custom-mate">
								Nombre
							</Label>
							<Input
								id="name"
								placeholder="Name of your project"
								className="border-custom-gray text-custom-mate focus:border-accent-yellow"
							/>
						</div>
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="framework" className="text-custom-mate ">
								Framework
							</Label>
							<Select>
								<SelectTrigger
									id="framework"
									className="border-custom-gray text-custom-gray focus:border-accent-yellow"
								>
									<SelectValue placeholder="Select" />
								</SelectTrigger>
								<SelectContent
									position="popper"
									className="border-custom-gray text-custom-mate bg-base-900"
								>
									<SelectItem value="next" className="hover:bg-base-800">
										Next.js
									</SelectItem>
									<SelectItem value="sveltekit" className="hover:bg-base-800">
										SvelteKit
									</SelectItem>
									<SelectItem value="astro" className="hover:bg-base-800">
										Astro
									</SelectItem>
									<SelectItem value="nuxt" className="hover:bg-base-800">
										Nuxt.js
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
				</form>
			</CardContent>
			<CardFooter className="flex justify-between">
				<Button
					className="bg-custom-gray text-custom-light hover:bg-base-800 hover:border-custom-gray border border-transparent"
					onClick={() => navigate('/curriculums')}
				>
					Regresar
				</Button>
				<Button
					variant={'ghost'}
					className="bg-accent-yellow text-base-800 hover:bg-base-900 hover:text-custom-mate flex items-center gap-2"
				>
					Siguiente
					<FaLongArrowAltRight className="mt-[1px]" />
				</Button>
			</CardFooter>
		</Card>
	);
}

export default AboutMe;
