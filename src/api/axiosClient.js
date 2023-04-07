import axios from 'axios';
// import { TOKEN_KEY } from '../constant';
// console.log(process.env.REACT_APP_API_URL);
const axiosClient = axios.create({
	// baseURL: 'https://6406ffdd77c1a905a0e9c15f.mockapi.io/api/v1'
	baseURL: 'http://127.0.0.1:8000/api'
	// baseURL: 'https://agonizing-star-production.up.railway.app/api',


	// 'https://jsonplaceholder.typicode.com' 
});
axiosClient.interceptors.request.use(
	(config) => {
		const accessToken = localStorage.getItem("userID");
		if (accessToken != null) {
			return {
				...config,
				headers: {
					Authorization: `Bearer ${accessToken}`,
					...config.headers
				},
				mode: 'no-cors',
			};
		}

		return {
			...config,
			headers: {
				...config.headers
			}
		};
	},
	async (error) => await Promise.reject(error)
);
axiosClient.interceptors.response.use(
	async (response) => await Promise.resolve(response),
	async (error) => {
		return await Promise.reject(error);
	}
);
export default axiosClient;