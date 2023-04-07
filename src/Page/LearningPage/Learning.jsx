import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Collapse } from 'antd';
import React, { useMemo, useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import CommentItem from './components/CommentItem/CommentItem';
import LessonItem from './components/LessonItem/LessonItem';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { courseAPI } from '../../api/courseAPI';
import parse from 'html-react-parser';
import { db } from '../../Firebase/firebaseClient';
import { AppContext } from '../../App';
import { authAPI } from '../../api/authApi';
import ReactPlayer from 'react-player';

const { Panel } = Collapse;

const Learning = () => {
	const { id } = useParams();
	const [comments, setComments] = useState([]);
	const [commentsData, setCommentsData] = useState([]);
	const [contentComment, setContentComment] = useState('');
	const [infor, setInfor] = useState({});
	const [actived, setActived] = useState();
	const context = useContext(AppContext);

	const handleChange = (e) => {
		setContentComment(e.target.value)
	}

	const handleSubmitComment = (e) => {
		e.preventDefault();
		if (infor) {
			db.collection('lessons')
				.doc(id + "-" + actived)
				.collection('comments')
				.add({
					userId: context.user?.id,
					content: contentComment
				})
				.then(() => {
					setContentComment('');
				})
				.catch((error) => {
					console.error('Error adding comment: ', error);
				});
		}
	};

	const GetInformationCourse = async (id) => {
		const res = await courseAPI.getCourseDetail(id)
		if (res.status === 200) {
			setInfor(res.data.data)
		}
	}

	const GetInformationUser = async (id) => {
		const res = await authAPI.getUser(id)
		if (res.status === 200) {
			return res.data.data
		}
		return {};
	}

	const renderVideo = useMemo(() => {
		if (infor?.lessons) {
			const findItem = infor.lessons.filter(item => actived === item.id);
			if (findItem[0]?.video) {
				return (
					<div className='w-full rounded-xl overflow-hidden'>
						<ReactPlayer url={ findItem[0].video } controls={ true } width={ '100%' } height={ '500px' } />
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
			if (findItem[0]?.grammar) {
				return parse(findItem[0].grammar);
			}
		}
	}, [actived, infor])

	const renderLeson = useMemo(() => {
		if (infor?.lessons) {
			return infor.lessons?.map((item) => {
				return <LessonItem lesson={ item } key={ item.id } setActived={ setActived } isActive={ actived === item.id } />
			})
		}
	}, [actived, infor])

	const convertomment = useMemo(async () => {
		const list = [];
		if (comments) {
			for (const comment of comments) {
				const temp = await GetInformationUser(comment.userId);
				if (temp) {
					list.push({
						user: temp,
						content: comment.content
					});
				}
			}
		}
		return list;
	}, [comments])

	const renderComment = useMemo(() => {
		return commentsData?.map((comment, index) => {
			return <CommentItem comment={ comment } key={ index } />
		})
	}, [commentsData])

	useEffect(() => {
		convertomment.then((result) => {
			setCommentsData(result);
		});
	}, [comments, convertomment]);

	useEffect(() => {
		GetInformationCourse(id)
		const unsubscribe = db
			.collection('lessons')
			.doc(id + "-" + actived)
			.collection('comments')
			.onSnapshot((snapshot) => {
				setComments(snapshot.docs.map((doc) => doc.data()));
			});
		return () => {
			unsubscribe();
		};
	}, [id, actived]);

	return (
		<div>
			<Container>
				<Row>
					<Col xs={ 12 } lg={ 8 }>
						{
							renderVideo
						}
					</Col>
					<Col xs={ 12 } lg={ 4 }>
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
					<Col xs={ 12 } lg={ 8 } className='text-left'>
						<h4 onClick={ () => console.log(actived, infor) }>Grammar</h4>
						{
							infor && renderGrammar
						}
					</Col>
					<Col xs={ 12 } lg={ 4 } className="">
						<h4>
							Comment
						</h4>
						<div className='text-left max-h-[500px] min-h-[300px]  overflow-y-auto'>
							{
								renderComment
							}

						</div>
						<div className='flex mt-2 border-t-2 px-3'>
							<div className='mt-1'>
								<Avatar src="https://image.nhandan.vn/1200x630/Uploaded/2023/yqjwcqjlq/2022_11_24/ronaldo-portugal-copy-1844.jpg" size="large" />
							</div>
							<div className='ml-2 mt-1 w-full'>
								<input type="text" placeholder="Enter Comment" name='contentComment' value={ contentComment } onChange={ handleChange } className='py-2 px-2 w-10/12 border-gray-300' />
								<button className='w-2/12 btn' title='Send' onClick={ handleSubmitComment }>
									<FontAwesomeIcon icon={ faPaperPlane } />
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