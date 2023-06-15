import React from "react";
import { Link } from "react-router-dom";

const BlogResult = ({ blog }) => {
	return (
		<Link to={ `blog/${blog.id}` } >
			<div className="flex mb-2 w-full items-center justify-between my-hover px-2 py-1 text-black">
				{
					blog?.image && <div className="w-4/12 mr-2"><img src={ blog.image } className="w-full max-h-20 object-cover rounded-lg" alt="blog" /></div>
				}
				{
					blog?.title && <p className="w-8/12 whitespace-nowrap text-ellipsis text-lg overflow-hidden text-sm m-0">{ blog.title }</p>
				}
			</div>
		</Link>
	)
}

export default BlogResult;