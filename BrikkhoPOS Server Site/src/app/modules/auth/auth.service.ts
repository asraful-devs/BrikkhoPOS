import bcrypt from 'bcrypt';
import { Request } from 'express';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import { ActiveStatus } from '../../../../generated/prisma/enums';
import { prisma } from '../../../../lib/prisma';
import config from '../../config';
import ApiError from '../../error/ApiError';
import { JwtHelper } from '../../helper/JwtHelper';

const login = async (req: Request) => {
    const payload = req.body;

    const result = await prisma.user.findUniqueOrThrow({
        where: {
            email: payload.email,
            status: ActiveStatus.ACTIVE,
        },
    });

    const detailsResult = await prisma.user.findUniqueOrThrow({
        where: {
            email: result.email,
        },
    });

    const isCorrectPassword = await bcrypt.compare(
        payload.password,
        result.password
    );

    if (!isCorrectPassword) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Password is incorrect!');
    }

    const accessToken = JwtHelper.generateTokens(
        {
            id: result.id,
            name: result.name,
            email: result.email,
            role: result.role,
        },
        config.jwt.access_secret as Secret,
        config.jwt.access_expires_in as string
    );

    const refreshToken = JwtHelper.generateTokens(
        {
            id: result.id,
            name: result.name,
            email: result.email,
            role: result.role,
        },
        config.jwt.refresh_secret as Secret,
        config.jwt.refresh_expires_in as string
    );

    return {
        accessToken,
        refreshToken,
    };
};

export const AuthService = {
    login,
};
