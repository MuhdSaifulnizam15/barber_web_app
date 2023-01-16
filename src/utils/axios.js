import axios from 'axios';

// ----------------------------------------------------------------------

// Set config defaults when creating the instance
const axiosInstance = axios.create({
  baseURL: 'https://api.rolexbarbershop.com/api/v1',
  
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;
