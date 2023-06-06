import React from "react";
import { Link } from "react-router-dom";

const CourseResult = ({ course }) => {
	return (
		<div className="flex mb-2 w-full">
			{
				course.image && <Link to={ `/course/${course.course_id}` }><img src={ course.image } alt="course" className="w-28 object-cover rounded-lg" /></Link>
			}
			<div className="ml-2">
				{
					course.name && <Link to={ `/course/${course.course_id}` }><h6 className="whitespace-nowrap text-ellipsis text-lg overflow-hidden">{ course.name }</h6></Link>
				}
				{
					course.price && <h6 className="whitespace-nowrap text-ellipsis overflow-hidden">{ course.price } $</h6>
				}
			</div>
		</div>
	)
}

export default CourseResult;