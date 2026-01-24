import type {
    ICreateWeeklySummary,
    IUpdateWeeklySummary,
    IWeeklyReportRequest,
    IWeeklySummariesResponse,
    IWeeklySummaryResponse,
} from '@/types/weeklySummary.types';
import { baseApi } from '../../baseApi';

export const weeklySummaryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createWeeklySummary: builder.mutation<
            IWeeklySummaryResponse,
            ICreateWeeklySummary
        >({
            query: (summaryData) => ({
                url: '/weekly-summary/create-weekly-summary',
                method: 'POST',
                data: summaryData,
            }),
            invalidatesTags: ['WEEKLY_SUMMARY'],
        }),

        getWeeklySummaries: builder.query<IWeeklySummariesResponse, void>({
            query: () => ({
                url: '/weekly-summary/get-weekly-summaries',
                method: 'GET',
            }),
            providesTags: ['WEEKLY_SUMMARY'],
        }),

        getSingleWeeklySummary: builder.query<IWeeklySummaryResponse, string>({
            query: (id) => ({
                url: `/weekly-summary/get-single-weekly-summary/${id}`,
                method: 'GET',
            }),
            providesTags: ['WEEKLY_SUMMARY'],
        }),

        updateWeeklySummary: builder.mutation<
            IWeeklySummaryResponse,
            { id: string; data: IUpdateWeeklySummary }
        >({
            query: ({ id, data }) => ({
                url: `/weekly-summary/update-weekly-summary/${id}`,
                method: 'PATCH',
                data,
            }),
            invalidatesTags: ['WEEKLY_SUMMARY'],
        }),

        deleteWeeklySummary: builder.mutation<IWeeklySummaryResponse, string>({
            query: (id) => ({
                url: `/weekly-summary/delete-weekly-summary/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['WEEKLY_SUMMARY'],
        }),

        generateWeeklyReport: builder.mutation<
            IWeeklySummaryResponse,
            IWeeklyReportRequest
        >({
            query: (reportData) => ({
                url: '/weekly-summary/weekly-report',
                method: 'POST',
                data: reportData,
            }),
            invalidatesTags: ['WEEKLY_SUMMARY'],
        }),
    }),
});

export const {
    useCreateWeeklySummaryMutation,
    useGetWeeklySummariesQuery,
    useGetSingleWeeklySummaryQuery,
    useUpdateWeeklySummaryMutation,
    useDeleteWeeklySummaryMutation,
    useGenerateWeeklyReportMutation,
} = weeklySummaryApi;
