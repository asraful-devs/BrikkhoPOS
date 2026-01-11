export interface ISalaryAdjustment {
    id: string;
    weeklySummaryId: string;
    type: 'BONUS' | 'OVERTIME' | 'DEDUCTION' | 'ADVANCE';
    amount: number;
    reason?: string;
    createdAt: Date;
    updatedAt: Date;
}
