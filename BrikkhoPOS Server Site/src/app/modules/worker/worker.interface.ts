interface IWorker {
    id: string;
    name: string;
    dailySalary: number;
    address?: string;
    profilePicture?: string;
    age?: number;
    phoneNumber?: string;
    email?: string;
    status: IActiveStatus;
    createdAt: Date;
    updatedAt: Date;
}
