import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import videoSRC from '../../Assets/bunny.mp4';
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { Collapse } from 'antd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const { Panel } = Collapse;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const CoureDetail = () => {
	const { id } = useParams();
	console.log(id)
	return (
		<Container fluid="md" className="text-left mb-20">
			<Row>
				<Col xs={12} lg={8}>
					<h1 className="text-left">
						JLPT N5
					</h1>
					<p>
						Để có kiến thức nền tảng để học tốt tiếng nhật
					</p>
					<div className="mt-5">
						<h5>
							Bạn sẽ học được gì?
						</h5>
						<div>
							<Container>
								<Row>
									<Col xs={12} lg={6} md={6}>
										<div className="py-2">
											<FontAwesomeIcon icon={faCheck} className='mr-2 text-red-400' />
											<span>
												Các kiến thức cơ bản, nền móng của ngành IT
											</span>
										</div>
									</Col>
									<Col xs={12} lg={6} md={6}>
										<div className="py-2">
											<FontAwesomeIcon icon={faCheck} className='mr-2 text-red-400' />
											<span>
												Các kiến thức cơ bản, nền móng của ngành IT
											</span>
										</div>
									</Col>
									<Col xs={12} lg={6} md={6}>
										<div className="py-2">
											<FontAwesomeIcon icon={faCheck} className='mr-2 text-red-400' />
											<span>
												Các kiến thức cơ bản, nền móng của ngành IT
											</span>
										</div>
									</Col>
									<Col xs={12} lg={6} md={6}>
										<div className="py-2">
											<FontAwesomeIcon icon={faCheck} className='mr-2 text-red-400' />
											<span>
												Các kiến thức cơ bản, nền móng của ngành IT
											</span>
										</div>
									</Col>
								</Row>
							</Container>
						</div>
					</div>

					<Collapse accordion className="mt-4">
						<Panel header="Lesson content" key="1">
							<p>{text}</p>
						</Panel>
					</Collapse>
				</Col>
				<Col xs={12} lg={4}>
					<video src={videoSRC} controls className="w-full rounded-xl" />
					<div className="mt-4 flex justify-between">
						<h3 className="text-red-400">
							500
						</h3>
						<button className="bg-red-400 text-white py-1.5 px-3 rounded-full min-w-[150px]">
							Register
						</button>
					</div>

				</Col>
			</Row>
		</Container>

	)
}

export default CoureDetail;