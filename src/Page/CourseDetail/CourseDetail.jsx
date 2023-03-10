import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { Collapse } from 'antd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LessonItem from "./components/LessonItem";
import { authAPI } from '../../api/authApi';
import { useNavigate } from 'react-router-dom'
import Loading from "../../components/Loading/Loading";
const { Panel } = Collapse;

const CoureDetail = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const [infor, setInfor] = useState([]);
	const GetInformationCourse = async () => {
		const res = await authAPI.getUser(`/course/${id}`)
		if (res.status === 200) {
			setInfor(res.data)
		}
		return [];
	}

	useEffect(() => {
		GetInformationCourse()
	}, [])
	return (
		<Container fluid="md" className="text-left mb-20 mt-20 min-h-[630px]">
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
									{
										infor.plan?.map((item) => {
											return (
												<Col xs={12} lg={6} md={6}>
													<div className="py-2">
														<FontAwesomeIcon icon={faCheck} className='mr-2 text-red-400' />
														<span>
															{
																item.title
															}
														</span>
													</div>
												</Col>
											)
										})
									}
								</Row>
							</Container>
						</div>
					</div>

					<Collapse accordion className="mt-4">
						<Panel header="Lesson content" key="1">
							{
								infor.lesson?.map((item) => {
									return (
										<LessonItem key={item.id} infor={item} />
									)
								})
							}
						</Panel>
					</Collapse>
				</Col>
				<Col xs={12} lg={4}>
					{
						infor.video ?
							<iframe src={infor.video} title="video" width="400" height="350" frameBorder="6" allow="autoplay; fullscreen" allowFullScreen style={{ width: "100%" }}></iframe>
							:
							<Loading />
					}

					<div className="mt-4 flex justify-between">
						<h3 className="text-red-400">
							500
						</h3>
						<button className="bg-red-400 text-white py-1.5 px-3 rounded-full min-w-[150px]"
							onClick={() => {
								navigate(`/page/learning/${infor?.id}`)
							}}
						>
							Register
						</button>
					</div>

				</Col>
			</Row>
		</Container>

	)
}

export default CoureDetail;