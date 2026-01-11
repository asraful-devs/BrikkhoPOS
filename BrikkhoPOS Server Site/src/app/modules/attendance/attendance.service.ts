import { Request } from 'express';
import { Prisma } from '../../../../generated/prisma/client';
import { prisma } from '../../../../lib/prisma';
import ApiError from '../../error/ApiError';
import { IOptions, PaginationHelper } from '../../helper/paginationHelper';

const createAttendance = async (req: Request) => {
    const payload = req.body;

    const result = await prisma.attendance.create({
        data: payload,
    });
    return result;
};

const getAllAttendances = async (
    filters: {
        searchTerm?: string;
        workerId?: string;
        isPresent?: boolean;
    },
    options: IOptions
) => {
    const { page, limit, skip } = PaginationHelper.calculatePagination(options);

    const { searchTerm, workerId, isPresent } = filters;

    const andConditions: any[] = [];

    if (workerId) {
        andConditions.push({
            workerId: workerId,
        });
    }

    if (isPresent !== undefined) {
        andConditions.push({
            isPresent: isPresent,
        });
    }

    if (searchTerm) {
        andConditions.push({
            OR: ['note'].map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }

    const whereConditions: Prisma.AttendanceWhereInput =
        andConditions.length > 0 ? { AND: andConditions } : {};

    const result = await prisma.attendance.findMany({
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
            worker: true,
        },
    });

    const total = await prisma.attendance.count({
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

const getSingleAttendance = async (req: Request) => {
    const { id } = req.params;

    const result = await prisma.attendance.findFirst({
        where: { id },
        include: {
            worker: true,
        },
    });

    if (!result) {
        throw new ApiError(404, 'Attendance not found');
    }

    return result;
};

const updateAttendance = async (req: Request) => {
    const { id } = req.params;
    const payload = req.body;
    const result = await prisma.attendance.update({
        where: { id },
        data: payload,
        include: {
            worker: true,
        },
    });
    return result;
};

const deleteAttendance = async (req: Request) => {
    const { id } = req.params;

    const result = await prisma.attendance.delete({
        where: { id },
    });
    return result;
};

export const AttendanceService = {
    createAttendance,
    getAllAttendances,
    getSingleAttendance,
    updateAttendance,
    deleteAttendance,
};
