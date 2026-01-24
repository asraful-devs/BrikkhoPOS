import type { IWorker } from './worker.types';

export interface IAttendance {
    id: string;
    workerId: string;
    date: string;
    isPresent: boolean;
    workHours?: number;
    note?: string;
    createdAt: string;
    updatedAt: string;
    worker?: IWorker;
}

export interface ICreateAttendance {
    workerId: string;
    date?: string;
    isPresent?: boolean;
    workHours?: number;
    note?: string;
}

export interface IUpdateAttendance {
    isPresent?: boolean;
    workHours?: number;
    note?: string;
}

export interface IAttendanceResponse {
    success: boolean;
    message: string;
    data: IAttendance;
}

export interface IAttendancesResponse {
    success: boolean;
    message: string;
    data: IAttendance[];
}
