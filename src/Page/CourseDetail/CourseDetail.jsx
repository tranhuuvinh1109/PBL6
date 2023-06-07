import React, { useEffect, useState, useMemo, useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { Collapse } from 'antd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LessonItem from "./components/LessonItem";
import Loading from "../../components/Loading/Loading";
import { courseAPI } from "../../api/courseAPI";
import Payment from "../Payment/Payment";
import { AppContext } from "../../App";

const { Panel } = Collapse;

const CoureDetail = () => {
	const context = useContext(AppContext);
	const navigate = useNavigate();
	const { id } = useParams();
	const [infor, setInfor] = useState();
	const [loading, setLoading] = useState(false);
	const [register, setRegister] = useState(false);

	const GetInformationCourse = async (id) => {
		setLoading(true);
		if (context?.user?.id) {
			const resWithCheck = await courseAPI.getCourseDetailCheck(id, context?.user?.id);
			if (resWithCheck.status === 200) {
				console.log('->', resWithCheck.data)
				setInfor(resWithCheck.data.data);
				if (resWithCheck.data.registered === 'true') {
					setRegister(true);
				} else {
					setRegister(false);
				}
			}
		}
		setLoading(false)
	};


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

	const handleClickLearning = () => {
		navigate(`/learning/${id}`);
	}

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
								Learn to work
							</p>
							<div className="mt-5">
								<h5>
									What will you learn?
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
									} $
								</h3>
								{
									register ? <button className="bg-red-400 text-white py-1.5 px-3 rounded-full min-w-[150px] hover:bg-red-300" onClick={ handleClickLearning }>Learning</button>
										: (
											infor?.id &&
											<Payment data={ infor } res={ register } />
										)
								}
							</div>
						</Col>
					</Row>
			}
		</Container>

	)
}

export default CoureDetail;