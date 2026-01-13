import httpStatus from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
import { prisma } from '../../../lib/prisma';
import config from '../config';
import ApiError from '../error/ApiError';
import { generateToken, verifyToken } from './jwt';

export const createUserTokens = (user: Partial<IUser>) => {
    const jwtPayload = {
        id: user.id,
        email: user.email,
        role: user.role,
    };

    const accessToken = generateToken(
        jwtPayload,
        config.jwt.access_secret as string,
        config.jwt.access_expires_in as string
    );

    const refreshToken = generateToken(
        jwtPayload,
        config.jwt.refresh_secret as string,
        config.jwt.refresh_expires_in as string
    );

    return {
        accessToken,
        refreshToken,
    };
};

export const createNewAccessTokenWithRefreshToken = async (
    refreshToken: string
) => {
    const verifiedRefreshToken = verifyToken(
        refreshToken,
        config.jwt.refresh_secret as string
    ) as JwtPayload;

    const isUserExist = await prisma.user.findUnique({
        where: { email: verifiedRefreshToken.email },
    });

    if (!isUserExist) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'User does not exist');
    }
    if (isUserExist.status === 'INACTIVE') {
        throw new ApiError(
            httpStatus.BAD_REQUEST,
            `User is ${isUserExist.status}`
        );
    }

    const jwtPayload = {
        userId: isUserExist.id,
        email: isUserExist.email,
        role: isUserExist.role,
    };

    const accessToken = generateToken(
        jwtPayload,
        config.jwt.access_secret as string,
        config.jwt.access_expires_in as string
    );

    return {
        accessToken,
    };
};
