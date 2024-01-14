import axios from "axios";
import { store } from "../store";
import router from "../router";

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
            //router.push({ name: "Login" });
            //window.location = `${process.env.WEBSITE}`;

            axios
                .post("/api/Account/GetNewToken", {
                    accessToken: store.getters.getJwtToken,
                    refreshToken: store.getters.getRefreshToken,
                })
                .then((response) => {
                    console.log("response", response);
                    if (response.status === 200) {
                        store.dispatch("updateJwtToken", response.data.accessToken);
                    }
                })
                .finally(() => {});
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
