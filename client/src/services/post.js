import axiosClient from './axiosClient';

const post = {
    async getPostsApi() {
        const url = '/api/post/all';
        try {
            const response = await axiosClient.get(url);
            return response;
        } catch (error) {
            return error?.response;
        }
    },
    async getPostsLimitApi(query) {
        console.log('first1', query);
        const url = `/api/post`;
        try {
            const response = await axiosClient.get(url, { params: query });
            return response;
        } catch (error) {
            return error?.response;
        }
    },
    async getNewPostsApi() {
        const url = `/api/post/new-post`;
        try {
            const response = await axiosClient.get(url);
            return response;
        } catch (error) {
            return error?.response;
        }
    },

    get(id) {
        const url = `/categories/${id}`;
        return axiosClient.get(url);
    },
    add(data) {
        const url = `/categories/`;
        return axiosClient.post(url, data);
    },
    update(data) {
        const url = `/categories/${data.id}`;
        return axiosClient.patch(url, data);
    },
    remove(id) {
        const url = `/categories/${id}`;
        return axiosClient.delete(url);
    },
};
export default post;