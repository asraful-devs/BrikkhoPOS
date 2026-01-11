import z from 'zod';

const salaryAdjustmentCreateZodSchema = z.object({
    weeklySummaryId: z.string().nonempty('Weekly Summary ID is required'),
    type: z.enum(['BONUS', 'OVERTIME', 'DEDUCTION', 'ADVANCE']),
    amount: z.number().min(0, 'Amount must be a positive number'),
    reason: z.string().optional(),
});

const salaryAdjustmentUpdateZodSchema = z.object({
    type: z.enum(['BONUS', 'OVERTIME', 'DEDUCTION', 'ADVANCE']).optional(),
    amount: z.number().min(0, 'Amount must be a positive number').optional(),
    reason: z.string().optional(),
});

export const salaryAdjustmentVaildation = {
    salaryAdjustmentCreateZodSchema,
    salaryAdjustmentUpdateZodSchema,
};
