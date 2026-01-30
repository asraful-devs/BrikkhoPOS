import z from 'zod';

const workerCreateZodSchema = z.object({
    name: z.string().nonempty('Name is required'),
    phoneNumber: z.string().optional(),
    dailySalary: z.number().min(0, 'Daily salary must be a positive number'),
});

const workerUpdateZodSchema = z.object({
    name: z.string().nonempty('Name is required').optional(),
    phoneNumber: z.string().optional(),
    dailySalary: z
        .number()
        .min(0, 'Daily salary must be a positive number')
        .optional(),
    address: z.string().optional(),
    profilePicture: z.string().optional(),
    age: z.number().min(0, 'Age must be a positive number').optional(),
    email: z
        .string()
        .email('Invalid email address')
        .optional()
        .or(z.literal('')),
    status: z.enum(['ACTIVE', 'INACTIVE']).optional(),
});

export const workerVaildation = {
    workerCreateZodSchema,
    workerUpdateZodSchema,
};
