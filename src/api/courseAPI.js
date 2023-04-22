import axiosClient from './axiosClient';

export const courseAPI = {
	getCourse: () => axiosClient.get('/course'),
	getCourseDetail: (id) => axiosClient.get(`/course/${id}`),
	registerCourse: (param) => axiosClient.post(`/purchased_course`, param),
	checkRegisteredCourse: (param) => axiosClient.post(`/check_registered_course`, param),
	postCourse: (param) => axiosClient.post('/course', param),
	deleteCourse: (id) => axiosClient.delete(`/course/${id}`),
};
