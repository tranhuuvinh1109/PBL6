import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import CourseItem from "../../../components/CourseItem/CoureItem";
import './Course.css';

const Course = () => {
	return (
		<div className="courses section">
			<Container>
				<Row>
					<Col xs={12}>
						<div className="section-title">
							<div className="section-icon wow zoomIn" data-wow-delay=".4s">
								<i className="lni lni-graduation"></i>
							</div>
							<h2 className="wow fadeInUp" data-wow-delay=".4s">Featured Courses</h2>
							<p className="wow fadeInUp" data-wow-delay=".6s">There are many variations of passages of Lorem
								Ipsum available, but the majority have suffered alteration in some form.</p>
						</div>
					</Col>

				</Row>

				<div className="single-head">
					<Row>
						<CourseItem />
						<CourseItem />
						<CourseItem />
						<CourseItem />
						<CourseItem />
						<CourseItem />
					</Row>
				</div>
			</Container >
		</div >
	)
}

export default Course;