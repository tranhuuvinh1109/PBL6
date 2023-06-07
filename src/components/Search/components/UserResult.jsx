import { Avatar } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const UserResult = ({ user }) => {
	return (
		<Link to={ `user/${user.user_id}` }>
			<div className="flex mb-2 w-full items-center my-hover px-2 py-1 text-black">
				{
					user?.avatar ? <Avatar src={ user.avatar } size="large" />
						:
						<Avatar src='https://fullstack.edu.vn/static/media/fallback-avatar.155cdb2376c5d99ea151.jpg' size="large" />
				}
				<div className="ml-2 flex flex-col justify-between">
					{
						user?.fullname && <h6 className="m-0 font-semibold">{ user.fullname }</h6>
					}
					{
						user?.email && <h6 className="text-sm italic m-0 text-slate-600">{ user.email }</h6>
					}
				</div>
			</div>
		</Link>
	)
}

export default UserResult;