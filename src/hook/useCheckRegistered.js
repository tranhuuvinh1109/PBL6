import { useEffect, useState } from "react"


const check = (arr, user, id) => {
	if (user && id) {
		const isRegister = arr.some(
			(registration) => registration.user_id === user && registration.course_id === id
		);
		return isRegister;
	}
}
const useCheckRegistered = (arr, user, id) => {
	const [isRegistered, setIsRegistered] = useState(false);
	useEffect(() => {
		const checkRegistered = async () => {
			const result = await check(arr, user, id);
			setIsRegistered(result);
		}
		checkRegistered();
	}, [user, id]);

	return isRegistered;
}

export default useCheckRegistered;