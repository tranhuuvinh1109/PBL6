import React, { useContext } from 'react';
import { AppContext } from '../../App';
import Course from '../../components/Course/Course';
import Loading from '../../components/Loading/Loading';

const CoursePage = () => {
	const context = useContext(AppContext)
	return (
		<>
			{
				context?.listCourse ?
					<Course listCourse={context.listCourse} />
					:
					<Loading />
			}

		</>
	)
}

export default CoursePage;