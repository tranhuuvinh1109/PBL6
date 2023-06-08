import axiosClient from "./axiosClient";

export const statisticAPI = {
	statisticCourse: () => axiosClient.get(`/statistic/course`)
}