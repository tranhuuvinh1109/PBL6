import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ReactQuill from "react-quill";
import parse from 'html-react-parser';

const CreateBlog = () => {
	const [selectedFile, setSelectedFile] = useState();
	const [description, setDescription] = useState();
	const [blog, setBlog] = useState({
		title: '',
		image: '',
		description: '',
	});

	const handleChange = (e) => {
		setBlog({ ...blog, [e.target.name]: e.target.value });
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
		<Container>
			<Row>
				<Col xs={ 6 } className="text-left">
					<div>
						<label htmlFor="title" className="w-4/12">Title :</label>
						<input type="text" className="border-input w-8/12" id="title" name="title" value={ blog.title } onChange={ handleChange } />
					</div>
					<div>
						<label htmlFor="image" className="w-4/12">Image :</label>
						<input type="file" name="image" className="w-8/12" onChange={ handleChangeFile } />
					</div>
					<div>
						<label htmlFor="description" className="w-4/12">Description :</label>
						<ReactQuill theme="snow" value={ description }
							onChange={ (e) => {
								setDescription(e);
							} }
						/>
					</div>
					<button className="btn-custom px-3 py-1" onClick={ () => {
						setSelectedFile({ ...selectedFile, preview: '' })
						console.log(blog)
					} }>
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
						{
							selectedFile?.preview && <img src={ selectedFile.preview } alt="selected" className="mt-2 rounded-xl" />
						}
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