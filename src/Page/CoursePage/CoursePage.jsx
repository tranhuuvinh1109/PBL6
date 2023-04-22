import React, { useContext, useMemo } from 'react';
import { AppContext } from '../../App';
import Course from '../../components/Course/Course';

// const marks = {
// 	0: '0',
// 	500: '500',
// 	1000: {
// 		style: {
// 			color: '#f50',
// 		},
// 		label: <strong>1000</strong>,
// 	},
// };

const CoursePage = () => {
	const context = useContext(AppContext);

	const filterCourse = useMemo(() => {
		if (context.listCourse) {
			return context.listCourse;
		}
	}, [context.listCourse]);



	return (
		<>
			{
				filterCourse &&
				<Course listCourse={ filterCourse } />
			}
		</>
	)
}

export default CoursePage;