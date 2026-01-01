import { Request, Response } from 'express';
import status from 'http-status';
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

export const WorkerController = {
    CreateWorker,
};
