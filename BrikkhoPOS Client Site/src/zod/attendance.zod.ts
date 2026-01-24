import z from 'zod';

const createAttendanceSchema = z.object({
    workerId: z.string().min(1, { message: 'শ্রমিক নির্বাচন আবশ্যক' }),
    date: z.string().optional(),
    isPresent: z.boolean().default(true),
    workHours: z.coerce.number().min(0, { message: 'কাজের সময় ধনাত্মক হতে হবে' }).default(8),
    note: z.string().optional(),
});

const updateAttendanceSchema = z.object({
    isPresent: z.boolean().optional(),
    workHours: z.coerce.number().min(0, { message: 'কাজের সময় ধনাত্মক হতে হবে' }).optional(),
    note: z.string().optional(),
});

export const attendanceZod = {
    createAttendanceSchema,
    updateAttendanceSchema,
};
