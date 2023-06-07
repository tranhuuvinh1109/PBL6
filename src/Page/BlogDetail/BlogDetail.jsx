import { Avatar } from "antd";
import React, { useState, useEffect, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faPaperPlane } from "@fortawesome/free-solid-svg-icons"
import { Container, Row, Col } from "react-bootstrap";
import CommentItem from "../../components/CommentItem/CommentItem";
import { authAPI } from "../../api/authApi";
import { db } from "../../Firebase/firebaseClient";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../App";

const BlogDetail = () => {
	const context = useContext(AppContext);
	const { id } = useParams();
	const [comments, setComments] = useState([]);
	const [commentsData, setCommentsData] = useState([]);
	const [contentComment, setContentComment] = useState('');

	const handleChange = (e) => {
		setContentComment(e.target.value)
	};

	const handleSubmitComment = (e) => {
		e.preventDefault();
		if (contentComment) {
			db.collection('blogs')
				.doc(id)
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

	const GetInformationUser = async (id) => {
		const res = await authAPI.getUser(id);
		if (res.status === 200) {
			return res.data.data;
		}
		return {};
	};

	const convertComment = useMemo(async () => {
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
	}, [comments]);

	const renderComment = useMemo(() => {
		return commentsData?.map((comment, index) => {
			return <CommentItem comment={ comment } key={ index } />
		});
	}, [commentsData]);

	useEffect(() => {
		convertComment.then((result) => {
			setCommentsData(result);
		});
	}, [convertComment]);

	useEffect(() => {
		const unsubscribe = db
			.collection('blogs')
			.doc(id)
			.collection('comments')
			.onSnapshot((snapshot) => {
				setComments(snapshot.docs.map((doc) => doc.data()));
			});
		return () => {
			unsubscribe();
		};
	}, [id]);
	return (
		<Container className="text-left">
			<Row>
				<h4 className="text-4xl font-bold">
					Learn JavaScript while Playing Games — Gamify Your Learning
				</h4>
				<Col xs={ 12 } md={ 9 }>
					<div className="flex justify-between items-center mt-2">
						<div className="flex">
							<Avatar src="https://static-images.vnncdn.net/files/publish/2023/1/3/mu-ngoai-hang-anh-85.jpg" size="large" />
							<div className="ml-2">
								<p className="m-0">
									Trịnh Gia Minh
								</p>
								<p className="m-0">
									6 days ago
								</p>
							</div>
						</div>
						<FontAwesomeIcon icon={ faBookmark } className="text-xl" />
					</div>
					<div className="mt-3 flex justify-center items-center">
						<img src="https://znews-photo.zingcdn.me/w1200/Uploaded/aobhuua/2023_04_13/Dodge_2.jpg" className="w-full md:w-8/12" alt="blog" />
					</div>
					<div className="mt-4">
						Gamification là một giải pháp tốt cho vấn đề này. Nó sử dụng một nỗ lực chiến lược đơn giản để thúc đẩy và thu hút người dùng trong khi tìm hiểu điều gì đó mới. Đó là một kỹ thuật thêm các yếu tố thiết kế điển hình từ các trò chơi để nâng cao quá trình học tập. Điều này được thực hiện bằng cách thúc đẩy mong muốn tự nhiên của mọi người về giao tiếp xã hội, học tập, làm chủ, cạnh tranh, thành tích, địa vị hoặc thể hiện bản thân. Việc triển khai sớm Gamification sử dụng một hệ thống phần thưởng đơn giản cho người chơi sau khi họ hoàn thành nhiệm vụ để thu hút họ. Phần thưởng bao gồm điểm số, huy hiệu thành tích hoặc tiền ảo để sử dụng.
					</div>
				</Col>
				<Col xs={ 12 } md={ 3 }>
					<h4>
						Comments
					</h4>
					<div className='text-left max-h-[500px] min-h-[300px]  overflow-y-auto'>
						{
							renderComment
						}

					</div>
					<div className='flex mt-2 border-t-2 px-3'>
						<div className='mt-1'>
							{
								context?.user?.avatar && <Avatar src={ context.user.avatar } size="large" />
							}

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
	)
}

export default BlogDetail;