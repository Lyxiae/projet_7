import http from "../http-common";
let token = sessionStorage.getItem('token');

class postsQueries {
    getAll() {
        return http.get('/posts',{
            headers: {
            'Authorization': 'Bearer ' + token
        }
        });
    }
    getLastPosts() {
        return http.get('/posts/mod',{
            headers: {
            'Authorization': 'Bearer ' + token
        }
        });
    }
    findByAuthor(userId) {
        return http.get(`/posts/user/${userId}`,{
            headers: {
            'Authorization': 'Bearer ' + token
        }
        });
    }
    getOne(id) {
        return http.get(`/posts/${id}`,{
            headers: {
            'Authorization': 'Bearer ' + token
        }
        });
    }
    getComments(id) {
        return http.get(`/posts/${id}/comments`,{
            headers: {
            'Authorization': 'Bearer ' + token
        }
        });
    }
    getReactions(id) {
        return http.get(`/posts/${id}/like`,{
            headers: {
            'Authorization': 'Bearer ' + token
        }
        });
    }
    create(data) {
        return http.post("/posts", data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + token
            }
          });
    }
    createComment(id, data) {
        return http.post(`/posts/${id}`, data,{
            headers: {
            'Authorization': 'Bearer ' + token
        }
        });
    }
    deleteComment(postId, id) {
        return http.delete(`/posts/${postId}/comments/${id}`,{
            headers: {
            'Authorization': 'Bearer ' + token
        }
        });
    }
    createReaction(id, data) {
        return http.post(`/posts/${id}/like`, data,{
            headers: {
            'Authorization': 'Bearer ' + token
        }
        });
    }
    update(id, roleId, data, ) {
        return http.put(`/posts/${id}?role=${roleId}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + token
            }
          });
    }
    delete(id, postUserId) {
        return http.delete(`/posts/${id}`,{
            headers: {
            'Authorization': 'Bearer ' + token
        },
         params: {
            postUserId: postUserId
        }
        });
    }

}

export default new postsQueries();