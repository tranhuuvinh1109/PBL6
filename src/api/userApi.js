import axiosClient from './axiosClient';

export const userAPI = {
	getUserByID: (id) => axiosClient.get(`/user/${id}`),
	getInformaitonProflie: () => axiosClient.post(`/me`),
};