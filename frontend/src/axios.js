import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://to-dosmernleul.herokuapp.com/api",
});
