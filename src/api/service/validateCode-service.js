import request from "../request.js";

export default class ValidateCode {
    getValidateCode() {
        return request({
            url: "/ValidateCode/GetValidateCode",
            method: "GET",
        });
    }
}
