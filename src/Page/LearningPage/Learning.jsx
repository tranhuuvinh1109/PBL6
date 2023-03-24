import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Collapse } from 'antd';
import React, { useMemo, useState, useEffect } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import CommentItem from './components/CommentItem/CommentItem';
import LessonItem from './components/LessonItem/LessonItem';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { courseAPI } from '../../api/courseAPI';
import parse from 'html-react-parser';

const { Panel } = Collapse;

const Comment = {
	user: {
		userName: 'Do Phuong Uyen',
		avatar: 'https://image.nhandan.vn/1200x630/Uploaded/2023/yqjwcqjlq/2022_11_24/ronaldo-portugal-copy-1844.jpg'
	},
	content: "This is comment content There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.",
	createAt: "30 m ago"
}


const Learning = () => {
	const { id } = useParams();
	const [infor, setInfor] = useState({});
	const [actived, setActived] = useState(1);

	const GetInformationCourse = async (id) => {
		const res = await courseAPI.getCourseDetail(id)
		if (res.status === 200) {
			setInfor(res.data.data)
		}
	}
	const renderVideo = useMemo(() => {
		if (infor?.lessons) {
			const findItem = infor.lessons.filter(item => actived === item.id);
			if (findItem[0].video) {
				return (
					<div className='w-full'>
						<iframe src={findItem[0].video} className='w-full top-0 left-0' title='video lesson' allowFullScreen />
					</div>
				)
			}
			return <Spinner animation="grow" />
		}
		return <Spinner animation="grow" />
	}, [actived, infor])

	const renderGrammar = useMemo(() => {
		if (infor?.lessons) {
			const findItem = infor.lessons.filter(item => actived === item.id);
			if (findItem[0].grammar) {
				return parse(findItem[0].grammar);
			}
		}
	}, [actived, infor])

	const renderLeson = useMemo(() => {
		if (infor?.lessons) {
			return infor.lessons?.map((item) => {
				return <LessonItem lesson={item} key={item.id} setActived={setActived} isActive={actived === item.id} />
			})
		}
	}, [actived, infor])

	useEffect(() => {
		GetInformationCourse(id)
	}, [id])
	return (
		<div>
			<Container>
				<Row>
					<Col xs={12} lg={8}>
						{
							renderVideo
						}
					</Col>
					<Col xs={12} lg={4}>
						<Collapse accordion className='lg:mt-[46px]'>
							<Panel header="Lesson content" key="1" >
								<div className='max-h-96  overflow-y-auto'>
									{
										renderLeson
									}
								</div>
							</Panel>
						</Collapse>
					</Col>
				</Row>
			</Container>
			<Container>
				<Row>
					<Col xs={12} lg={8} className='text-left'>
						<h4>Grammar</h4>
						{
							infor && renderGrammar
						}
					</Col>
					<Col xs={12} lg={4} className="">
						<h4>
							Comment
						</h4>
						<div className='text-left max-h-[500px] min-h-[300px]  overflow-y-auto'>
							<CommentItem comment={Comment} />
						</div>
						<div className='flex mt-2 border-t-2 px-3'>
							<div className='mt-1'>
								<Avatar src="https://image.nhandan.vn/1200x630/Uploaded/2023/yqjwcqjlq/2022_11_24/ronaldo-portugal-copy-1844.jpg" size="large" />
							</div>
							<div className='ml-2 mt-1 w-full'>
								<input type="text" placeholder="Enter Comment" className='py-2 px-2 w-10/12 border-gray-300' />
								<button className='w-2/12 btn' title='Send'>
									<FontAwesomeIcon icon={faPaperPlane} />
								</button>
							</div>
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	)
}

export default Learning;