import axiosClient from './axiosClient';

const app = {
    async getPriceApi(data) {
        const url = '/api/price/all';
        try {
            const response = await axiosClient.get(url);
            return response;
        } catch (error) {
            return error;
        }
    },

    async getAreaApi(data) {
        const url = '/api/area/all';
        try {
            const response = await axiosClient.get(url);
            return response;
        } catch (error) {
            return error;
        }
    },
    async getProvinceApi(data) {
        const url = '/api/province/all';
        try {
            const response = await axiosClient.get(url);
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
export default app;
