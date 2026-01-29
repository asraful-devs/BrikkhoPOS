import type {
    ICreateSalaryAdjustment,
    ISalaryAdjustmentResponse,
    ISalaryAdjustmentsResponse,
    IUpdateSalaryAdjustment,
} from '@/types/salaryAdjustment.types';
import { baseApi } from '../../baseApi';

export const salaryAdjustmentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createSalaryAdjustment: builder.mutation<
            ISalaryAdjustmentResponse,
            ICreateSalaryAdjustment
        >({
            query: (adjustmentData) => ({
                url: '/salary-adjustment/create-salary-adjustment',
                method: 'POST',
                data: adjustmentData,
            }),
            invalidatesTags: ['SALARY_ADJUSTMENT', 'WEEKLY_SUMMARY'],
        }),

        getSalaryAdjustments: builder.query<ISalaryAdjustmentsResponse, void>({
            query: () => ({
                url: '/salary-adjustment/get-salary-adjustments',
                method: 'GET',
            }),
            providesTags: ['SALARY_ADJUSTMENT'],
        }),

        getSingleSalaryAdjustment: builder.query<
            ISalaryAdjustmentResponse,
            string
        >({
            query: (id) => ({
                url: `/salary-adjustment/get-single-salary-adjustment/${id}`,
                method: 'GET',
            }),
            providesTags: ['SALARY_ADJUSTMENT'],
        }),

        updateSalaryAdjustment: builder.mutation<
            ISalaryAdjustmentResponse,
            { id: string; data: IUpdateSalaryAdjustment }
        >({
            query: ({ id, data }) => ({
                url: `/salary-adjustment/update-salary-adjustment/${id}`,
                method: 'PATCH',
                data,
            }),
            invalidatesTags: ['SALARY_ADJUSTMENT', 'WEEKLY_SUMMARY'],
        }),

        deleteSalaryAdjustment: builder.mutation<
            ISalaryAdjustmentResponse,
            string
        >({
            query: (id) => ({
                url: `/salary-adjustment/delete-salary-adjustment/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['SALARY_ADJUSTMENT', 'WEEKLY_SUMMARY'],
        }),
    }),
});

export const {
    useCreateSalaryAdjustmentMutation,
    useGetSalaryAdjustmentsQuery,
    useGetSingleSalaryAdjustmentQuery,
    useUpdateSalaryAdjustmentMutation,
    useDeleteSalaryAdjustmentMutation,
} = salaryAdjustmentApi;
