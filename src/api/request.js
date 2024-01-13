import axios from "axios";
import { store } from "../store";

const axiosApiInstance = axios.create({
    baseURL: "/api",
});

axiosApiInstance.interceptors.response.use(
    (config) => config,
    (error) => {
        console.log(error);
        if (error.response.status === 401) {
            alert("未授權，回登入頁面");

            //localStorage.clear();
            //window.location = `${process.env.WEBSITE}`;
        }
        return Promise.reject(error);
    }
);

axiosApiInstance.interceptors.request.use(
    (config) => {
        const jwtToken = store.getters.getJwtToken;
        if (jwtToken) {
            config.headers.Authorization = `Bearer ${jwtToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosApiInstance;
