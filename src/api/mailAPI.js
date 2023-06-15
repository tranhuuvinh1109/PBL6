import axiosClient from "./axiosClient";

export const mailAPI = {
	sendMail: (params) => axiosClient.get(`/send-mail/email=${params.email}&course=${params.course}&price=${params.price}&image=${params.image}`)
}