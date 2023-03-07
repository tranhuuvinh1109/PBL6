import axios from 'axios';
// import { TOKEN_KEY } from '../constant';
// console.log(process.env.REACT_APP_API_URL);
const axiosClient = axios.create({
	baseURL: 'https://6406ffdd77c1a905a0e9c15f.mockapi.io/api/v1'
	// 'https://jsonplaceholder.typicode.com' 
});
// axiosClient.interceptors.request.use(
//   (config) => {
//     const accessToken = localStorage.getItem(TOKEN_KEY.ACCESS_TOKEN);
//     if (accessToken != null) {
//       return {
//         ...config,
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           ...config.headers
//         }
//       };
//     }

//     return {
//       ...config,
//       headers: {
//         ...config.headers
//       }
//     };
//   },
//   async (error) => await Promise.reject(error)
// );
// axiosClient.interceptors.response.use(
//   async (response) => await Promise.resolve(response),
//   async (error) => {
//     return await Promise.reject(error);
//   }
// );
export default axiosClient;