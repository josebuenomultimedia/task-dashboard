import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://task-dashboard-production.up.railway.app/api',
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);

export default instance;
