import React from "react";
import { Link } from "react-router-dom";

const MyCourseItem = ({ course }) => {
	return (
		<div className="flex mt-2">
			<Link to={ `course/${course.id}` } key={ course.id }>
				<img src={ course.image } alt="course" className="rounded-lg w-[120px] h-[70px] object-cover" />
			</Link>
			<div className="ml-3">
				<h6 className="whitespace-nowrap text-ellipsis overflow-hidden">
					{
						course.name
					}
				</h6>
				<p className="m-0">
					{
						course.description
					}
				</p>
			</div>
		</div>
	)
}

export default MyCourseItem;