import { type BaseQueryFn } from '@reduxjs/toolkit/query';
import { AxiosError, type AxiosRequestConfig } from 'axios';
import { axiosInstance } from '../lib/axios';

const axiosBaseQuery =
    (): BaseQueryFn<
        {
            url: string;
            method?: AxiosRequestConfig['method'];
            data?: AxiosRequestConfig['data'];
            params?: AxiosRequestConfig['params'];
            headers?: AxiosRequestConfig['headers'];
        },
        unknown,
        unknown
    > =>
    async ({ url, method, data, params, headers }) => {
        try {
            // 👉 Get token from localStorage (or cookie)
            const token = localStorage.getItem('accessToken');

            const result = await axiosInstance({
                url,
                method,
                data,
                params,
                headers: {
                    ...(headers || {}),
                    ...(token ? { Authorization: `${token}` } : {}), // attach token if available
                },
                withCredentials: true, // send cookies if backend uses them
            });

            return { data: result.data };
        } catch (axiosError) {
            const err = axiosError as AxiosError;
            return {
                error: {
                    status: err.response?.status,
                    data: err.response?.data || err.message,
                },
            };
        }
    };

export default axiosBaseQuery;
