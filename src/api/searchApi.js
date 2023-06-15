import axiosClient from './axiosClient';

export const searchAPI = {
	search: (param) => axiosClient.get(`/search/keyword=${param}`)
};