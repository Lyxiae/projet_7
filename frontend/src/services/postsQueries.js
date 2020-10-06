import http from "../http-common";

class postsQueries {
    getAll() {
        return http.get('/posts');
    }
    getLastPosts() {
        return http.get('/posts/mod');
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
                'Content-Type': 'multipart/form-data',
            }
          });
    }
    createComment(id, data) {
        return http.post(`/posts/${id}`, data);
    }
    deleteComment(postId, id, roleId) {
        return http.delete(`/posts/${postId}/comments/${id}?role=${roleId}`);
    }
    createReaction(id, data) {
        return http.post(`/posts/${id}/like`, data);
    }
    update(id, roleId, data, ) {
        return http.put(`/posts/${id}?role=${roleId}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
          });
    }
    delete(id, roleId, postUserId) {
        return http.delete(`/posts/${id}?role=${roleId}&postUserId=${postUserId}`);
    }

}

export default new postsQueries();