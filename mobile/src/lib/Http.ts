import axios, { AxiosInstance } from "axios";

const baseUrl = "http://192.168.1.121:3333";
const http: AxiosInstance = axios.create({
  baseURL: baseUrl,
});

export default http;
