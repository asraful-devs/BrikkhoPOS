import z from 'zod';

const weeklySummaryCreateZodSchema = z.object({
    weekStartDate: z.string().nonempty('Week start date is required'),
    weekEndDate: z.string().nonempty('Week end date is required'),
    isPaid: z.boolean().optional(),
});

const weeklySummaryUpdateZodSchema = z.object({
    isPaid: z.boolean().optional(),
});

export const weeklySummaryValidation = {
    weeklySummaryCreateZodSchema,
    weeklySummaryUpdateZodSchema,
};
