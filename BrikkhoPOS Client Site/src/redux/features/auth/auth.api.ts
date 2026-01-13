import { baseApi } from '../../baseApi';

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (userInfo) => ({
                url: '/auth/login',
                method: 'POST',
                data: userInfo,
            }),
            invalidatesTags: ['USER', 'ADMIN'],
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
            invalidatesTags: ['USER', 'ADMIN'],
        }),
        register: builder.mutation({
            query: (userInfo) => ({
                url: '/user/create-user',
                method: 'POST',
                data: userInfo,
            }),
            invalidatesTags: ['USER', 'ADMIN'],
        }),
        userInfo: builder.query({
            query: () => ({
                url: '/user/me',
                method: 'GET',
            }),
            providesTags: ['USER', 'ADMIN'],
        }),
    }),
});

export const {
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
    useUserInfoQuery,
} = authApi;
