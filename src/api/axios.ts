import axios, { AxiosError } from 'axios';
import type { AxiosResponse } from 'axios';
import { API_BASE_URL } from '../environments/config';
import type { ApiError } from '../models/types';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError<ApiError>) => {
    const apiError: ApiError = {
      message: 'Erro inesperado',
      statusCode: 500,
    };

    if (error.response) {
      // Erro com resposta do servidor
      apiError.statusCode = error.response.status;
      apiError.message = error.response.data?.message || error.message;
      apiError.errors = error.response.data?.errors;
    } else if (error.request) {
      // Erro de rede
      apiError.message = 'Erro de conexão. Verifique sua internet.';
      apiError.statusCode = 0;
    } else {
      // Erro de configuração
      apiError.message = error.message;
    }

    console.error('API Error:', apiError);

    return Promise.reject(apiError);
  }
);

export default api; 