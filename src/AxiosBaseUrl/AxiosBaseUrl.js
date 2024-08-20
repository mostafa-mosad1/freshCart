import axios from "axios";

export const axiosBaseUrl = axios.create({
  baseURL: "https://ecommerce.routemisr.com/api/v1",
});
