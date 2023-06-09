import { Navigate } from 'react-router-dom';
import React from 'react';
import { toast } from 'react-hot-toast';
export const PrivateRouter = ({ path, outlet }) => {
	const userID = localStorage.getItem("userID");
	if (!userID) {
		toast.error("Please login")
		return <Navigate to={{ pathname: path }} />;
	}
	else {
		return outlet;
	}
};