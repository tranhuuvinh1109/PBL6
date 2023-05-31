import React, { useContext, useMemo } from "react";
import { Container, Row } from "react-bootstrap";
import CourseItem from "../CourseItem/CoureItem";
import '../../Assets/css/Course.css';
import { AppContext } from "../../App";

const Course = () => {
	const context = useContext(AppContext);
	const renderListCourse = useMemo(() => {
		return context.listCourse?.map((course, index) => {
			return (
				<CourseItem key={ index } data={ course } />
			)
		})
	}, [context?.listCourse])
	return (
		<div className="courses section p-0 mt-20">
			<Container>
				<div className="single-head">

					<Row>
						{
							renderListCourse
						}
					</Row>
				</div>
			</Container >
		</div >
	)
}

export default Course;