import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loading = () => {
	return (
		<div className='flex justify-center items-center min-h-[150px]'>
			<Spinner animation="grow" className='text-greenCustom' />
		</div>
	)
}

export default Loading;