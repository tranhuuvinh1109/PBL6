import axiosClient from './axiosClient';

export const authAPI = {
	getUser: (param) => axiosClient.get(param)
};
