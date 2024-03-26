import axios from 'axios';
import { API_URL } from '@/lib/constants';
import { parseCookies } from 'nookies';
import { GetServerSidePropsContext } from 'next';

const api = axios.create({
  baseURL: API_URL,
});

let context: GetServerSidePropsContext | null = null;
export const setContext = (_context: GetServerSidePropsContext) => {
  context = _context;
};

const isServer = () => {
  return typeof window === 'undefined';
};

api.interceptors.request.use(
  (config) => {
    const cookies = parseCookies();
    const token = isServer() ? context?.req?.cookies?.token : cookies['token'];
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  },
);

export default api;
