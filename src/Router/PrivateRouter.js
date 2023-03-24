import { Navigate } from 'react-router-dom';
import React from 'react';
export const PrivateRouter = ({ path, outlet }) => {
	// const accessToken = localStorage.getItem(TOKEN_KEY.ACCESS_TOKEN);
	const userID = localStorage.getItem("userID");
	// const userID = true;
	// const isAuthenticated = accessToken && userID;

	// if (path === '/') {
	//   if (isAuthenticated) {
	//     return <Navigate to={{ pathname: path }} />;
	//   } else {
	//     return outlet;
	//   }
	// } else {
	//   if (isAuthenticated) {
	//     return outlet;
	//   } else {
	//     return <Navigate to={{ pathname: path }} />;
	//   }
	// }
	if (!userID) {
		return <Navigate to={{ pathname: path }} />;
	}
	else {
		return outlet;
	}
};