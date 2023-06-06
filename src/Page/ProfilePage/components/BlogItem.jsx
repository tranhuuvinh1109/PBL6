import React from "react";

const BlogItem = ({ blog }) => {
	return (
		<div className="flex blog-item">
			<div className="w-4/12 blog-item-img">
				{
					blog?.image ? <img src={ blog.image } alt='blog' />
						:
						<img src='https://files.fullstack.edu.vn/f8-prod/courses/12.png' alt="blogItem" />
				}
			</div>
			<div className="w-8/12 blog-item-content">
				<div className="blog-item-text w-full">
					<h6 className="m-0">
						{
							blog?.title
						}</h6>
					<p className="m-0 text-ellipsis whitespace-nowrap w-full overflow-hidden">
						{
							blog?.content
						}
					</p>
				</div>
			</div>
		</div>
	)
}
export default BlogItem;