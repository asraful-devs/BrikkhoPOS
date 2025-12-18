import { Request, Response } from 'express';
import status from 'http-status';
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
    const result = await UserService.getAllusers();

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'All users retrieved successfully !',
        data: result,
    });
});

export const UserController = {
    CreateUser,
    GetAllusers,
};
