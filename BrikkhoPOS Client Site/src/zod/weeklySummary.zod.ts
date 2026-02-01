import z from 'zod';

const createWeeklySummarySchema = z.object({
    weekStartDate: z
        .string()
        .min(1, { message: 'Week start date is required' }),
    weekEndDate: z.string().min(1, { message: 'Week end date is required' }),
    isPaid: z.boolean().optional().default(false),
});

const updateWeeklySummarySchema = z.object({
    isPaid: z.boolean().optional(),
});

const weeklyReportSchema = z.object({
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
