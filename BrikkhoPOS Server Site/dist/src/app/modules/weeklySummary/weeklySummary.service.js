import { prisma } from '../../../../lib/prisma';
import ApiError from '../../error/ApiError';
import { PaginationHelper } from '../../helper/paginationHelper';
const createWeeklySummary = async (req) => {
    const payload = req.body;
    try {
        // Convert date strings to proper Date format
        const weekStartDate = new Date(payload.weekStartDate);
        const weekEndDate = new Date(payload.weekEndDate);
        // Get all active workers
        const workers = await prisma.worker.findMany({
            where: {
                isDeleted: false,
                status: 'ACTIVE',
            },
        });
        if (workers.length === 0) {
            throw new ApiError(404, 'No active workers found');
        }
        // Create weekly summaries for all workers
        const createdSummaries = await Promise.all(workers.map(async (worker) => {
            // Get attendances within the date range
            const workerAttendance = await prisma.attendance.findMany({
                where: {
                    workerId: worker.id,
                    date: {
                        gte: weekStartDate,
                        lte: weekEndDate,
                    },
                },
            });
            // Calculate days worked and salary
            const daysWorked = workerAttendance.filter((a) => a.isPresent).length;
            const totalSalary = daysWorked * worker.dailySalary;
            // Create weekly summary for this worker
            return await prisma.weeklySummary.create({
                data: {
                    workerId: worker.id,
                    weekStartDate,
                    weekEndDate,
                    totalDaysWorked: daysWorked,
                    totalSalary,
                    isPaid: payload.isPaid || false,
                },
                include: {
                    worker: true,
                    adjustments: true,
                },
            });
        }));
        return {
            message: `Successfully created weekly summaries for ${createdSummaries.length} workers`,
            count: createdSummaries.length,
            summaries: createdSummaries,
        };
    }
    catch (error) {
        if (error.code === 'P2002') {
            throw new ApiError(400, `Weekly summary already exists for one or more workers on the selected week. Please update existing records instead.`);
        }
        throw error;
    }
};
const getAllWeeklySummaries = async (filters, options) => {
    const { page, limit, skip } = PaginationHelper.calculatePagination(options);
    const { searchTerm, workerId, isPaid } = filters;
    const andConditions = [];
    if (workerId) {
        andConditions.push({
            workerId: workerId,
        });
    }
    if (isPaid !== undefined) {
        andConditions.push({
            isPaid: isPaid,
        });
    }
    if (searchTerm) {
        andConditions.push({
            OR: ['worker'].map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = await prisma.weeklySummary.findMany({
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
            adjustments: true,
        },
    });
    const total = await prisma.weeklySummary.count({
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
const getSingleWeeklySummary = async (req) => {
    const { id } = req.params;
    const result = await prisma.weeklySummary.findFirst({
        where: { id },
        include: {
            worker: true,
            adjustments: true,
        },
    });
    if (!result) {
        throw new ApiError(404, 'Weekly summary not found');
    }
    return result;
};
const updateWeeklySummary = async (req) => {
    const { id } = req.params;
    const payload = req.body;
    const result = await prisma.weeklySummary.update({
        where: { id },
        data: {
            paidAt: new Date(),
            ...payload,
        },
        include: {
            worker: true,
            adjustments: true,
        },
    });
    return result;
};
const deleteWeeklySummary = async (req) => {
    const { id } = req.params;
    const result = await prisma.weeklySummary.delete({
        where: { id },
    });
    return result;
};
//Main functon to generate weekly report
const generateWeeklyReport = async (req) => {
    const { weekStartDate, weekEndDate } = req.body;
    if (!weekStartDate || !weekEndDate) {
        throw new ApiError(400, 'weekStartDate and weekEndDate are required. Format: YYYY-MM-DD');
    }
    const start = new Date(weekStartDate);
    const end = new Date(weekEndDate);
    if (start > end) {
        throw new ApiError(400, 'weekStartDate must be before weekEndDate');
    }
    // Get all active workers
    const workers = await prisma.worker.findMany({
        where: {
            isDeleted: false,
            status: 'ACTIVE',
        },
    });
    // Generate report for each worker
    const report = await Promise.all(workers.map(async (worker) => {
        // Get all attendances in the date range
        const attendances = await prisma.attendance.findMany({
            where: {
                workerId: worker.id,
                date: {
                    gte: start,
                    lte: end,
                },
            },
        });
        // Calculate days worked and total salary
        const totalDaysWorked = attendances.filter((a) => a.isPresent).length;
        const totalSalary = totalDaysWorked * worker.dailySalary;
        // Get adjustments if any weeklySummary exists for this range
        const weeklySummaries = await prisma.weeklySummary.findMany({
            where: {
                workerId: worker.id,
                weekStartDate: {
                    gte: start,
                },
                weekEndDate: {
                    lte: end,
                },
            },
            include: {
                adjustments: true,
            },
        });
        // Calculate total adjustments
        let totalBonus = 0;
        let totalDeduction = 0;
        let totalOvertime = 0;
        let totalAdvance = 0;
        weeklySummaries.forEach((summary) => {
            summary.adjustments.forEach((adj) => {
                if (adj.type === 'BONUS')
                    totalBonus += adj.amount;
                if (adj.type === 'DEDUCTION')
                    totalDeduction += adj.amount;
                if (adj.type === 'OVERTIME')
                    totalOvertime += adj.amount;
                if (adj.type === 'ADVANCE')
                    totalAdvance += adj.amount;
            });
        });
        const finalAmount = totalSalary +
            totalBonus +
            totalOvertime -
            totalDeduction -
            totalAdvance;
        return {
            workerId: worker.id,
            workerName: worker.name,
            dailySalary: worker.dailySalary,
            totalDaysWorked,
            baseSalary: totalSalary,
            bonus: totalBonus,
            overtime: totalOvertime,
            deduction: totalDeduction,
            advance: totalAdvance,
            finalAmount,
            attendanceCount: attendances.length,
            presentDays: totalDaysWorked,
            absentDays: attendances.length - totalDaysWorked,
        };
    }));
    const summaryTotals = {
        totalWorkers: workers.length,
        totalBaseSalary: report.reduce((sum, r) => sum + r.baseSalary, 0),
        totalBonus: report.reduce((sum, r) => sum + r.bonus, 0),
        totalOvertime: report.reduce((sum, r) => sum + r.overtime, 0),
        totalDeduction: report.reduce((sum, r) => sum + r.deduction, 0),
        totalAdvance: report.reduce((sum, r) => sum + r.advance, 0),
        totalFinalAmount: report.reduce((sum, r) => sum + r.finalAmount, 0),
    };
    return {
        reportPeriod: {
            startDate: weekStartDate,
            endDate: weekEndDate,
            totalDays: Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1,
        },
        summaryTotals,
        workerDetails: report,
    };
};
export const WeeklySummaryService = {
    createWeeklySummary,
    getAllWeeklySummaries,
    getSingleWeeklySummary,
    updateWeeklySummary,
    deleteWeeklySummary,
    generateWeeklyReport,
};
