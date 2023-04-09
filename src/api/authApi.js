import axiosClient from './axiosClient';

export const authAPI = {
	login: (param) => axiosClient.post('/login', param),
	getUserByToken: (id) => axiosClient.get(`/me/${id}`),
	getUser: (id) => axiosClient.get(`/user/${id}`),
	register: (params) => axiosClient.post('/register', params)
};
