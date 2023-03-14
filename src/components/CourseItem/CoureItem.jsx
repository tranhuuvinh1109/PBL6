import React from 'react';
import { Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

const CourseItem = ({ data }) => {
	return (
		<Col lg={4} md={6} xs={12}>
			<div className="single-course wow fadeInUp" data-wow-delay=".4s">
				<div className="course-image">
					<Link to={`/page/course/${data.id}`}>
						<img src={data.image} alt="#" className='lg:max-h-56 md:max-h-40' />
					</Link>
					<p className="price">{data.price}</p>
				</div>
				<div className="content">
					<h3>
						<Link to={`/page/course/${data.id}`}>{data.name}</Link>
					</h3>
					<p>{data.description}</p>
				</div>
				<div className="bottom-content">
					<ul className="review">
						<li><FontAwesomeIcon icon={faStar} /></li>
						<li><FontAwesomeIcon icon={faStar} /></li>
						<li><FontAwesomeIcon icon={faStar} /></li>
						<li><FontAwesomeIcon icon={faStar} /></li>
						<li><FontAwesomeIcon icon={faStar} /></li>
						<li>10 Reviews</li>
					</ul>
				</div>
			</div>
		</Col >

	)
}

export default CourseItem;