import z from 'zod';

const registerSchema = z
    .object({
        name: z
            .string()
            .min(3, {
                message: 'Name is too short',
            })
            .max(50),
        email: z.email(),
        password: z.string().min(8, { message: 'Password is too short' }),
        confirmPassword: z
            .string()
            .min(8, { message: 'Confirm Password is too short' }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });

const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(8, { message: 'Password is too short' }),
});

export const authZod = {
    registerSchema,
    loginSchema,
};
