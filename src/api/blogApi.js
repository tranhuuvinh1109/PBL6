import axiosClient from './axiosClient';

export const blogAPI = {
	getAll: () => axiosClient.get(`/blog`),
	createBlog: (params) => axiosClient.post(`/blog`, params),
	postBookmark: (params) => axiosClient.post(`/blog`, params),
	getMyBookmark: (id) => axiosClient.get(`/bookmark/${id}`),
	bookmark: (params) => axiosClient.get(`/bookmark`, params),
};