import React, { useEffect, useState, useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ReactQuill from "react-quill";
import parse from 'html-react-parser';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import { AppContext } from "../../../App";
import { blogAPI } from "../../../api/blogApi";
import { toast } from "react-hot-toast";

const CreateBlog = () => {
	const context = useContext(AppContext);
	const [selectedFile, setSelectedFile] = useState();
	const [description, setDescription] = useState();
	const [blog, setBlog] = useState({
		title: '',
		image: '',
		description: '',
	});

	const handleChange = (e) => {
		setBlog({ ...blog, [e.target.name]: e.target.value });
	};


	const handleSubmit = async (data) => {
		if (data) {
			const params = {
				title: blog.title,
				image: 'none',
				description: blog.description,
				creator: context.user.id,
			}
			const res = await blogAPI.createBlog(params);
			if (res.status === 201) {
				toast.success("Create Blog Success")
			} else {
				console.log('fail', res.data);
				toast.error("Create Blog Fail")
			}
		}
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
						<ReactQuill theme="snow" value={ description }
							placeholder="Write content at here"
							className="rounded-2xl"
							onChange={ (e) => {
								setDescription(e);
							} }
						/>
					</div>
					<button className="btn-custom px-3 py-1 mt-8" onClick={ handleSubmit }>
						done
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
							description ? <div className="mt-2">
								{
									parse(description)
								}
							</div>
								:
								<p className="mt-2">
									Description
								</p>
						}
					</div>
				</Col>
			</Row>
		</Container>
	)
}

export default CreateBlog;