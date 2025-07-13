/* eslint-disable @typescript-eslint/no-explicit-any */
import { type UseMutationOptions, type UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query";
import type { AxiosRequestConfig } from "axios";
import { useSearchParams } from "react-router";

import { deleteRequest, getRequest, patchRequest, postRequest, putRequest } from "@/lib/api";
import type { APIError } from "@/types/api.type";

/**
 * Custom React hook to fetch data from a specified API endpoint using React Query.
 *
 * @template R - The expected response data type.
 * @param endpoint - The API endpoint to fetch data from.
 * @param options - Optional configuration for the React Query `useQuery` hook, excluding `queryKey` and `queryFn`.
 * @returns The result of the `useQuery` hook, including status, data, and error information.
 *
 * @example
 * const { data, isLoading, error, isError } = useGetData<User[]>('/users');
 */
export function useGetData<R = any>(
  endpoint: string,
  options?: Omit<UseQueryOptions<R, APIError, R, [string]>, "queryKey" | "queryFn">
) {
  return useQuery<R, APIError, R, [string]>({
    queryKey: [endpoint],
    queryFn: () => getRequest<R>(endpoint),
    ...options,
  });
}

/**
 * Custom React hook to fetch data from an API endpoint with URL search parameters.
 *
 * @template R - The expected response type.
 * @param endpoint - The API endpoint to fetch data from.
 * @param options - Optional configuration for the query, excluding `queryKey` and `queryFn`.
 * @returns The result of the query, including status, data, and error information.
 *
 * @remarks
 * - Uses `useSearchParams` to obtain current URL search parameters.
 * - Utilizes `useQuery` from React Query to manage the API request and caching.
 * - The query key is composed of the endpoint and the current search parameters.
 */
export function useGetDataWithParams<R = any>(
  endpoint: string,
  options?: Omit<UseQueryOptions<R, APIError, R, [string, Record<string, string>]>, "queryKey" | "queryFn">
) {
  const [params] = useSearchParams();
  const paramsObject = Object.fromEntries(params.entries());
  return useQuery<R, APIError, R, [string, Record<string, string>]>({
    queryKey: [endpoint, paramsObject],
    queryFn: () => getRequest<R>(endpoint, paramsObject),
    ...options,
  });
}

/**
 * Custom hook for performing POST requests using React Query's `useMutation`.
 *
 * @template T - The type of the data to be sent in the POST request.
 * @template R - The type of the response data expected from the POST request.
 * @param endpoint - The API endpoint to which the POST request will be sent.
 * @param options - Optional mutation options, excluding `mutationKey` and `mutationFn`.
 * @returns A mutation object from React Query's `useMutation`, configured for the specified endpoint and data types.
 *
 * @example
 * const {mutate, isLoading, isError} = usePostData<User, ApiResponse>('/users', {
 *   onSuccess: (data) => { ... },
 *   onError: (error) => { ... }
 * });
 * mutate({ name: 'John Doe' });
 */
export function usePostData<T = any, R = any>(
  endpoint: string,
  options?: Omit<UseMutationOptions<R, APIError, T, [string, T]>, "mutationKey" | "mutationFn">,
  requestOptions?: Omit<AxiosRequestConfig<T>, "data">
) {
  return useMutation<R, APIError, T, [string, T]>({
    mutationKey: [endpoint],
    mutationFn: (data: T) => postRequest<T, R>(endpoint, data, requestOptions),
    ...options,
  });
}

/**
 * Custom React hook for performing PATCH requests using React Query's `useMutation`.
 *
 * @template T - The type of the data to be sent in the PATCH request.
 * @template R - The type of the response data expected from the PATCH request.
 * @param endpoint - The API endpoint to send the PATCH request to.
 * @param options - Optional mutation options, excluding `mutationKey` and `mutationFn`.
 * @returns A mutation object from React Query's `useMutation` for managing PATCH requests.
 *
 * @example
 * const mutation = usePatchData<UserUpdate, UserResponse>('/users/1');
 * mutation.mutate({ name: 'New Name' });
 */
export function usePatchData<T = any, R = any>(
  endpoint: string,
  options?: Omit<UseMutationOptions<R, APIError, T, [string, T]>, "mutationKey" | "mutationFn">,
  requestOptions?: Omit<AxiosRequestConfig<FormData>, "data">
) {
  return useMutation<R, APIError, T, [string, T]>({
    mutationKey: [endpoint],
    mutationFn: (data: T) => patchRequest<T, R>(endpoint, data, requestOptions),
    ...options,
  });
}

/**
 * Custom React hook for performing PUT requests using React Query's `useMutation`.
 *
 * @template T - The type of the data to be sent in the PUT request.
 * @template R - The type of the response data expected from the PUT request.
 * @param endpoint - The API endpoint to send the PUT request to.
 * @param options - Optional mutation options, excluding `mutationKey` and `mutationFn`.
 * @returns A mutation object from React Query's `useMutation`, configured for PUT requests.
 *
 * @example
 * const mutation = usePutData<UserUpdate, UserResponse>('/users/1');
 * mutation.mutate({ name: 'John' });
 */
export function usePutData<T = any, R = any>(
  endpoint: string,
  options?: Omit<UseMutationOptions<R, APIError, T, [string, T]>, "mutationKey" | "mutationFn">,
  requestOptions?: Omit<AxiosRequestConfig<FormData>, "data">
) {
  return useMutation<R, APIError, T, [string, T]>({
    mutationKey: [endpoint],
    mutationFn: (data: T) => putRequest<T, R>(endpoint, data, requestOptions),
    ...options,
  });
}

/**
 * Custom React hook for performing DELETE API requests using React Query's `useMutation`.
 *
 * @template R - The expected response type from the DELETE request.
 * @param options - Optional mutation options, excluding `mutationKey` and `mutationFn` which are set internally.
 * @returns The mutation object returned by `useMutation`, which includes methods and state for executing and tracking the mutation.
 *
 * @example
 * const deleteMutation = useDeleteData();
 * deleteMutation.mutate('/api/resource/1');
 */
export function useDeleteData<R = any>(
  endpoint: string,
  options?: Omit<UseMutationOptions<R, APIError, string, [string]>, "mutationKey" | "mutationFn">
) {
  return useMutation<R, APIError, string, [string]>({
    mutationKey: [endpoint], // or pass a key function if needed
    mutationFn: (id: string) => deleteRequest<R>(`${endpoint}/${id}`),
    ...options,
  });
}
