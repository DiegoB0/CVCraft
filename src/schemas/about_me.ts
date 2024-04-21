import { z } from 'zod';

const aboutMeSchema = z.object({
	name: z
		.string()
		.min(3, { message: 'El nombre debe contener al menos 3 caracteres' })
		.regex(/^[a-zA-Z\s]*$/, {
			message: 'El nombre solo puede contener letras y espacios',
		}),
	last_names: z
		.string()
		.min(3, { message: 'Los apellidos deben contener al  menos 3 caracteres' })
		.regex(/^[a-zA-Z\s]*$/, {
			message: 'Los apellidos solo pueden contener letras y espacios',
		}),
	occupation: z
		.string()
		.min(3, { message: 'la Ocupacion debe contener al menos 3 caracteres' }),
	age: z.number().int().min(18, { message: 'Debes tener al menos 18 años' }),
});

export default aboutMeSchema;
