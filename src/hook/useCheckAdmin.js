import { useState, useEffect } from 'react';

const useCheckAdmin = (user) => {
	const [isAdmin, setIsAdmin] = useState(false);

	useEffect(() => {
		if (user && user.role === 0) {
			setIsAdmin(true);
		} else {
			setIsAdmin(false);
		}
	}, [user]);

	return isAdmin;
}

export default useCheckAdmin;