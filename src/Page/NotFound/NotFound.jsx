import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
	const navigate = useNavigate();
	return (
		<div className='flex justify-center items-center'>
			<div>
				<h1 className='text-6xl font-semibold'>
					404 ERROR
				</h1>
				<h3 className='text-4xl mt-4'>
					Page Not Found
				</h3>
				<button className='my-btn rounded-full px-4 py-2 mt-16' onClick={ () => navigate('/') }>
					Back Home
				</button>
			</div>
		</div>
	)
}

export default NotFound;