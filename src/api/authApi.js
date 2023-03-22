import axiosClient from './axiosClient';

export const authAPI = {
	login: (param) => axiosClient.post('/login', param),
	getUser: (param) => axiosClient.get(param),
	getVideo: (idCourse) => axiosClient.get(`/video/${idCourse}`)
};
