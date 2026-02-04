import { prisma } from '../../../../lib/prisma';
import ApiError from '../../error/ApiError';
import { PaginationHelper } from '../../helper/paginationHelper';
const createAttendance = async (req) => {
    const payload = req.body;
    try {
        const result = await prisma.attendance.create({
            data: payload,
            include: {
                worker: true,
            },
        });
        return result;
    }
    catch (error) {
        if (error.code === 'P2002') {
            throw new ApiError(400, `Attendance already exists for worker on this date. Please update existing record instead.`);
        }
        throw error;
    }
};
// Bulk create or update attendance for a specific date
const bulkUpsertAttendance = async (req) => {
    const { date, attendances } = req.body;
    if (!date || !Array.isArray(attendances) || attendances.length === 0) {
        throw new ApiError(400, 'Date and attendances array are required');
    }
    const results = [];
    for (const attendance of attendances) {
        const { workerId, isPresent, workHours, note } = attendance;
        // Check if attendance exists for this worker on this date
        const existingAttendance = await prisma.attendance.findFirst({
            where: {
                workerId,
                date: new Date(date),
            },
        });
        let result;
        if (existingAttendance) {
            // Update existing attendance
            result = await prisma.attendance.update({
                where: { id: existingAttendance.id },
                data: {
                    isPresent,
                    workHours,
                    note,
                },
                include: {
                    worker: true,
                },
            });
        }
        else {
            // Create new attendance
            result = await prisma.attendance.create({
                data: {
                    workerId,
                    date: new Date(date),
                    isPresent,
                    workHours,
                    note,
                },
                include: {
                    worker: true,
                },
            });
        }
        results.push(result);
    }
    return results;
};
// Get attendances by date
const getAttendancesByDate = async (req) => {
    const { date } = req.params;
    if (!date) {
        throw new ApiError(400, 'Date is required');
    }
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);
    const result = await prisma.attendance.findMany({
        where: {
            date: {
                gte: startDate,
                lte: endDate,
            },
        },
        include: {
            worker: true,
        },
        orderBy: {
            worker: {
                name: 'asc',
            },
        },
    });
    return result;
};
const getAllAttendances = async (filters, options) => {
    const { page, limit, skip } = PaginationHelper.calculatePagination(options);
    const { searchTerm, workerId, isPresent } = filters;
    const andConditions = [];
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
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = await prisma.attendance.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
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
const getSingleAttendance = async (req) => {
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
const updateAttendance = async (req) => {
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
const deleteAttendance = async (req) => {
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
    bulkUpsertAttendance,
    getAttendancesByDate,
};
