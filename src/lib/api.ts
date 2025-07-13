/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, type AxiosRequestConfig, type AxiosResponse } from "axios";

/**
 * Axios instance pre-configured for the application's API.
 *
 * @remarks
 * This instance is set up with a base URL pointing to the production
 * e-commerce API and includes default headers for JSON content.
 *
 * @example
 * ```typescript
 * api.get('/products').then(response => { ... });
 * ```
 */
export const api = axios.create({
  // ! Add production API URL here
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

//? Request interceptor (for adding auth tokens)
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage or sessionStorage
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

type TStatus = "success" | "failed";

/**
 * Formats and handles API responses in a standardized way.
 *
 * - If the response is an `AxiosError`, throws an object with status "failed", the HTTP status code, and error data.
 * - If the response is a generic `Error`, throws an object with status "failed", code 500, and the error message.
 * - Otherwise, assumes the response is an `AxiosResponse` and returns its `data` property with status "success".
 *
 * @template R The expected type of the response data.
 * @param res - The response object, which can be an AxiosError, Error, or AxiosResponse.
 * @returns The data from the Axios response if successful.
 * @throws An object containing status, code, and data if an error is encountered.
 */
export function globalResponseFormat<R = any>(res: unknown) {
  let resStatus: TStatus;

  if (res instanceof AxiosError) {
    resStatus = "failed";
    throw {
      status: resStatus,
      code: res.response?.status,
      data: res.response?.data,
    };
  }

  if (res instanceof Error) {
    resStatus = "failed";
    throw {
      status: resStatus,
      code: 500,
      data: res.message,
    };
  }

  const { data } = res as AxiosResponse<R>;
  resStatus = "success";
  return data;
}

/**
 * Sends a GET request to the specified API endpoint using Axios and returns a formatted response.
 *
 * @template R - The expected response data type.
 * @param path - The API endpoint path.
 * @param params - Optional query parameters for the request, picked from AxiosRequestConfig.
 * @param options - Optional Axios request configuration, excluding 'params'.
 * @returns A promise that resolves to the formatted response of type R.
 */
export async function getRequest<R = any>(
  path: string,
  params: Pick<AxiosRequestConfig, "params"> = {},
  options: Omit<AxiosRequestConfig, "params"> = {}
) {
  try {
    const response = await api.get(path, { params, ...options });
    return globalResponseFormat<R>(response);
  } catch (error) {
    return globalResponseFormat(error);
  }
}

/**
 * Sends a POST request to the specified path using the provided data and options.
 *
 * @template T - The type of the request data.
 * @template R - The expected type of the response data.
 * @param path - The endpoint path to which the POST request will be sent.
 * @param data - The request payload, conforming to the shape of AxiosRequestConfig's `data` property.
 * @param options - Additional Axios request configuration options, excluding the `data` property.
 * @returns A promise that resolves to a globally formatted response of type `R`, or an error formatted response.
 */
export async function postRequest<T = any, R = any>(
  path: string,
  data: T,
  options: Omit<AxiosRequestConfig<T>, "data"> = {}
) {
  try {
    const response = await api.post(path, data, options);
    return globalResponseFormat<R>(response);
  } catch (error) {
    return globalResponseFormat(error);
  }
}

/**
 * Sends a PUT request to the specified path using the provided data and options.
 *
 * @template T - The type of the request data.
 * @template R - The type of the response data.
 * @param path - The endpoint path to send the PUT request to.
 * @param data - The request payload, conforming to the `data` property of `AxiosRequestConfig`.
 * @param options - Additional Axios request configuration options, excluding `data`.
 * @returns A promise that resolves to a globally formatted response of type `R`.
 */
export async function putRequest<T = any, R = any>(
  path: string,
  data: T,
  options: Omit<AxiosRequestConfig<T>, "data"> = {}
) {
  try {
    const response = await api.put(path, data, options);
    return globalResponseFormat<R>(response);
  } catch (error) {
    return globalResponseFormat(error);
  }
}

/**
 * Sends a DELETE request to the specified API endpoint using the provided options.
 *
 * @template R - The expected response data type.
 * @param path - The API endpoint path to send the DELETE request to.
 * @param options - Optional Axios request configuration, excluding the "data" property.
 * @returns A promise that resolves to the formatted response of type `R`.
 *
 * @example
 * ```typescript
 * const result = await deleteRequest<User>('/users/123');
 * ```
 */
export async function deleteRequest<R = any>(path: string, options: Omit<AxiosRequestConfig, "data"> = {}) {
  try {
    const response = await api.delete(path, options);
    return globalResponseFormat<R>(response);
  } catch (error) {
    return globalResponseFormat(error);
  }
}

/**
 * Sends a PATCH request to the specified path using the provided data and options.
 *
 * @template T - The type of the request data.
 * @template R - The expected type of the response data.
 * @param path - The endpoint path to send the PATCH request to.
 * @param data - The data to be sent in the PATCH request body.
 * @param options - Additional Axios request configuration options, excluding the `data` property.
 * @returns A promise that resolves to the formatted response of type `R`, or an error response if the request fails.
 */
export async function patchRequest<T = any, R = any>(
  path: string,
  data: T,
  options: Omit<AxiosRequestConfig<T>, "data"> = {}
) {
  try {
    const response = await api.patch(path, data, options);
    return globalResponseFormat<R>(response);
  } catch (error) {
    return globalResponseFormat(error);
  }
}
