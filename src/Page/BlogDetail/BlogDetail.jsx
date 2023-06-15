import { Avatar, Divider } from "antd";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faPaperPlane, faPenToSquare, faTrash, faEllipsis } from "@fortawesome/free-solid-svg-icons"
import { Container, Row, Col } from "react-bootstrap";
import CommentItem from "../../components/CommentItem/CommentItem";
import { authAPI } from "../../api/authApi";
import { db } from "../../Firebase/firebaseClient";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../App";
import { blogAPI } from "../../api/blogApi";
import { toast } from "react-hot-toast";
import { Popover, Modal } from 'antd';
import parse from 'html-react-parser';
import Loading from "../../components/Loading/Loading";
import EditBlog from "./components/EditBlog/EditBlog";

const BlogDetail = () => {
	const context = useContext(AppContext);
	const navigate = useNavigate();
	const { id } = useParams();
	const [isLoading, setIsLoading] = useState(false);
	const [isOpenDelete, setIsOpenDelete] = useState(false);
	const [isOpenEdit, setIsOpenEdit] = useState(false);
	const [dataBlog, setDataBlog] = useState({});
	const [comments, setComments] = useState([]);
	const [diffDays, setDiffDays] = useState(0);
	const [commentsData, setCommentsData] = useState([]);
	const [contentComment, setContentComment] = useState('');


	const showModalEdit = () => {
		setIsOpenEdit(true);
	};
	const handleOkEdit = () => {
		setIsOpenEdit(false);
	};
	const handleCancelEdit = () => {
		setIsOpenEdit(false);
	};
	const showModalDelete = () => {
		setIsOpenDelete(true);
	};
	const handleOkDelete = () => {
		deleteBlog(id);
		setIsOpenDelete(false);
	};
	const handleCancelDelete = () => {
		setIsOpenDelete(false);
	};

	const handleChange = (e) => {
		setContentComment(e.target.value)
	};

	const deleteBlog = async (id) => {
		const res = await blogAPI.deleteBlog(id);
		if (res.status === 200) {
			toast.success('Delete blog successfully');
			navigate(`/blog`);
		} else {
			toast.error('Delete blog failed');
		}
	}
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
	const getBlogDetail = useCallback(async (id) => {
		setIsLoading(true);
		const res = await blogAPI.getBlogDetail(id);
		if (res.status === 200) {
			setDataBlog(res.data.data);
			const today = new Date();
			const createAt = new Date(res.data?.created_at);
			const timeDiff = Math.abs(today - createAt);
			setDiffDays(Math.ceil(timeDiff / (1000 * 3600 * 24)));
		} else {
			toast.error(`Get Blog Has Id: ${id} fails!`);
		}
		setIsLoading(false);
	}, [])

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
		getBlogDetail(id);
	}, [getBlogDetail, id])

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

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	return (
		<>
			{
				isLoading ? <Loading />
					:
					<Container className="text-left">
						<Row>
							<Col xs={ 12 } md={ 9 }>
								<div className="flex justify-between items-center">
									<h4 className="text-4xl font-bold m-0">
										{
											dataBlog?.title
										}
									</h4>
									{
										context?.user?.id === dataBlog?.user?.id && <Popover trigger="click" placement="bottomRight"
											content={
												<div className="flex flex-col ">
													<button className="text-left p-2.5 my-hover" onClick={ showModalEdit }>
														<FontAwesomeIcon icon={ faPenToSquare } /> <span className="ml-2 font-medium">Edit Blog</span>
													</button>
													<Divider className="m-0" />
													<button className="text-left p-2.5 my-hover trash" onClick={ showModalDelete }>
														<FontAwesomeIcon icon={ faTrash } /> <span className="ml-2 font-medium">Delete Blog</span>
													</button>
												</div>
											}
										>
											<button className="p-2 hover:text-slate-400" title="Option">
												<FontAwesomeIcon icon={ faEllipsis } fontSize={ 18 } />
											</button>
										</Popover>
									}

								</div>

								<div className="flex justify-between items-center mt-2">
									<div className="flex">
										{
											dataBlog?.user?.avatar && <Avatar src={ dataBlog.user.avatar } size="large" />
										}
										<div className="ml-2">
											<p className="m-0 font-semibold">
												{
													dataBlog?.user?.fullName
												}
											</p>
											<p className="m-0">
												{ diffDays } days ago
											</p>
										</div>
									</div>
									<FontAwesomeIcon icon={ faBookmark } className="text-xl" />
								</div>
								<div className="mt-3 flex justify-center items-center">
									{
										dataBlog?.image && <img src={ dataBlog.image } className="w-full md:w-8/12" alt="blog" />
									}
								</div>
								<div className="mt-4">
									{
										dataBlog?.content && parse(dataBlog?.content)
									}
								</div>
							</Col>
							<Col xs={ 12 } md={ 3 } className="line-divider">
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
						<Modal title="Delete blog" open={ isOpenDelete } onOk={ handleOkDelete } onCancel={ handleCancelDelete } zIndex={ 100000 }>
							<div className="min-h-[80px] flex justify-center items-center">
								<h4 className="m-0">
									Are you sure you want to delete this blog?
								</h4>
							</div>
						</Modal>
						<Modal footer={ null } title="Edit Blog" open={ isOpenEdit } onOk={ handleOkEdit } onCancel={ handleCancelEdit } zIndex={ 100001 } width={ 800 }>
							<div>
								<EditBlog id={ id } />
							</div>
						</Modal>
					</Container>
			}
		</>
	)
}

export default BlogDetail;