import z from 'zod';
const attendanceCreateZodSchema = z.object({
    workerId: z.string().nonempty('Worker ID is required'),
    date: z.string().datetime().optional(),
    isPresent: z.boolean().optional(),
    workHours: z
        .number()
        .min(0, 'Work hours must be a positive number')
        .optional(),
    note: z.string().optional(),
});
const attendanceUpdateZodSchema = z.object({
    isPresent: z.boolean().optional(),
    workHours: z
        .number()
        .min(0, 'Work hours must be a positive number')
        .optional(),
    note: z.string().optional(),
});
export const attendanceVaildation = {
    attendanceCreateZodSchema,
    attendanceUpdateZodSchema,
};
