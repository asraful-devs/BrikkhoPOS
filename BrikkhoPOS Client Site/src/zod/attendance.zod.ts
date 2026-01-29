import z from 'zod';

const createAttendanceSchema = z.object({
    workerId: z.string().min(1, { message: 'Worker selection is required' }),
    date: z.string().optional(),
    isPresent: z.boolean().default(true),
    workHours: z.coerce
        .number()
        .min(0, { message: 'Work hours must be positive' })
        .default(8),
    note: z.string().optional(),
});

const updateAttendanceSchema = z.object({
    isPresent: z.boolean().optional(),
    workHours: z.coerce
        .number()
        .min(0, { message: 'Work hours must be positive' })
        .optional(),
    note: z.string().optional(),
});

export const attendanceZod = {
    createAttendanceSchema,
    updateAttendanceSchema,
};
