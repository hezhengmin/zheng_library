import request from "../request.js";

export default class Account {
    login(data) {
        return request({
            url: "/Account/Login",
            method: "POST",
            data,
        });
    }
}
