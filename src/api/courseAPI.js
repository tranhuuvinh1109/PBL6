import axiosClient from './axiosClient';

export const courseAPI = {
	postCourse: (param) => axiosClient.post('/course', param)
};
