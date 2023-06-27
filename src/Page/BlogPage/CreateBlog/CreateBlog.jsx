import React, { useEffect, useState, useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ReactQuill from "react-quill";
import parse from 'html-react-parser';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import { AppContext } from "../../../App";
import { blogAPI } from "../../../api/blogApi";
import { toast } from "react-hot-toast";
import uploadFileWithProgress from "../../../Firebase/uploadFileWithProgress";
import ProgressUpload from "../../../Admin/components/ProgressUpload/ProgressUpload";
import { useNavigate } from "react-router-dom";
import { EnCodeBase64 } from "../../../hook/EnCodeBase64";

const CreateBlog = () => {
	const navigate = useNavigate();
	const context = useContext(AppContext);
	const [progress, setProgress] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [selectedFile, setSelectedFile] = useState();
	const [content, setContent] = useState();
	const [blog, setBlog] = useState({
		title: '',
		image: '',
		content: '',
	});

	const handleChange = (e) => {
		setBlog({ ...blog, [e.target.name]: e.target.value });
	};


	const handleSubmit = async (data) => {
		setIsLoading(true);
		if (data) {
			const uploadImagePromise = await uploadFileWithProgress(
				selectedFile,
				'images/blog',
				`${blog.title}${new Date().getTime()}`,
				setProgress
			);
			if (uploadImagePromise) {
				const today = new Date();
				const year = today.getFullYear();
				const month = (today.getMonth() + 1).toString().padStart(2, '0');
				const day = today.getDate().toString().padStart(2, '0');
				console.log('blog', EnCodeBase64({
					title: blog.title,
					image: uploadImagePromise,
					content: content,
					creator: context.user.id,
					created_at: `${year}-${month}-${day}`
				}))
				const res = await blogAPI.createBlogGet(encodeURIComponent(EnCodeBase64({
					creator: context?.user?.id,
					title: blog.title,
					image: uploadImagePromise,
					content: content
					// created_at: `${year}-${month}-${day}`
				})));
				if (res.status === 200) {
					toast.success("Create Blog Success");
					navigate('/blog');
				} else {
					toast.error("Create Blog Fail");
				}
			} else {
				toast.error("Create Blog Fail");
			}
		}
		setIsLoading(false);
	}
	const handleChangeFile = (e) => {
		const file = e.target.files[0];
		file.preview = URL.createObjectURL(file);
		setSelectedFile(file);
	}
	useEffect(() => {
		return () => {
			selectedFile && URL.revokeObjectURL(selectedFile.preview);
		}
	}, [selectedFile])

	return (
		<Container className="mt-20">
			<Row>
				<Col xs={ 6 } className="text-left min-h-[480px]">
					<div>
						<input type="text" className="border-input rounded-2xl py-2 px-4 w-full" placeholder="Title" name="title" value={ blog.title } onChange={ handleChange } />
					</div>
					<div className="mt-8">
						<label htmlFor="image" className="cursor-pointer p-4 border-red-400 text-red-400 border-2 border-solid rounded-2xl hover:text-red-600 hover:border-red-600">
							<FontAwesomeIcon icon={ faUpload } className="mr-2" /> Choose file to upload
						</label>
						<input type="file" accept=".png, .jpg, .jpeg" name="image" id="image" className="hidden" onChange={ handleChangeFile } />
					</div>
					<div className="mt-8">
						<ReactQuill theme="snow" value={ content }
							placeholder="Write content at here"
							className="rounded-2xl"
							onChange={ (e) => {
								setContent(e);
							} }
						/>
					</div>
					<button className="btn-custom px-3 py-1 mt-8 my-btn" onClick={ handleSubmit }>
						Done
					</button>
				</Col>
				<Col xs={ 6 } className="text-left">
					<h5>
						Preview blog
					</h5>
					<div className="mt-2 border-2 border-solid rounded-xl p-2 w-full min-h-[150px]">
						{
							blog?.title ? <h5 className="text-lg font-medium">
								{
									blog.title
								}
							</h5>
								:
								<h5 className="text-lg font-medium">
									Title
								</h5>
						}
						<div className="image-preview w-full max-h-96 min-h-60">
							{
								selectedFile && <div id="imagePreview" style={ { backgroundImage: `url(${selectedFile.preview})` } }>
									<button className="btn-x px-2 py-1.5"
										onClick={ () => {
											setSelectedFile({ ...selectedFile, preview: '' })
										} }
									>
										<FontAwesomeIcon icon={ faCircleXmark } fontSize={ 18 } className="text-slate-500 hover:text-slate-600" />
									</button>
								</div>
							}
						</div>
						{
							content ? <div className="mt-2">
								{
									parse(content)
								}
							</div>
								:
								<p className="mt-2">
									Content
								</p>
						}
					</div>
				</Col>
			</Row>
			{
				isLoading && <ProgressUpload progress={ progress } />
			}
		</Container>
	)
}

export default CreateBlog;