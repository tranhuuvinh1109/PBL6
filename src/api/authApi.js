import axiosClient from './axiosClient';

export const authAPI = {
	login: (param) => axiosClient.post('/login', param),
	getUserByToken: (params) => axiosClient.post(`/me`, params),
	getUser: (id) => axiosClient.get(`/user/${id}`),
	register: (params) => axiosClient.post('/register', params),
	updateProfile: (params) => axiosClient.post(`/user/update`, params)
};
