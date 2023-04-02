import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

const CreateBlog = () => {
	const [selectedFile, setSelectedFile] = useState();
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
				<Col xs={6}>
					<label htmlFor="title">Title :</label>
					<input type="text" id="title" name="title" value={blog.title} onChange={handleChange} />
					<label htmlFor="image">Image :</label>
					<input type="file" name="image" onChange={handleChangeFile} />
					<label htmlFor="description">Description :</label>
					<input type="text" name="description" id="description" value={blog.description} onChange={handleChange} />
					<button className="btn-custom px-3 py-1" onClick={() => {
						setSelectedFile({ ...selectedFile, preview: '' })
						console.log(blog)
					}}>
						done
					</button>
				</Col>
				<Col xs={6} className="text-left">
					<h5>
						Preview blog
					</h5>
					<div className="mt-2 border-2 border-solid rounded-xl p-2 w-full">
						{
							blog?.title && <h5 className="text-lg font-medium">
								{
									blog.title
								}
							</h5>
						}
						{
							selectedFile?.preview && <img src={selectedFile.preview} alt="selected" className="mt-2 rounded-xl" />
						}
						{
							blog?.description && <p className="mt-2">
								{
									blog.description
								}
							</p>
						}
					</div>
				</Col>
			</Row>
		</Container>
	)
}

export default CreateBlog;