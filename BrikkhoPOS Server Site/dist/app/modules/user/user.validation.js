import z from 'zod';
const createUserZodSchema = z.object({
    name: z.string().optional(),
    email: z.email().nonempty('Email is required'),
    password: z.string().min(6).nonempty('Password is required'),
    phone: z.string().optional(),
    role: z.enum(['ADMIN', 'USER']).optional(),
});
const updateUserZodSchema = z.object({
    name: z.string().optional(),
    phone: z.string().optional(),
    status: z.enum(['ACTIVE', 'INACTIVE']).optional(),
});
export const userVaildation = {
    createUserZodSchema,
    updateUserZodSchema,
};
