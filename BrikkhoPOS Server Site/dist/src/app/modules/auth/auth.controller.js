import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthService } from './auth.service';
const Login = catchAsync(async (req, res) => {
    const result = await AuthService.login(req);
    const { accessToken, refreshToken } = result;
    res.cookie('accessToken', accessToken, {
        secure: true,
        httpOnly: true,
        sameSite: 'none',
        maxAge: 1000 * 60 * 60,
    });
    res.cookie('refreshToken', refreshToken, {
        secure: true,
        httpOnly: true,
        sameSite: 'none',
        maxAge: 1000 * 60 * 60 * 24 * 90,
    });
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'loggedin successfully!',
        data: {
            accessToken,
            refreshToken,
        },
    });
});
export const AuthController = {
    Login,
};
