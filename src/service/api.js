import axios from 'axios';
import { API_ENDPOINTS } from '../config/config';

const api = axios.create({
  baseURL: process.env.REACT_APP_BOOK_API_URL,
  timeout: 10000,
});

// 请求拦截器
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    // 先判断业务状态码
    const res = response.data;
    if (res.code === -1) { // 或其他表示未授权的业务码
      // 处理未登录状态
      localStorage.removeItem('token');
      // 可以添加其他处理，比如重定向到登录页
      return Promise.reject(new Error(res.message || 'Please Sign In'));
    }
    // 返回数据
    return response.data;
  },
  (error) => {
    // 处理网络错误、服务器错误等
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Book相关API
export const bookApi = {
  getBooks: (params) => api.get(API_ENDPOINTS.BOOKS, { params }),
  getBook: (id) => api.get(`${API_ENDPOINTS.BOOK}/${id}`),
  getChapters: (id) => api.get(`${API_ENDPOINTS.BOOK}/chapters/${id}`),
  getChapter: (id) => api.get(`${API_ENDPOINTS.BOOK}/chapter/${id}`),
  createBook: (data) => api.post(API_ENDPOINTS.BOOK, data),
  updateBook: (id, data) => api.put(`${API_ENDPOINTS.BOOK}/${id}`, data),
  deleteBook: (id) => api.delete(`${API_ENDPOINTS.BOOK}/${id}`),
  
  // 添加一些业务方法
  getFeaturedBooks: (page = 1, pageSize = 20) => {
    return api.get(API_ENDPOINTS.BOOKS, {
      params: {
        page,
        page_size: pageSize,
        is_recommended: 1
      }
    });
  },
  getSearchBooks: (word,page = 1, pageSize = 20) => {
    return api.get(API_ENDPOINTS.BOOKS, {
      params: {
        page,
        page_size: pageSize,
        search: word
      }
    });
  },
  getPopularBooks: (page = 1, pageSize = 20) => {
    return api.get(API_ENDPOINTS.BOOKS, {
      params: {
        page,
        page_size: pageSize,
        order_by: "view,1"
      }
    });
  },

};

// Auth相关API
export const authApi = {
  login: (credentials) => api.post(API_ENDPOINTS.AUTH.LOGIN, credentials),
  register: (userData) => api.post(API_ENDPOINTS.AUTH.REGISTER, userData),
  logout: () => api.post(API_ENDPOINTS.AUTH.LOGOUT),
};