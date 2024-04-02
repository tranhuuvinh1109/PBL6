import React, { useMemo } from "react";
import { Container, Row } from "react-bootstrap";
import CourseItem from "../CourseItem/CoureItem";
import "../../Assets/css/Course.css";
import { listCourse } from "../../constants";

const Course = () => {
  const renderListCourse = useMemo(() => {
    return listCourse?.map((course, index) => {
      return <CourseItem key={index} data={course} />;
    });
  }, []);
  return (
    <div className="courses section p-0 mt-20">
      <Container>
        <div className="single-head">
          <Row>{renderListCourse}</Row>
        </div>
      </Container>
    </div>
  );
};

export default Course;
