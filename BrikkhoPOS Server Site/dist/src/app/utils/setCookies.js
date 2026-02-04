export const setAuthCookies = (res, tokenInfo) => {
    if (tokenInfo.accessToken) {
        res.cookie('accessToken', tokenInfo.accessToken, {
            httpOnly: true,
            secure: true, // Set to true if using HTTPS
            sameSite: 'none',
        });
    }
    if (tokenInfo.refreshToken) {
        res.cookie('refreshToken', tokenInfo.refreshToken, {
            httpOnly: true,
            secure: true, // Set to true if using HTTPS
            sameSite: 'none',
        });
    }
};
