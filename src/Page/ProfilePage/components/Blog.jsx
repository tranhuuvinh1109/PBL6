import React from "react";
import BlogItem from "./BlogItem";
import { useContext } from "react";
import { AppContext } from "../../../App";

const Blog = () => {
	const context = useContext(AppContext);
	console.log('blog', context?.user?.listBlogs)
	return (
		<div className='text-left'>
			<div className="w-1/2">
				{
					context.user.listBlogs.map((blog) => {
						return <BlogItem key={ blog.id } blog={ blog } />
					})
				}
			</div>
		</div>
	)
}

export default Blog;