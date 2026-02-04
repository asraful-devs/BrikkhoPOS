import status from 'http-status';
import pick from '../../helper/pick';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { WeeklySummaryService } from './weeklySummary.service';
const CreateWeeklySummary = catchAsync(async (req, res) => {
    const result = await WeeklySummaryService.createWeeklySummary(req);
    sendResponse(res, {
        statusCode: status.CREATED,
        success: true,
        message: 'Weekly summary created successfully',
        data: result,
    });
});
const GetAllWeeklySummaries = catchAsync(async (req, res) => {
    const filters = pick(req.query, ['searchTerm', 'workerId', 'isPaid']);
    const options = pick(req.query, [
        'page',
        'limit',
        'sortBy',
        'sortOrder',
    ]);
    const result = await WeeklySummaryService.getAllWeeklySummaries(filters, options);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Weekly summaries retrieved successfully',
        meta: result.meta,
        data: result.data,
    });
});
const GetSingleWeeklySummary = catchAsync(async (req, res) => {
    const result = await WeeklySummaryService.getSingleWeeklySummary(req);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Weekly summary retrieved successfully',
        data: result,
    });
});
const UpdateWeeklySummary = catchAsync(async (req, res) => {
    const result = await WeeklySummaryService.updateWeeklySummary(req);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Weekly summary updated successfully',
        data: result,
    });
});
const DeleteWeeklySummary = catchAsync(async (req, res) => {
    const result = await WeeklySummaryService.deleteWeeklySummary(req);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Weekly summary deleted successfully',
        data: result,
    });
});
const GenerateWeeklyReport = catchAsync(async (req, res) => {
    const result = await WeeklySummaryService.generateWeeklyReport(req);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Weekly report generated successfully',
        data: result,
    });
});
export const WeeklySummaryController = {
    CreateWeeklySummary,
    GetAllWeeklySummaries,
    GetSingleWeeklySummary,
    UpdateWeeklySummary,
    DeleteWeeklySummary,
    GenerateWeeklyReport,
};
