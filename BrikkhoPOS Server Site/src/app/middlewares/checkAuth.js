import httpStatus from 'http-status-codes';
import { prisma } from '../../../lib/prisma';
import config from '../config';
import ApiError from '../error/ApiError';
import { verifyToken } from '../utils/jwt';
export const checkAuth = (...authRoles) => async (req, res, next) => {
    try {
        const accessToken = req.headers.authorization || req.cookies.accessToken;
        if (!accessToken) {
            throw new ApiError(403, 'No Token Recieved');
        }
        if (!config.jwt.access_secret) {
            throw new ApiError(500, 'JWT access secret is not configured');
        }
        // const verifiedToken = jwt.verify(accessToken, 'secretOrPrivateKey');
        const verifiedToken = verifyToken(accessToken, config.jwt.access_secret);
        const isUserExist = await prisma.user.findUnique({
            where: { email: verifiedToken.email },
        });
        if (!isUserExist) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'User does not exist');
        }
        if (authRoles.length && !authRoles.includes(isUserExist.role)) {
            throw new ApiError(httpStatus.FORBIDDEN, `User is ${isUserExist.role}, not authorized to access this route`);
        }
        req.user = verifiedToken;
        next();
    }
    catch (error) {
        next(error);
    }
};
