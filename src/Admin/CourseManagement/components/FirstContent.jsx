import React, { useContext } from 'react';
import { CreateCourseContext } from '../CreateCourse/CreateCourse';

const FirstContent = () => {
	const courseContext = useContext(CreateCourseContext)
	console.log(123, courseContext?.courseContext)
	return (
		<div>
			<label htmlFor='cousreName'>Course Name:</label>
			<input type='text' id='courseName' name='courseName' />

		</div>
	)
}

export default FirstContent;