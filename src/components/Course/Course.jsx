import React from "react";
import { Container, Row } from "react-bootstrap";
import CourseItem from "../CourseItem/CoureItem";
import '../../Assets/css/Course.css';

const Course = ({ listCourse }) => {
	return (
		<div className="courses section p-0 mt-20">
			<Container>
				<div className="single-head">

					<Row>
						{
							listCourse && listCourse?.map((course, index) => {
								return (
									<CourseItem key={ index } data={ course } />
								)
							})
						}
					</Row>
				</div>
			</Container >
		</div >
	)
}

export default Course;