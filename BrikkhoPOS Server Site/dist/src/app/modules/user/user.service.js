import bcrypt from 'bcrypt';
import status from 'http-status';
import { prisma } from '../../../../lib/prisma';
import config from '../../config';
import ApiError from '../../error/ApiError';
import { PaginationHelper } from '../../helper/paginationHelper';
const createUser = async (req) => {
    const payload = req.body;
    //password hashing
    const hashPassword = await bcrypt.hash(payload.password, config.bcrypt_salt_rounds);
    //isExisting user check logic here
    const isExisting = await prisma.user.findUnique({
        where: {
            email: payload.email,
        },
    });
    if (isExisting) {
        throw new ApiError(status.CONFLICT, 'User already exists !');
    }
    //create user logic here
    const result = await prisma.user.create({
        data: {
            ...payload,
            password: hashPassword,
        },
    });
    return result;
};
const getAllusers = async (options) => {
    const { page, limit, skip } = PaginationHelper.calculatePagination(options);
    const users = await prisma.user.findMany({
        skip: skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : { createdAt: 'desc' },
    });
    return {
        meta: {
            page,
            limit,
            total: users.length,
        },
        data: users.slice(skip, skip + limit),
    };
};
const getUserById = async (id) => {
    const user = await prisma.user.findUnique({
        where: { id },
    });
    return user;
};
const updateUser = async (req) => {
    const { id } = req.params;
    const payload = req.body;
    // Update user logic here
    const updatedUser = await prisma.user.update({
        where: { id, status: 'ACTIVE' },
        data: payload,
    });
    return updatedUser;
};
const softDeleteUser = async (id) => {
    const softDeletedUser = await prisma.user.update({
        where: { id, status: 'ACTIVE' },
        data: { status: 'INACTIVE' },
    });
    return softDeletedUser;
};
const deleteUser = async (id) => {
    const deletedUser = await prisma.user.delete({
        where: { id, status: 'ACTIVE' },
    });
    return deletedUser;
};
const getMyProfile = async (userId) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            status: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    return user;
};
export const UserService = {
    createUser,
    getAllusers,
    getUserById,
    updateUser,
    softDeleteUser,
    deleteUser,
    getMyProfile,
};
