// import Axios, { AxiosRequestConfig } from 'axios';
import Axios from 'axios';
import type { AxiosResponse } from 'axios';

import { API_URL } from '@/config';

export const axios = Axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
  },
});

// axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response) => {
    // FIXME:
    return response.data as AxiosResponse;
  },
  async (error) => {
    return await Promise.reject(error);
  }
);
