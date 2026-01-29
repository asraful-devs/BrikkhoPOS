import z from 'zod';

const createWorkerSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    phoneNumber: z.string().optional(),
    dailySalary: z.coerce
        .number()
        .min(0, { message: 'Daily salary must be positive' }),
});

const updateWorkerSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }).optional(),
    phoneNumber: z.string().optional(),
    dailySalary: z.coerce
        .number()
        .min(0, { message: 'Daily salary must be positive' })
        .optional(),
    address: z.string().optional(),
    profilePicture: z.string().optional(),
    age: z.coerce
        .number()
        .min(0, { message: 'Age must be positive' })
        .optional(),
    email: z
        .string()
        .email({ message: 'Please provide a valid email' })
        .optional()
        .or(z.literal('')),
    status: z.enum(['ACTIVE', 'INACTIVE']).optional(),
});

export const workerZod = {
    createWorkerSchema,
    updateWorkerSchema,
};
