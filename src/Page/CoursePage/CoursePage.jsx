import React, { useContext, useMemo } from 'react';
import { AppContext } from '../../App';
import Course from '../../components/Course/Course';
import ReactPaginate from 'react-paginate';

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

	const handlePageClick = (selectedPage) => {
		console.log(selectedPage)
	};


	return (
		<>
			{
				filterCourse &&
				<Course listCourse={ filterCourse } />
			}
			<ReactPaginate
				pageCount={ 3 }
				marginPagesDisplayed={ 2 }
				pageRangeDisplayed={ 5 }
				onPageChange={ handlePageClick }
				containerClassName={ 'pagination' }
				activeClassName={ 'active' }
			/>
		</>
	)
}

export default CoursePage;