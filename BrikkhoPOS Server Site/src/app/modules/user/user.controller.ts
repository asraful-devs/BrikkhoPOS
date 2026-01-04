import { Request, Response } from 'express';
import status from 'http-status';
import pick from '../../helper/pick';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserService } from './user.service';

const CreateUser = catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.createUser(req);

    sendResponse(res, {
        statusCode: status.CREATED,
        success: true,
        message: 'User created successfully !',
        data: result,
    });
});

const GetAllusers = catchAsync(async (req: Request, res: Response) => {
    const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);

    const result = await UserService.getAllusers(options);

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'All users retrieved successfully !',
        data: result,
    });
});

const GetUserById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await UserService.getUserById(id);

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'User retrieved successfully !',
        data: result,
    });
});

const UpdateUser = catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.updateUser(req);

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'User updated successfully !',
        data: result,
    });
});

const SoftDeleteUser = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await UserService.softDeleteUser(id);

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'User soft deleted successfully !',
        data: result,
    });
});

const DeleteUser = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await UserService.deleteUser(id);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'User deleted successfully !',
        data: result,
    });
});

export const UserController = {
    CreateUser,
    GetAllusers,
    GetUserById,
    UpdateUser,
    SoftDeleteUser,
    DeleteUser,
};
