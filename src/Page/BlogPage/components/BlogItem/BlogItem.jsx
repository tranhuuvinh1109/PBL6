import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import React from "react";
import { Link } from "react-router-dom";
import User from "../../../../components/User/User";
import parse from 'html-react-parser';

const BlogItem = ({ blog }) => {
	console.log('..', blog)
	const today = new Date();
	const createAt = new Date(blog?.created_at);
	const timeDiff = Math.abs(today - createAt);
	const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
	return (
		<div className="p-6 rounded-2xl border-2 border-slate-300 border-solid mb-4">
			<div className="flex items-center justify-between mb-4">
				<User infor={ blog?.user } placement="bottom" trigger='hover' />
				<FontAwesomeIcon icon={ faBookmark } fontSize={ 18 } className="py-0.5 px-1 hover:text-slate-400  cursor-pointer" />
			</div>
			<div>
				<div className="flex">
					<div className="w-9/12">
						<Link to={ `/blog/${blog.id}` } className="text-black">
							{
								blog?.title && <h3>{ blog.title }</h3>
							}
						</Link>
						{
							blog?.content && <p className="whitespace-nowrap text-ellipsis overflow-hidden">{ parse(blog.content) }</p>
						}
						<p>{ diffDays } days ago</p>
					</div>
					<div className="w-3/12 ">
						{
							blog?.image && <img src={ blog.image } alt="blog" className="w-52 rounded-2xl float-right" />
						}
					</div>
				</div>

			</div>
		</div>
	)
}

export default BlogItem;