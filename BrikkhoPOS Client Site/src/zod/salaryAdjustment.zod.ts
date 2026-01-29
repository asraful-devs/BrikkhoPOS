import z from 'zod';

const createSalaryAdjustmentSchema = z.object({
    weeklySummaryId: z
        .string()
        .min(1, { message: 'Weekly summary selection is required' }),
    type: z.enum(['BONUS', 'OVERTIME', 'DEDUCTION', 'ADVANCE'], {
        message: 'Please select a type',
    }),
    amount: z.coerce.number().min(0, { message: 'Amount must be positive' }),
    reason: z.string().optional(),
});

const updateSalaryAdjustmentSchema = z.object({
    type: z.enum(['BONUS', 'OVERTIME', 'DEDUCTION', 'ADVANCE']).optional(),
    amount: z.coerce
        .number()
        .min(0, { message: 'Amount must be positive' })
        .optional(),
    reason: z.string().optional(),
});

export const salaryAdjustmentZod = {
    createSalaryAdjustmentSchema,
    updateSalaryAdjustmentSchema,
};
