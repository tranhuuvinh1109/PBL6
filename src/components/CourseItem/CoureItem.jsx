import React from 'react';
import { Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons'

const CourseItem = () => {
	return (
		<Col lg={4} md={6} xs={12}>
			<div className="single-course wow fadeInUp" data-wow-delay=".4s">
				<div className="course-image">
					<a href="#">
						<img src="https://cdnimg.vietnamplus.vn/uploaded/mzdic/2023_02_22/realmadridkyluc222.jpg" alt="#" />
					</a>
					<p className="price">$200</p>
				</div>
				<div className="content">
					<h3><a href="#">Business Management</a></h3>
					<p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
						laborum.</p>
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
					<span className="tag">
						<i className="lni lni-tag"></i>
						<a href='#'>Business</a>
					</span>
				</div>
			</div>
		</Col>

	)
}

export default CourseItem;