import request from "../request.js";

export default class Book {
    getList(data) {
        return request({
            url: "/Book/List",
            method: "POST",
            data: data,
        });
    }
}
