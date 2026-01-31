import { Request, Response } from 'express';
import status from 'http-status';
import pick from '../../helper/pick';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AttendanceService } from './attendance.service';

const CreateAttendance = catchAsync(async (req: Request, res: Response) => {
    const result = await AttendanceService.createAttendance(req);

    sendResponse(res, {
        statusCode: status.CREATED,
        success: true,
        message: 'Attendance created successfully',
        data: result,
    });
});

const GetAllAttendances = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, ['searchTerm', 'workerId', 'isPresent']);
    const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);

    const result = await AttendanceService.getAllAttendances(filters, options);

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Attendances retrieved successfully',
        meta: result.meta,
        data: result.data,
    });
});

const GetSingleAttendance = catchAsync(async (req: Request, res: Response) => {
    const result = await AttendanceService.getSingleAttendance(req);

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Attendance retrieved successfully',
        data: result,
    });
});

const UpdateAttendance = catchAsync(async (req: Request, res: Response) => {
    const result = await AttendanceService.updateAttendance(req);

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Attendance updated successfully',
        data: result,
    });
});

const DeleteAttendance = catchAsync(async (req: Request, res: Response) => {
    const result = await AttendanceService.deleteAttendance(req);

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Attendance deleted successfully',
        data: result,
    });
});

const BulkUpsertAttendance = catchAsync(async (req: Request, res: Response) => {
    const result = await AttendanceService.bulkUpsertAttendance(req);

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Bulk attendance saved successfully',
        data: result,
    });
});

const GetAttendancesByDate = catchAsync(async (req: Request, res: Response) => {
    const result = await AttendanceService.getAttendancesByDate(req);

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Attendances retrieved successfully',
        data: result,
    });
});

export const AttendanceController = {
    CreateAttendance,
    GetAllAttendances,
    GetSingleAttendance,
    UpdateAttendance,
    DeleteAttendance,
    BulkUpsertAttendance,
    GetAttendancesByDate,
};
