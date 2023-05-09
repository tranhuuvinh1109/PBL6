import React from "react";

const BlogItem = () => {
	return (
		<div className="flex blog-item">
			<div className="w-4/12 blog-item-img">
				<img src='https://files.fullstack.edu.vn/f8-prod/courses/12.png' alt="blogItem" />
			</div>
			<div className="w-8/12 blog-item-content">
				<div className="blog-item-text">
					<h6 className="m-0">Responsive</h6>
					<p className="m-0">
						this is Responsive this is Responsive this is Responsive this is Responsive this is Responsive
					</p>
				</div>
			</div>
		</div>
	)
}
export default BlogItem;