import axiosClient from './axiosClient';

export const blogAPI = {
	getAll: () => axiosClient.get(`/blog`),
	createBlog: (params) => axiosClient.post(`/blog`, params),
	createBlogGet: (params) => axiosClient.get(`/blog/create?var=${params}`),
	postBookmark: (params) => axiosClient.post(`/blog`, params),
	getMyBookmark: (id) => axiosClient.get(`/bookmark/${id}`),
	bookmark: (params) => axiosClient.get(`/bookmark`, params),
	getBlogDetail: (id) => axiosClient.get(`/blog/${id}`),
	deleteBlog: (id) => axiosClient.post(`/blog/delete/${id}`),
	editBlog: (id, params) => axiosClient.post(`/blog/update/${id}`, params)
};