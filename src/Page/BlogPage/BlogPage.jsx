import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import BlogItem from "./components/BlogItem/BlogItem";

const BlogPage = () => {
	return (
		<div className='mt-20 min-h-[630px] text-left' >

			<Container>
				<h1>
					BlogPage
				</h1>
				<Row>
					<Col xs={12}>
						<BlogItem />
					</Col>
				</Row>
			</Container>
		</div >
	)
}
export default BlogPage;