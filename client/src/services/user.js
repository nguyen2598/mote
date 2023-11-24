import axiosClient from './axiosClient';
const user = {
    async getApiCurrent() {
        const url = '/api/user/get-current';
        try {
            const response = await axiosClient.get(url);
            return response;
        } catch (error) {
            return error?.response;
        }
    },
    async updateUser(data) {
        const url = '/api/user/update-user';
        try {
            const response = await axiosClient.put(url, data);
            return response;
        } catch (error) {
            return error?.response;
        }
    },
};
export default user;
