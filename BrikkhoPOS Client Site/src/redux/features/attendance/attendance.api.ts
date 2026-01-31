import type {
    IAttendanceResponse,
    IAttendancesResponse,
    IBulkAttendanceResponse,
    IBulkUpsertAttendance,
    ICreateAttendance,
    IUpdateAttendance,
} from '@/types/attendance.types';
import { baseApi } from '../../baseApi';

export const attendanceApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createAttendance: builder.mutation<
            IAttendanceResponse,
            ICreateAttendance
        >({
            query: (attendanceData) => ({
                url: '/attendance/create-attendance',
                method: 'POST',
                data: attendanceData,
            }),
            invalidatesTags: ['ATTENDANCE', 'WEEKLY_SUMMARY'],
        }),

        bulkUpsertAttendance: builder.mutation<
            IBulkAttendanceResponse,
            IBulkUpsertAttendance
        >({
            query: (data) => ({
                url: '/attendance/bulk-upsert-attendance',
                method: 'POST',
                data,
            }),
            invalidatesTags: ['ATTENDANCE', 'WEEKLY_SUMMARY'],
        }),

        getAttendances: builder.query<IAttendancesResponse, void>({
            query: () => ({
                url: '/attendance/get-attendances',
                method: 'GET',
            }),
            providesTags: ['ATTENDANCE'],
        }),

        getAttendancesByDate: builder.query<IAttendancesResponse, string>({
            query: (date) => ({
                url: `/attendance/get-attendances-by-date/${date}`,
                method: 'GET',
            }),
            providesTags: ['ATTENDANCE'],
        }),

        getSingleAttendance: builder.query<IAttendanceResponse, string>({
            query: (id) => ({
                url: `/attendance/get-single-attendance/${id}`,
                method: 'GET',
            }),
            providesTags: ['ATTENDANCE'],
        }),

        updateAttendance: builder.mutation<
            IAttendanceResponse,
            { id: string; data: IUpdateAttendance }
        >({
            query: ({ id, data }) => ({
                url: `/attendance/update-attendance/${id}`,
                method: 'PATCH',
                data,
            }),
            invalidatesTags: ['ATTENDANCE', 'WEEKLY_SUMMARY'],
        }),

        deleteAttendance: builder.mutation<IAttendanceResponse, string>({
            query: (id) => ({
                url: `/attendance/delete-attendance/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['ATTENDANCE', 'WEEKLY_SUMMARY'],
        }),
    }),
});

export const {
    useCreateAttendanceMutation,
    useBulkUpsertAttendanceMutation,
    useGetAttendancesQuery,
    useGetAttendancesByDateQuery,
    useLazyGetAttendancesByDateQuery,
    useGetSingleAttendanceQuery,
    useUpdateAttendanceMutation,
    useDeleteAttendanceMutation,
} = attendanceApi;
