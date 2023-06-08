import { Navigate } from 'react-router-dom';
import React from 'react';
import { toast } from 'react-hot-toast';
export const PrivateRouter = ({ path, outlet }) => {
	const userID = localStorage.getItem("userID");
	console.log(1, userID)
	if (!userID) {
		console.log('if')
		toast.error("Please login")
		return <Navigate to={{ pathname: path }} />;
	}
	else {
		console.log('outlet')
		return outlet;
	}
};