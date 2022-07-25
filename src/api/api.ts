import axios from 'axios';

export const axiosApi = axios.create({
  baseURL: 'https://api.npoint.io',
  timeout: 5000,
});
