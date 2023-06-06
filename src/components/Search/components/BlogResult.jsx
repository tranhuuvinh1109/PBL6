import React from "react";
import { Link } from "react-router-dom";

const BlogResult = ({ blog }) => {
	return (
		<div className="flex mb-2 w-full items-center">
			{
				blog?.image && <Link to={ `blog/${blog.blog_id}` }><img src={ blog.image } alt="blog" /></Link>
			}
			{
				blog?.title && <h6>{ blog.title }</h6>
			}
		</div>
	)
}

export default BlogResult;