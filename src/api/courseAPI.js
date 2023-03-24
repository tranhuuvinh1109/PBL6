import axiosClient from './axiosClient';

export const courseAPI = {
	getCourse: () => axiosClient.get('/course'),
	getCourseDetail: (id) => axiosClient.get(`/course/${id}`),
	postCourse: (param) => axiosClient.post('/course', param)
};
