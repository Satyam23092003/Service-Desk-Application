import axios from 'axios';


const API_URL = import.meta.env.VITE_BASE_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Include credentials for CORS requests
});

// Attach token
export function setAuthToken(token) {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
}

export default axiosInstance;


// import axios from 'axios';
// // import { store } from './store'; // If using Redux
// // import { logout } from './auth'; // Your logout action

// const API_URL = 'http://localhost:5000/api';

// const axiosInstance = axios.create({
//   baseURL: API_URL,
// });

// // Initialize with token from storage if available
// const token = localStorage.getItem('token');
// if (token) {
//   axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
// }

// // Add request interceptor
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // Refresh token from storage before each request
//     const freshToken = localStorage.getItem('token');
//     if (freshToken) {
//       config.headers.Authorization = `Bearer ${freshToken}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Add response interceptor
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       // Handle unauthorized (token expired/invalid)
//       localStorage.removeItem('token');
//       delete axiosInstance.defaults.headers.common['Authorization'];
      
//       // Redirect to login (using your app's routing system)
//       window.location.href = '/login';
      
//       // If using Redux:
//       // store.dispatch(logout());
//     }
//     return Promise.reject(error);
//   }
// );

// export function setAuthToken(token) {
//   if (token) {
//     localStorage.setItem('token', token); // Persist to storage
//     axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//   } else {
//     localStorage.removeItem('token');
//     delete axiosInstance.defaults.headers.common['Authorization'];
//   }
// }

// export default axiosInstance;