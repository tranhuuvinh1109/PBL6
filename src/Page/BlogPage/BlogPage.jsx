import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import BlogItem from "./components/BlogItem/BlogItem";
import { useNavigate } from "react-router-dom";
import { blogAPI } from "../../api/blogApi";
import { toast } from "react-hot-toast";

const BlogPage = () => {
	const [listBlog, setListBlog] = useState([]);

	const navigate = useNavigate();

	const handleClick = () => {
		navigate('create');
	};
	const getAllBlog = async () => {
		const res = await blogAPI.getAll();
		if (res.status === 200) {
			setListBlog(res.data);
		} else {
			toast.error('Get Blog Fail!');
		}
	}
	useEffect(() => {
		getAllBlog();
	}, [])

	return (
		<div className='mt-20 min-h-[630px] text-left' >
			<Container>
				<button className="btn-custom px-3 py-2 mb-4 my-btn" onClick={ handleClick }>
					Create new blog
				</button>
				<Row>
					<Col xs={ 12 }>
						{
							listBlog?.map((blog) => {
								return <BlogItem key={ blog.id } blog={ blog } />
							})
						}
					</Col>
				</Row>
			</Container>
		</div >
	)
}
export default BlogPage;