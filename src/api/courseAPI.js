import axiosClient from './axiosClient';

export const courseAPI = {
	getCourse: () => axiosClient.get('/course/all'),
	getCourseDetail: (id) => axiosClient.get(`/course/${id}`),
	getCourseDetailCheck: (id, userId) => axiosClient.get(`/course/${id}/user_id=${userId}`),
	registerCourse: (param) => axiosClient.post(`/purchased_course`, param),
	checkRegisteredCourse: (param) => axiosClient.post(`/check_registered_course`, param),
	postCourse: (param) => axiosClient.post('/course', param),
	deleteCourse: (id) => axiosClient.delete(`/course/${id}`),
};
