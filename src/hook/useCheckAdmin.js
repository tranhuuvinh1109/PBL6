import { useState, useEffect } from 'react';

const useCheckAdmin = (context) => {
	const [isAdmin, setIsAdmin] = useState(false);

	useEffect(() => {

		if (!context.loading && context.user) {
			if (context.user.role === 0 || context.user.role === 1) {
				setIsAdmin(true);
			}

		} else {
			setIsAdmin(false);
		}
	}, [context.loading, context.user]);

	return isAdmin;
}

export default useCheckAdmin;