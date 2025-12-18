import z from 'zod';

const createUserZodSchema = z.object({
    name: z.string().optional(),
    email: z.email().nonempty('Email is required'),
    password: z.string().min(6).nonempty('Password is required'),
    phone: z.string().optional(),
    role: z.enum(['ADMIN', 'USER']).optional(),
});

export const userVaildation = {
    createUserZodSchema,
};
