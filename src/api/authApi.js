import axiosClient from './axiosClient';

export const authAPI = {
	login: (param) => axiosClient.post(`/login`, { param }),
	loginGet: (param) => axiosClient.get(`/login?var=${param}`),
	getUserByToken: (params) => axiosClient.get(`/me&token=${params}`),
	getUser: (id) => axiosClient.get(`/user/${id}`),
	register: (params) => axiosClient.post('/register', params),
	updateProfile: (params) => axiosClient.get(`/user/profile/edit?var=${params}`)
};
