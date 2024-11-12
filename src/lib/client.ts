import axios from 'axios';
import dotenv from 'dotenv';
//dotenv.config();
const baseURL = process.env.REACT_APP_BASE_URL;
export const apiClient = axios.create({
    baseURL,
  });