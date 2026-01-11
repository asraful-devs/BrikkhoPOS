import { Request } from 'express';
import { Prisma } from '../../../../generated/prisma/client';
import { prisma } from '../../../../lib/prisma';
import ApiError from '../../error/ApiError';
import { IOptions, PaginationHelper } from '../../helper/paginationHelper';

const createSalaryAdjustment = async (req: Request) => {
    const payload = req.body;

    try {
        const result = await prisma.salaryAdjustment.create({
            data: payload,
            include: {
                weeklySummary: true,
            },
        });
        return result;
    } catch (error: any) {
        throw new ApiError(400, error.message);
    }
};

const getAllSalaryAdjustments = async (
    filters: {
        searchTerm?: string;
        weeklySummaryId?: string;
        type?: string;
    },
    options: IOptions
) => {
    const { page, limit, skip } = PaginationHelper.calculatePagination(options);

    const { searchTerm, weeklySummaryId, type } = filters;

    const andConditions: any[] = [];

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

    const whereConditions: Prisma.SalaryAdjustmentWhereInput =
        andConditions.length > 0 ? { AND: andConditions } : {};

    const result = await prisma.salaryAdjustment.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy:
            options.sortBy && options.sortOrder
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

const getSingleSalaryAdjustment = async (req: Request) => {
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

const updateSalaryAdjustment = async (req: Request) => {
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

const deleteSalaryAdjustment = async (req: Request) => {
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
