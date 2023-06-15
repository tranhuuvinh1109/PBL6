import React, { useMemo } from "react";
import BlogItem from "./BlogItem";
import { useContext } from "react";
import { AppContext } from "../../../App";

const Blog = () => {
	const context = useContext(AppContext);
	const renderBlog = useMemo(() => {
		return context.user.blogs.map((blog) => {
			return <BlogItem key={ blog.id } blog={ blog } />
		})
	}, [context?.user?.blogs])
	return (
		<div className='text-left'>
			<div className="w-1/2 profile-tab">
				{
					renderBlog
				}
			</div>
		</div>
	)
}

export default Blog;