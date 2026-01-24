import z from 'zod';

const createWeeklySummarySchema = z.object({
    workerId: z.string().min(1, { message: 'শ্রমিক নির্বাচন আবশ্যক' }),
    weekStartDate: z.string().min(1, { message: 'সপ্তাহ শুরুর তারিখ আবশ্যক' }),
    weekEndDate: z.string().min(1, { message: 'সপ্তাহ শেষের তারিখ আবশ্যক' }),
    isPaid: z.boolean().default(false),
});

const updateWeeklySummarySchema = z.object({
    isPaid: z.boolean().optional(),
});

const weeklyReportSchema = z.object({
    workerId: z.string().min(1, { message: 'শ্রমিক নির্বাচন আবশ্যক' }),
    weekStartDate: z.string().min(1, { message: 'সপ্তাহ শুরুর তারিখ আবশ্যক' }),
    weekEndDate: z.string().min(1, { message: 'সপ্তাহ শেষের তারিখ আবশ্যক' }),
});

export const weeklySummaryZod = {
    createWeeklySummarySchema,
    updateWeeklySummarySchema,
    weeklyReportSchema,
};
