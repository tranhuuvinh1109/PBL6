import axiosClient from './axiosClient';

export const authAPI = {
	login: (param) => axiosClient.post('/login', param),
	getUserByToken: () => axiosClient.get('/me'),
	getUser: (id) => axiosClient.get(`/user/${id}`),
	getVideo: (idCourse) => axiosClient.get(`/video/${idCourse}`)
};
