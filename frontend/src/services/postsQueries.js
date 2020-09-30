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
    getReactions(id) {
        return http.get(`/posts/${id}/like`);
    }
    create(data) {
        return http.post("/posts", data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
          });
    }
    createComment(id, data) {
        return http.post(`/posts/${id}`, data);
    }
    deleteComment(postId, id) {
        return http.delete(`/posts/${postId}/comments/${id}`);
    }
    createReaction(id, data) {
        return http.post(`/posts/${id}/like`, data);
    }
    update(id, data) {
        return http.put(`/posts/${id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
          });
    }
    delete(id) {
        return http.delete(`/posts/${id}`);
    }

}

export default new postsQueries();