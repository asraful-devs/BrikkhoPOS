export type TAdjustmentType = 'BONUS' | 'OVERTIME' | 'DEDUCTION' | 'ADVANCE';

export interface ISalaryAdjustment {
    id: string;
    weeklySummaryId: string;
    type: TAdjustmentType;
    amount: number;
    reason?: string;
    createdAt: string;
    updatedAt: string;
}

export interface ICreateSalaryAdjustment {
    weeklySummaryId: string;
    type: TAdjustmentType;
    amount: number;
    reason?: string;
}

export interface IUpdateSalaryAdjustment {
    type?: TAdjustmentType;
    amount?: number;
    reason?: string;
}

export interface ISalaryAdjustmentResponse {
    success: boolean;
    message: string;
    data: ISalaryAdjustment;
}

export interface ISalaryAdjustmentsResponse {
    success: boolean;
    message: string;
    data: ISalaryAdjustment[];
}
