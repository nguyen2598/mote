import axiosClient from './axiosClient';

const category = {
    async getCategoryApi(data) {
        const url = '/api/category/all';
        try {
            const response = await axiosClient.get(url);
            return response;
        } catch (error) {
            return error;
        }
    },
    async login(data) {
        const url = '/api/category/login';
        try {
            const response = await axiosClient.post(url, data);
            return response;
        } catch (error) {
            return error;
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
export default category;
