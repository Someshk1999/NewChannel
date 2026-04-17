import axios from 'axios';
import type { NewsResponse, NewsItem } from '../types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001',
});

export const getNews = (search = '', page = 1, limit = 8) => {
  return api.get<NewsResponse>('/news', {
    params: { search, page, limit },
  });
};

export const getNewsById = (id: string) => api.get<NewsItem>(`/news/${id}`);

export const createNews = (newsData: Omit<NewsItem, '_id' | 'createdAt'>) => {
  const token = localStorage.getItem('adminToken');
  return api.post<NewsItem>('/news', newsData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateNews = (id: string, newsData: Partial<Omit<NewsItem, '_id' | 'createdAt'>>) => {
  const token = localStorage.getItem('adminToken');
  console.log('Sending update request with token:', token ? token.substring(0, 20) + '...' : 'No token');
  return api.put<NewsItem>(`/news/${id}`, newsData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteNews = (id: string) => {
  const token = localStorage.getItem('adminToken');
  console.log('Sending delete request with token:', token ? token.substring(0, 20) + '...' : 'No token');
  return api.delete<{ message: string }>(`/news/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const loginAdmin = (username: string, password: string) => {
  return api.post<{ token: string }>('/auth/login', { username, password });
};
