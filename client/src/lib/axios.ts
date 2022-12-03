import Axios, { AxiosRequestConfig } from 'axios';

import { API_URL } from '@/config';
import storage from '@/utils/storage';

function authRequestInterceptor(config: AxiosRequestConfig) {
  if (typeof window !== 'undefined') {
    const token = storage.getToken();

    if (config.headers !== undefined) {
      if (token !== null) {
        config.headers['csrf-token'] = token;
      }
      config.headers.Accept = 'application/json';
    }
  }

  return config;
}

export const axios = Axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

axios.interceptors.request.use(authRequestInterceptor);
// axios.interceptors.response.use(
//   (response) => {
//     console.log({ response });

//     return response.data;
//   },
//   (error) => {
//     const message = error.response?.data?.message || error.message;
//     console.log({ message });
//     return Promise.reject(error);
//   }
// );
