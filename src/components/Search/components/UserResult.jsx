import { Avatar } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const UserResult = ({ user }) => {
	return (
		<div className="flex mb-2 w-full items-center">
			{
				user?.avatar ? <Link to={ `user/${user.user_id}` }><Avatar src={ user.avatar } size="large" /></Link>
					:
					<Link to={ `user/${user.user_id}` }><Avatar src='https://fullstack.edu.vn/static/media/fallback-avatar.155cdb2376c5d99ea151.jpg' size="large" /></Link>
			}
			<div className="ml-2">
				{
					user?.fullname && <h6>{ user.fullname }</h6>
				}
				{
					user?.email && <h6 className="text-sm">{ user.email }</h6>
				}
			</div>
		</div>
	)
}

export default UserResult;