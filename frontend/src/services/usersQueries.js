import http from "../http-common";

class usersQueries {
    login(data) {
        return http.post('/auth/login', data);
    }
    create(data) {
        return http.post("/auth/signup", data);
    }
    update(id, data) {
        return http.put(`/auth/${id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
          });
    }
    getOneUser(id) {
        return http.get(`/auth/profile/${id}`);
    }
    delete(id) {
        return http.delete(`/auth/${id}`);
    }
}

export default new usersQueries();