import React, { useEffect, useState, useMemo } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { Collapse } from 'antd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LessonItem from "./components/LessonItem";
import { useNavigate } from 'react-router-dom'
import Loading from "../../components/Loading/Loading";
import { courseAPI } from "../../api/courseAPI";
import Payment from "../Payment/Payment";

const { Panel } = Collapse;

const CoureDetail = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [infor, setInfor] = useState();
	const [loading, setLoading] = useState(false);

	const GetInformationCourse = async (id) => {
		setLoading(true);
		const res = await courseAPI.getCourseDetail(id);
		if (res.status === 200) {
			setInfor(res.data);
		}
		setLoading(false);

	};

	const handleClickRegister = () => {
		navigate(`/learning/${infor?.id}`);
		// if (context?.user) {
		// 	const params = {
		// 		userId: context.user.id,
		// 		courseId: +id
		// 	}
		// 	const res = await courseAPI.registerCourse(params);
		// 	if (res.status === 200) {
		// 		console.log('register', res.data.data);
		// 		navigate(`/page/learning/${infor?.id}`);
		// 		toast.success('Register Course Successfully')
		// 	}
		// 	if (res.status === 201) {
		// 		toast.success('data exist')
		// 		navigate(`/page/learning/${infor?.id}`);
		// 	}
		// 	else {
		// 		toast.error('Register Course Failed');
		// 	}
		// }
	}

	const renderVideo = useMemo(() => {
		if (infor?.lessons) {
			return (
				<video controls className="w-full rounded-lg">
					<source src={ infor.lessons[0].video } type="video/mp4" />
				</video>
			)
		}
		return <Loading />
	}, [infor])

	useEffect(() => {
		GetInformationCourse(id)
	}, [id])
	return (
		<Container fluid="md" className="text-left mb-20 mt-20 min-h-[630px]">
			{
				loading ? <Loading />
					:
					<Row>
						<Col xs={ 12 } lg={ 8 }>
							<h1 className="text-left">
								{
									infor?.name
								}
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
												infor?.plans?.map((item) => {
													return (
														<Col xs={ 12 } lg={ 6 } md={ 6 }>
															<div className="py-2">
																<FontAwesomeIcon icon={ faCheck } className='mr-2 text-red-400' />
																<span>
																	{
																		item?.title
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
										infor?.lessons?.map((item) => {
											return (
												<LessonItem key={ item.id } infor={ item } />
											)
										})
									}
								</Panel>
							</Collapse>
						</Col>
						<Col xs={ 12 } lg={ 4 }>
							{
								renderVideo
							}

							<div className="mt-4 flex justify-between">
								<h3 className="text-red-400">
									{
										infor?.price
									}
								</h3>
								{
									infor?.price &&
									<Payment data={ infor } />
								}
								{/* <button className="bg-red-400 text-white py-1.5 px-3 rounded-full min-w-[150px] hover:bg-red-300" onClick={ handleClickRegister }>
									Register
								</button> */}
							</div>

						</Col>
					</Row>
			}
		</Container>

	)
}

export default CoureDetail;