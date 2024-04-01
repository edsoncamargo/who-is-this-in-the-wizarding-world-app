import axios, { AxiosInstance } from 'axios';

const baseUrl = "http://10.0.2.2:3333";
const http: AxiosInstance = axios.create({
    baseURL: baseUrl
});

export default http;