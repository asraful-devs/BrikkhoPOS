interface IUser {
    id: string;
    name: string;
    email: string;
    role: IRole;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}
