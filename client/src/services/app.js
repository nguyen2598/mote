import axiosClient from './axiosClient';
import AxiosDefault from 'axios';
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
    async getPublicProvinceApi() {
        try {
            const response = await AxiosDefault.get('https://provinces.open-api.vn/api/?depth=2');
            return response;
        } catch (error) {
            return error;
        }
    },
    async getUploadImages(images) {
        try {
            const response = await AxiosDefault.post(
                `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
                images,
            );
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
