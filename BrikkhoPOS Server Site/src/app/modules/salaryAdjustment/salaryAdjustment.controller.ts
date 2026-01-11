import { Request, Response } from 'express';
import status from 'http-status';
import pick from '../../helper/pick';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SalaryAdjustmentService } from './salaryAdjustment.service';

const CreateSalaryAdjustment = catchAsync(
    async (req: Request, res: Response) => {
        const result = await SalaryAdjustmentService.createSalaryAdjustment(
            req
        );

        sendResponse(res, {
            statusCode: status.CREATED,
            success: true,
            message: 'Salary Adjustment created successfully',
            data: result,
        });
    }
);

const GetAllSalaryAdjustments = catchAsync(
    async (req: Request, res: Response) => {
        const filters = pick(req.query, [
            'searchTerm',
            'weeklySummaryId',
            'type',
        ]);
        const options = pick(req.query, [
            'page',
            'limit',
            'sortBy',
            'sortOrder',
        ]);

        const result = await SalaryAdjustmentService.getAllSalaryAdjustments(
            filters,
            options
        );

        sendResponse(res, {
            statusCode: status.OK,
            success: true,
            message: 'Salary Adjustments retrieved successfully',
            meta: result.meta,
            data: result.data,
        });
    }
);

const GetSingleSalaryAdjustment = catchAsync(
    async (req: Request, res: Response) => {
        const result = await SalaryAdjustmentService.getSingleSalaryAdjustment(
            req
        );

        sendResponse(res, {
            statusCode: status.OK,
            success: true,
            message: 'Salary Adjustment retrieved successfully',
            data: result,
        });
    }
);

const UpdateSalaryAdjustment = catchAsync(
    async (req: Request, res: Response) => {
        const result = await SalaryAdjustmentService.updateSalaryAdjustment(
            req
        );

        sendResponse(res, {
            statusCode: status.OK,
            success: true,
            message: 'Salary Adjustment updated successfully',
            data: result,
        });
    }
);

const DeleteSalaryAdjustment = catchAsync(
    async (req: Request, res: Response) => {
        const result = await SalaryAdjustmentService.deleteSalaryAdjustment(
            req
        );

        sendResponse(res, {
            statusCode: status.OK,
            success: true,
            message: 'Salary Adjustment deleted successfully',
            data: result,
        });
    }
);

export const SalaryAdjustmentController = {
    CreateSalaryAdjustment,
    GetAllSalaryAdjustments,
    GetSingleSalaryAdjustment,
    UpdateSalaryAdjustment,
    DeleteSalaryAdjustment,
};
