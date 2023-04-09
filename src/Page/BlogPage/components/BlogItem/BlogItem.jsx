import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import User from "../../../../components/User/User";
import { AppContext } from "../../../../App.js";

const BlogItem = () => {
	const context = useContext(AppContext)
	return (
		<div className="p-6 rounded-2xl border-2 border-slate-300 border-solid mb-4">
			<div className="flex items-center justify-between">
				<User infor={ context.user } placement="bottom" trigger='hover' />
				<FontAwesomeIcon icon={ faBookmark } fontSize={ 18 } className="py-0.5 px-1 hover:text-slate-400  cursor-pointer" />
			</div>
			<div>
				<div className="flex">
					<div className="w-9/12">
						<Link to={ `/blog/1` }>
							<h3>
								Learn JavaScript while Playing Games — Gamify Your Learning
							</h3>
						</Link>
						<p className="whitespace-nowrap text-ellipsis overflow-hidden">
							Learn JavaScript while Playing Games — Gamify Your Learning Learn JavaScript while Playing Games — Gamify Your Learning Learn JavaScript while Playing Games — Gamify Your Learning Learn JavaScript while Playing Games — Gamify Your Learning Learn JavaScript while Playing Games — Gamify Your Learning Learn JavaScript while Playing Games — Gamify Your Learning
						</p>
						<p>14 ngày trước</p>
					</div>
					<div className="w-3/12 ">
						<img src="https://danviet.mediacdn.vn/296231569849192448/2022/7/10/1657467881994186713673-0-0-1250-2000-crop-16574679259871419731430.jpg" alt="blog" className="w-52 rounded-2xl float-right" />
					</div>
				</div>

			</div>
		</div>
	)
}

export default BlogItem;