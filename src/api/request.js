import axios from "axios";
import { store } from "../store";
import router from "../router";

const axiosApiInstance = axios.create({
    baseURL: "/api",
});

axiosApiInstance.interceptors.response.use(
    (config) => config,
    (error) => {
        if (error.response.status === 401) {
            //重新取得accesstoken
            return axios({
                method: "POST",
                url: "/api/Account/GetNewToken",
                headers: {
                    Authorization: `Bearer ${store.getters["accountModules/getJwtToken"]}`,
                },
                data: {
                    accessToken: store.getters["accountModules/getJwtToken"],
                    refreshToken: store.getters["accountModules/getRefreshToken"],
                },
            })
                .then((response) => {
                    if (response.status === 200) {
                        store.dispatch("accountModules/updateJwtToken", response.data.accessToken);
                        return retryOriginalRequest(error.config);
                    }
                })
                .catch((error) => {
                    if (error.response.status === 401) {
                        alert("未授權，回登入頁面");
                        localStorage.clear();
                        router.push({ name: "Login" });
                    }
                    return Promise.reject(error);
                })
                .finally(() => {});
        } else {
            return Promise.reject(error);
        }
    }
);

axiosApiInstance.interceptors.request.use(
    (config) => {
        const jwtToken = store.getters["accountModules/getJwtToken"];
        if (jwtToken) {
            config.headers.Authorization = `Bearer ${jwtToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

//重新發出原始請求
function retryOriginalRequest(config) {
    return new Promise((resolve, reject) => {
        axiosApiInstance({
            ...config,
        })
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export default axiosApiInstance;
