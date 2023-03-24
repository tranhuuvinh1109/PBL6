import axiosClient from './axiosClient';

export const authAPI = {
	login: (param) => axiosClient.post('/login', param),
	getUser: (id) => axiosClient.get(`/user/${id}`),
	getVideo: (idCourse) => axiosClient.get(`/video/${idCourse}`)
};
