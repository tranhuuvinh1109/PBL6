import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useCheckAdmin = (user) => {
	const [isAdmin, setIsAdmin] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		if (user && user.role === 2) {
			setIsAdmin(true);
		} else {
			setIsAdmin(false);
		}
	}, [user, navigate]);

	return isAdmin;
}

export default useCheckAdmin;