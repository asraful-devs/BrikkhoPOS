import { prisma } from '../../../../lib/prisma';
import ApiError from '../../error/ApiError';
import { PaginationHelper } from '../../helper/paginationHelper';
const createWorker = async (req) => {
    const payload = req.body;
    const result = await prisma.worker.create({
        data: payload,
    });
    return result;
};
const getAllWorkers = async (filters, options) => {
    const { page, limit, skip } = PaginationHelper.calculatePagination(options);
    const { searchTerm, status } = filters;
    const andConditions = [{ isDeleted: false }];
    if (searchTerm) {
        andConditions.push({
            OR: ['status'].map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    if (status) {
        andConditions.push({
            status: {
                contains: status,
                mode: 'insensitive',
            },
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = await prisma.worker.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {
                createdAt: 'desc',
            },
    });
    const total = await prisma.worker.count({
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
const getSingleWorker = async (req) => {
    const { id } = req.params;
    const result = await prisma.worker.findFirst({
        where: { id, isDeleted: false },
    });
    if (!result) {
        throw new ApiError(404, 'Worker not found');
    }
    return result;
};
const updateWorker = async (req) => {
    const { id } = req.params;
    const payload = req.body;
    // Convert empty string email to null to avoid unique constraint violation
    if (payload.email === '') {
        payload.email = null;
    }
    const result = await prisma.worker.update({
        where: { id, isDeleted: false },
        data: payload,
    });
    return result;
};
const softDeleteWorker = async (req) => {
    const { id } = req.params;
    const result = await prisma.worker.update({
        where: { id },
        data: { isDeleted: true },
    });
    return result;
};
const deleteWorker = async (req) => {
    const { id } = req.params;
    const result = await prisma.worker.delete({
        where: { id },
    });
    return result;
};
export const WorkerService = {
    createWorker,
    getAllWorkers,
    getSingleWorker,
    updateWorker,
    softDeleteWorker,
    deleteWorker,
};
