import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Collapse } from 'antd';
import React, { useMemo, useState } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import CommentItem from './components/CommentItem/CommentItem';
import LessonItem from './components/LessonItem/LessonItem';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const { Panel } = Collapse;

const listLesson = [
	{
		id: 1,
		title: 'Lesson 1',
		video: 'https://player.vimeo.com/video/805460496?h=2012a742f0'
	},
	{
		id: 2,
		title: 'Lesson 2',
		video: 'https://player.vimeo.com/video/805460791?h=341d277aad'
	},
	{
		id: 3,
		title: 'Lesson 3',
		video: 'https://player.vimeo.com/video/805460496?h=2012a742f0'
	},
	{
		id: 4,
		title: 'Lesson 4',
		video: 'https://player.vimeo.com/video/805460791?h=341d277aad'
	},
	{
		id: 5,
		title: 'Lesson 5',
		video: 'https://player.vimeo.com/video/805460496?h=2012a742f0'
	}
]

const Comment = {
	user: {
		userName: 'Do Phuong Uyen',
		avatar: 'https://image.nhandan.vn/1200x630/Uploaded/2023/yqjwcqjlq/2022_11_24/ronaldo-portugal-copy-1844.jpg'
	},
	content: "This is comment content There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.",
	createAt: "30 m ago"
}


const Learning = () => {
	const id = useParams();
	console.log(id)
	const [actived, setActived] = useState(1)
	const renderVideo = useMemo(() => {
		const findItem = listLesson.filter(item => actived === item.id);
		if (findItem[0]) {
			return findItem[0].video;
		}
		return;
	}, [actived])

	const renderLeson = useMemo(() => {
		return listLesson?.map((item) => {
			return <LessonItem lesson={item} key={item.id} setActived={setActived} isActive={actived === item.id} />
		})
	}, [actived])

	return (
		<div>
			<Container>
				<Row>
					<Col xs={12} lg={8}>
						{
							renderVideo ? <iframe src={renderVideo}
								width="600" height="564" title='video' frameBorder="0" allow="autoplay; fullscreen" allowFullScreen style={{ width: "100%" }} />
								:
								<Spinner animation="grow" />
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
					<Col xs={12} lg={8}>
						Grammar
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