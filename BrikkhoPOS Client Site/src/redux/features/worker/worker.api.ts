import type {
    ICreateWorker,
    IUpdateWorker,
    IWorkerFilters,
    IWorkerResponse,
    IWorkersResponse,
} from '@/types/worker.types';
import { baseApi } from '../../baseApi';

export const workerApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createWorker: builder.mutation<IWorkerResponse, ICreateWorker>({
            query: (workerData) => ({
                url: '/worker/create-worker',
                method: 'POST',
                data: workerData,
            }),
            invalidatesTags: ['WORKER'],
        }),

        getWorkers: builder.query<IWorkersResponse, IWorkerFilters | void>({
            query: (filters) => ({
                url: '/worker/get-workers',
                method: 'GET',
                params: filters || {},
            }),
            providesTags: ['WORKER'],
        }),

        getSingleWorker: builder.query<IWorkerResponse, string>({
            query: (id) => ({
                url: `/worker/get-single-worker/${id}`,
                method: 'GET',
            }),
            providesTags: ['WORKER'],
        }),

        updateWorker: builder.mutation<
            IWorkerResponse,
            { id: string; data: IUpdateWorker }
        >({
            query: ({ id, data }) => ({
                url: `/worker/update-worker/${id}`,
                method: 'PATCH',
                data,
            }),
            invalidatesTags: ['WORKER'],
        }),

        softDeleteWorker: builder.mutation<IWorkerResponse, string>({
            query: (id) => ({
                url: `/worker/soft-delete-worker/${id}`,
                method: 'PATCH',
            }),
            invalidatesTags: ['WORKER'],
        }),

        deleteWorker: builder.mutation<IWorkerResponse, string>({
            query: (id) => ({
                url: `/worker/delete-worker/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['WORKER'],
        }),
    }),
});

export const {
    useCreateWorkerMutation,
    useGetWorkersQuery,
    useGetSingleWorkerQuery,
    useUpdateWorkerMutation,
    useSoftDeleteWorkerMutation,
    useDeleteWorkerMutation,
} = workerApi;
