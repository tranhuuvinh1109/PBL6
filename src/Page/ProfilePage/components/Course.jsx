import React from "react";
import CourseItem from "./CourseItem";


const Course = () => {
	return (
		<div className='text-left'>
			<div className="w-1/2 profile-tab">
				<CourseItem />
				<CourseItem />
				<CourseItem />
				<CourseItem />
				<CourseItem />
			</div>
		</div>
	)
}

export default Course;