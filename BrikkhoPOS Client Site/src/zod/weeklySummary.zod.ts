import z from 'zod';

const createWeeklySummarySchema = z.object({
    workerId: z.string().min(1, { message: 'Worker selection is required' }),
    weekStartDate: z
        .string()
        .min(1, { message: 'Week start date is required' }),
    weekEndDate: z.string().min(1, { message: 'Week end date is required' }),
    isPaid: z.boolean().default(false),
});

const updateWeeklySummarySchema = z.object({
    isPaid: z.boolean().optional(),
});

const weeklyReportSchema = z.object({
    workerId: z.string().min(1, { message: 'Worker selection is required' }),
    weekStartDate: z
        .string()
        .min(1, { message: 'Week start date is required' }),
    weekEndDate: z.string().min(1, { message: 'Week end date is required' }),
});

export const weeklySummaryZod = {
    createWeeklySummarySchema,
    updateWeeklySummarySchema,
    weeklyReportSchema,
};
