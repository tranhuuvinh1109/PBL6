import React from "react";
import { Link } from "react-router-dom";

const MyCourseItem = () => {
	return (
		<div className="flex mt-2">
			<Link to={'course/21'}>
				<img src='https://files.fullstack.edu.vn/f8-prod/courses/21/63e1bcbaed1dd.png' alt="course" className="rounded-lg w-[120px]" />
			</Link>
			<div className="ml-3">
				<h6 className="whitespace-nowrap text-ellipsis overflow-hidden">
					Lập trình C++ cơ bản, nâng cao
				</h6>
				<p className="m-0">ksoasias</p>
			</div>
		</div>
	)
}

export default MyCourseItem;