import http from "../http-common";

class usersQueries {
    login(data) {
        return http.post('/auth/login', data);
    }
    create(data) {
        return http.post("/auth/signup", data);
    }
    update(id, data) {
        return http.put(`/auth/${id}`, data);
    }
}

export default new usersQueries();