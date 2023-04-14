import axiosClient from './axiosClient';

export const categoryAPI = {
	getAll: () => axiosClient.get(`/category`),
};