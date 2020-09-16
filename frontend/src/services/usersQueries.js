import http from "../http-common";

class usersQueries {
    login() {
        return http.get('/auth/login');
    }
    create(data) {
        return http.post("/auth/signup", data);
    }
    update(id, data) {
        return http.put(`/auth/${id}`, data);
    }
}

export default new usersQueries();