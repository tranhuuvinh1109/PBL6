import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import BlogItem from "./components/BlogItem/BlogItem";
import { useNavigate } from "react-router-dom";

const BlogPage = () => {

	const navigate = useNavigate();

	const handleClick = () => {
		navigate('create');
	};

	return (
		<div className='mt-20 min-h-[630px] text-left' >

			<Container>
				<h1>
					BlogPage
				</h1>
				<button className="btn-custom px-3 py-2 mb-4" onClick={ handleClick }>
					+ add blog
				</button>
				<Row>
					<Col xs={ 12 }>
						<BlogItem />
						<BlogItem />
					</Col>
				</Row>
			</Container>
		</div >
	)
}
export default BlogPage;