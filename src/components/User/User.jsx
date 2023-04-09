import { Avatar, Popover } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const User = ({ infor, ...props }) => {
	const navigate = useNavigate();
	const handleClick = () => {
		if (infor?.id) {
			navigate(`/user/${infor.id}`);
		}
	}
	return (
		<Popover content={
			<div className="flex justify-center items-center">
				{
					infor?.avatar ?
						<Avatar src={ infor.avatar } alt="thor" size='large' />
						:
						<Avatar src="https://fullstack.edu.vn/static/media/fallback-avatar.155cdb2376c5d99ea151.jpg" alt="avatar" size='large' />
				}
				{
					(infor?.name && infor?.email) && <div className="ml-2 ">
						<p className="m-0 text-lg font-medium">
							{
								infor?.name
							}
						</p>
						<p className="m-0">
							{
								infor?.email
							}
						</p>
					</div>
				}
			</div>
		}
			{
			...props
			}
		>
			<div className="cursor-pointer" onClick={ handleClick }>
				{
					infor?.avatar ?
						<Avatar src={ infor.avatar } alt="thor" size='large' />
						:
						<Avatar src="https://fullstack.edu.vn/static/media/fallback-avatar.155cdb2376c5d99ea151.jpg" alt="avatar" size='large' />
				}
				{
					infor?.name ? <span className="ml-2">
						Thor
					</span>
						: <span className="ml-2">
							Undefined
						</span>
				}
			</div>
		</Popover>

	)
}

export default User;