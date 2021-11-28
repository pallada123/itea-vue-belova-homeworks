import axios from './axios'

const api = {

    getPostsList() {
        return axios.get('/posts');
    },

    getUser(userId) {
        return axios.get('/users/' + userId);
    },

    getUserPosts(userId) {
        return axios.get('/posts?userId=' + userId);
    },

    getSinglePost(postId) {
        return axios.get('/posts/' + postId);
    }
}

export default api