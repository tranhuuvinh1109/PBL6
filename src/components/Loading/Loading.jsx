import React from 'react';
import { Container, Spinner } from 'react-bootstrap';

const Loading = () => {
	return (
		<Container className='flex justify-center items-center min-h-[150px]'>
			<Spinner animation="grow" className='text-greenCustom' />
		</Container>
	)
}

export default Loading;