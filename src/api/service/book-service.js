import request from "../request.js";

export default class Book {
    getBookList(data) {
        return request({
            url: "/Book/List",
            method: "POST",
            data: data,
        });
    }
    getBook(id) {
        return request({
            url: `/Book/${id}`,
            method: "GET",
        });
    }

    deleteBook(id) {
        return request({
            url: `/Book/${id}`,
            method: "DELETE",
        });
    }
}
