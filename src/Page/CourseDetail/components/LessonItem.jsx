import React from 'react';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const LessonItem = ({ infor }) => {
	return (
		<div className='py-1 cursor-default'>
			<FontAwesomeIcon icon={faCircle} fontSize={10} />
			<span className='ml-3  text-sm font-medium text-base'>
				{infor?.name}
			</span>
		</div>
	)
}

export default LessonItem;