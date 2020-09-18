import http from "../http-common";

class postsQueries {
    getAll() {
        return http.get('/posts');
    }
    findByAuthor(userId) {
        return http.get(`/posts/user/${userId}`);
    }
    getOne(id) {
        return http.get(`/posts/${id}`);
    }
    getComments(id) {
        return http.get(`/posts/${id}/comments`);
    }
    create(data) {
        return http.post("posts", data);
    }
    createComment(id, data) {
        return http.post(`/posts/${id}`, data);
    }
    createReaction(id, data) {
        return http.post(`/posts/${id}/like`, data);
    }
    update(id, data) {
        return http.put(`/posts/${id}`, data);
    }
    delete(id) {
        return http.delete(`/posts/${id}`);
    }

}

export default new postsQueries();