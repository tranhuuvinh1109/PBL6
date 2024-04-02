import React, { useEffect, useMemo } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Collapse } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LessonItem from "./components/LessonItem";
import Loading from "../../components/Loading/Loading";
import Payment from "../Payment/Payment";
import { listCourse } from "../../constants";

const { Panel } = Collapse;

const CoureDetail = () => {
  const renderVideo = useMemo(() => {
    if (listCourse[0]?.lessons) {
      return (
        <video controls className="w-full rounded-lg">
          <source src={listCourse[0].lessons[0].video} type="video/mp4" />
        </video>
      );
    }
    return <Loading />;
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container fluid="md" className="text-left mb-20 mt-20 min-h-[630px]">
      <Row>
        <Col xs={12} lg={8}>
          <h1 className="text-left">{listCourse[0]?.name}</h1>
          <p>Learn to work</p>
          <div className="mt-5">
            <h5>What will you learn?</h5>
            <div>
              <Container>
                <Row>
                  {listCourse[0]?.plans?.map((item, index) => {
                    return (
                      <Col xs={12} lg={6} md={6} key={index}>
                        <div className="py-2">
                          <FontAwesomeIcon
                            icon={faCheck}
                            className="mr-2 text-red-400"
                          />
                          <span>{item?.title}</span>
                        </div>
                      </Col>
                    );
                  })}
                </Row>
              </Container>
            </div>
          </div>

          <Collapse accordion className="mt-4">
            <Panel header="Lesson content" key="1">
              {listCourse[0]?.lessons?.map((item) => {
                return <LessonItem key={item.id} infor={item} />;
              })}
            </Panel>
          </Collapse>
        </Col>
        <Col xs={12} lg={4}>
          {renderVideo}

          <div className="mt-4 flex justify-between">
            <h3 className="text-red-400">{listCourse[0]?.price} $</h3>
            <Payment data={listCourse[0]} res={false} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CoureDetail;
