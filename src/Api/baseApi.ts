import axios from "axios";

export const BASE_API_URL = "https://api.mockaroo.com/api";

const instanceAPI = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instanceAPI;
