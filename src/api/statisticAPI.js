import axiosClient from "./axiosClient";

export const statisticAPI = {
	statisticCourse: () => axiosClient.get(`/daskboard`)
}