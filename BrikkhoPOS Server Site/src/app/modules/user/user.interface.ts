interface IUser {
    id: string;
    email: string;
    password: string;
    name?: string;
    phone?: string;
    role: IRole;
    status: IActiveStatus;
    createdAt: Date;
    updatedAt: Date;
}
