export interface IWeeklySummary {
    id: string;
    workerId: string;
    weekStartDate: Date;
    weekEndDate: Date;
    totalDaysWorked: number;
    totalSalary: number;
    isPaid?: boolean;
    paidAt?: Date;
}
