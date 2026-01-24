import z from 'zod';

const createWorkerSchema = z.object({
    name: z.string().min(1, { message: 'নাম আবশ্যক' }),
    phoneNumber: z.string().optional(),
    dailySalary: z.coerce.number().min(0, { message: 'দৈনিক বেতন ধনাত্মক হতে হবে' }),
});

const updateWorkerSchema = z.object({
    name: z.string().min(1, { message: 'নাম আবশ্যক' }).optional(),
    phoneNumber: z.string().optional(),
    dailySalary: z.coerce.number().min(0, { message: 'দৈনিক বেতন ধনাত্মক হতে হবে' }).optional(),
    address: z.string().optional(),
    profilePicture: z.string().optional(),
    age: z.coerce.number().min(0, { message: 'বয়স ধনাত্মক হতে হবে' }).optional(),
    email: z.string().email({ message: 'সঠিক ইমেইল দিন' }).optional().or(z.literal('')),
    status: z.enum(['ACTIVE', 'INACTIVE']).optional(),
});

export const workerZod = {
    createWorkerSchema,
    updateWorkerSchema,
};
