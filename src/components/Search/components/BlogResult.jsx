import React from "react";
import { Link } from "react-router-dom";

const BlogResult = ({ blog }) => {
	return (
		<div className="flex mb-2 w-full items-center justify-between my-hover px-2 py-1">
			{
				blog?.image && <Link to={ `blog/${blog.blog_id}` } className="w-6/12 mr-2"><img src={ blog.image } className="w-full max-h-20 object-cover rounded-lg" alt="blog" /></Link>
			}
			{
				blog?.title && <p className="whitespace-nowrap text-ellipsis text-lg overflow-hidden text-sm m-0">{ blog.title }</p>
			}

		</div>
	)
}

export default BlogResult;