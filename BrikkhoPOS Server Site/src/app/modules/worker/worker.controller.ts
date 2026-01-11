import { Request, Response } from 'express';
import status from 'http-status';
import pick from '../../helper/pick';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { WorkerService } from './worker.service';

const CreateWorker = catchAsync(async (req: Request, res: Response) => {
    const result = await WorkerService.createWorker(req);

    sendResponse(res, {
        statusCode: status.CREATED,
        success: true,
        message: 'Worker created successfully',
        data: result,
    });
});

const GetAllWorkers = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, ['searchTerm', 'status']);
    const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);

    const result = await WorkerService.getAllWorkers(filters, options);

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Workers retrieved successfully',
        meta: result.meta,
        data: result.data,
    });
});

const GetSingleWorker = catchAsync(async (req: Request, res: Response) => {
    const result = await WorkerService.getSingleWorker(req);

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Worker retrieved successfully',
        data: result,
    });
});

const UpdateWorker = catchAsync(async (req: Request, res: Response) => {
    const result = await WorkerService.updateWorker(req);

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Worker updated successfully',
        data: result,
    });
});

const SoftDeleteWorker = catchAsync(async (req: Request, res: Response) => {
    const result = await WorkerService.softDeleteWorker(req);

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Worker soft deleted successfully',
        data: result,
    });
});

const DeleteWorker = catchAsync(async (req: Request, res: Response) => {
    const result = await WorkerService.deleteWorker(req);

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Worker deleted successfully',
        data: result,
    });
});

export const WorkerController = {
    CreateWorker,
    GetAllWorkers,
    GetSingleWorker,
    UpdateWorker,
    SoftDeleteWorker,
    DeleteWorker,
};
