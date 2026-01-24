import z from 'zod';

const createSalaryAdjustmentSchema = z.object({
    weeklySummaryId: z.string().min(1, { message: 'Weekly Summary নির্বাচন আবশ্যক' }),
    type: z.enum(['BONUS', 'OVERTIME', 'DEDUCTION', 'ADVANCE'], {
        errorMap: () => ({ message: 'টাইপ নির্বাচন করুন' }),
    }),
    amount: z.coerce.number().min(0, { message: 'পরিমাণ ধনাত্মক হতে হবে' }),
    reason: z.string().optional(),
});

const updateSalaryAdjustmentSchema = z.object({
    type: z.enum(['BONUS', 'OVERTIME', 'DEDUCTION', 'ADVANCE']).optional(),
    amount: z.coerce.number().min(0, { message: 'পরিমাণ ধনাত্মক হতে হবে' }).optional(),
    reason: z.string().optional(),
});

export const salaryAdjustmentZod = {
    createSalaryAdjustmentSchema,
    updateSalaryAdjustmentSchema,
};
