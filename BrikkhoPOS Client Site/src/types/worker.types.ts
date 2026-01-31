export type TActiveStatus = 'ACTIVE' | 'INACTIVE';

export interface IWorker {
    id: string;
    name: string;
    dailySalary: number;
    address?: string;
    profilePicture?: string;
    age?: number;
    phoneNumber?: string;
    email?: string;
    status: TActiveStatus;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface IWorkerFilters {
    status?: TActiveStatus;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export interface ICreateWorker {
    name: string;
    phoneNumber?: string;
    dailySalary: number;
}

export interface IUpdateWorker {
    name?: string;
    phoneNumber?: string;
    dailySalary?: number;
    address?: string;
    profilePicture?: string;
    age?: number;
    email?: string;
    status?: TActiveStatus;
}

export interface IWorkerResponse {
    success: boolean;
    message: string;
    data: IWorker;
}

export interface IWorkersResponse {
    success: boolean;
    message: string;
    data: IWorker[];
}
