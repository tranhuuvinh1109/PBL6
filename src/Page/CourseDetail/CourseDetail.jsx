import React, { useMemo, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { Collapse } from 'antd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ListItem from "./components/ListItem";
import { authAPI } from '../../api/authApi';
const { Panel } = Collapse;

const CoureDetail = () => {
	const { id } = useParams();
	const [listItem, setListItem] = useState([]);
	const [listVideo, setListVideo] = useState();
	const [idLecture, setIdLecture] = useState();
	console.log(id)
	const GetUser = async () => {
		const res = await authAPI.getUser('/user')

		if (res.status === 200) {
			setListItem(res.data);
		}
		return;

	}
	const GetVideo = async (idCourse) => {
		const res = await authAPI.getUser(`/video/${idCourse}`);
		setListVideo(res.data);
	}

	const getList = useMemo(() => {
		return listItem?.map((item, index) => {
			return <ListItem infor={item} key={index} setIdLecture={setIdLecture} />
		})
	}, [listItem])

	const getVideo = useMemo(() => {
		return listVideo.link
	}, [idLecture, listVideo])

	useEffect(() => {
		console.log(2222, idLecture)
		if (idLecture) {
			console.log(555, idLecture)
			GetVideo(idLecture)
		}
	}, [idLecture])

	useEffect(() => {
		GetUser()
	}, [])
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
							{
								getList
							}
						</Panel>
					</Collapse>
				</Col>
				<Col xs={12} lg={4}>
					{/* <iframe src={getVideo} width="100px" height="100px" frameborder="0" allowfullscreen></iframe>
					<video src={getVideo} controls className="w-full rounded-xl" /> */}
					<iframe src={getVideo} width="400" height="350" frameborder="6" allow="autoplay; fullscreen" allowfullscreen></iframe>;
					<div className="mt-4 flex justify-between">
						<h3 className="text-red-400" onClick={() => console.log('0->', getList, idLecture)}>
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