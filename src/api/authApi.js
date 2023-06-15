import axiosClient from './axiosClient';

export const authAPI = {
	login: (param) => axiosClient.get(`/login/email=${param.email}&password=${param.password}`),
	getUserByToken: (params) => axiosClient.get(`/me&token=${params}`),
	getUser: (id) => axiosClient.get(`/user/${id}`),
	register: (params) => axiosClient.post('/register', params),
	updateProfile: (params) => axiosClient.get(`/user_profile/update&id=${params.id}&fullname=${params.fullname}&phone=${params.phone}&address=${params.address}&birthday=${params.birthday}&avatar=${params.avatar}`)
};
