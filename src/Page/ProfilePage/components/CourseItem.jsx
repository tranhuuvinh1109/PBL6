import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';
const CourseItem = () => {
	return (
		<div className="flex course-item">
			<div className="w-4/12 course-item-img">
				<img src='https://files.fullstack.edu.vn/f8-prod/courses/12.png' alt="courseItem" />
			</div>
			<div className="w-8/12 course-item-content">
				<div className="course-item-text">
					<h6 className="m-0">Responsive</h6>
					<p className="m-0">
						this is Responsive this is Responsive this is Responsive this is Responsive this is Responsive
					</p>
				</div>
				<div className="course-item-star">
					<FontAwesomeIcon icon={ faStar } />
					<FontAwesomeIcon icon={ faStar } />
					<FontAwesomeIcon icon={ faStar } />
					<FontAwesomeIcon icon={ faStar } />
					<FontAwesomeIcon icon={ faStarHalf } />
				</div>
			</div>
		</div>
	)
}

export default CourseItem;