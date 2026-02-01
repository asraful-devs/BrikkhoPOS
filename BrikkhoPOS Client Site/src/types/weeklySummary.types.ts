import type { ISalaryAdjustment } from './salaryAdjustment.types';
import type { IWorker } from './worker.types';

export interface IWeeklySummary {
    id: string;
    workerId: string;
    weekStartDate: string;
    weekEndDate: string;
    totalDaysWorked: number;
    totalSalary: number;
    isPaid: boolean;
    paidAt?: string;
    createdAt: string;
    updatedAt: string;
    worker?: IWorker;
    adjustments?: ISalaryAdjustment[];
}

export interface ICreateWeeklySummary {
    weekStartDate: string;
    weekEndDate: string;
    isPaid?: boolean;
}

export interface IUpdateWeeklySummary {
    isPaid?: boolean;
}

export interface IWeeklySummaryResponse {
    success: boolean;
    message: string;
    data: IWeeklySummary;
}

export interface IWeeklySummariesResponse {
    success: boolean;
    message: string;
    data: IWeeklySummary[];
}

export interface IWeeklyReportRequest {
    weekStartDate: string;
    weekEndDate: string;
}
