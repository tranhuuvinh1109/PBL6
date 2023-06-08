import React, { useContext, useMemo, useEffect } from 'react';
import { AppContext } from '../../App';
import Course from '../../components/Course/Course';

const CoursePage = () => {
	const context = useContext(AppContext);

	const filterCourse = useMemo(() => {
		if (context.listCourse) {
			return context.listCourse;
		}
	}, [context.listCourse]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);



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