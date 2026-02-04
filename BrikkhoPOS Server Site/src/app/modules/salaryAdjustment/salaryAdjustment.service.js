import { prisma } from '../../../../lib/prisma';
import ApiError from '../../error/ApiError';
import { PaginationHelper } from '../../helper/paginationHelper';
const createSalaryAdjustment = async (req) => {
    const payload = req.body;
    try {
        const result = await prisma.salaryAdjustment.create({
            data: payload,
            include: {
                weeklySummary: true,
            },
        });
        return result;
    }
    catch (error) {
        throw new ApiError(400, error.message);
    }
};
const getAllSalaryAdjustments = async (filters, options) => {
    const { page, limit, skip } = PaginationHelper.calculatePagination(options);
    const { searchTerm, weeklySummaryId, type } = filters;
    const andConditions = [];
    if (weeklySummaryId) {
        andConditions.push({
            weeklySummaryId: weeklySummaryId,
        });
    }
    if (type) {
        andConditions.push({
            type: type,
        });
    }
    if (searchTerm) {
        andConditions.push({
            OR: ['reason'].map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = await prisma.salaryAdjustment.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {
                createdAt: 'desc',
            },
        include: {
            weeklySummary: true,
        },
    });
    const total = await prisma.salaryAdjustment.count({
        where: whereConditions,
    });
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
};
const getSingleSalaryAdjustment = async (req) => {
    const { id } = req.params;
    const result = await prisma.salaryAdjustment.findFirst({
        where: { id },
        include: {
            weeklySummary: true,
        },
    });
    if (!result) {
        throw new ApiError(404, 'Salary Adjustment not found');
    }
    return result;
};
const updateSalaryAdjustment = async (req) => {
    const { id } = req.params;
    const payload = req.body;
    const result = await prisma.salaryAdjustment.update({
        where: { id },
        data: payload,
        include: {
            weeklySummary: true,
        },
    });
    return result;
};
const deleteSalaryAdjustment = async (req) => {
    const { id } = req.params;
    const result = await prisma.salaryAdjustment.delete({
        where: { id },
    });
    return result;
};
export const SalaryAdjustmentService = {
    createSalaryAdjustment,
    getAllSalaryAdjustments,
    getSingleSalaryAdjustment,
    updateSalaryAdjustment,
    deleteSalaryAdjustment,
};
