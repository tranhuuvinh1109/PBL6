import React, { useContext, useMemo, useState } from "react";
import { AppContext } from "../../App.js";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faUser, faChalkboardUser, faBlog } from "@fortawesome/free-solid-svg-icons";
import './style.css';
import Blog from "./components/Blog.jsx";
import About from "./components/About.jsx";
import Course from "./components/Course.jsx";
const items = [
	{
		key: 0,
		label: `About`,
		icon: <FontAwesomeIcon icon={ faUser } />,
		children: <About />,
	},
	{
		key: 1,
		label: `Course`,
		icon: <FontAwesomeIcon icon={ faChalkboardUser } />,
		children: <Course />,
	},
	{
		key: 2,
		label: `Blog`,
		icon: <FontAwesomeIcon icon={ faBlog } />,
		children: <Blog />,
	},
];

const ProfilePage = () => {
	const context = useContext(AppContext);
	const [value, setValue] = useState(0);
	console.log(context?.user)
	const renderTab = useMemo(() => {
		const actived = items.filter(item => item.key === value);
		return actived[0].children;
	}, [value]);
	return (
		<Container>
			<Row>
				<Col xs={ 12 } md={ 4 }>
					<div className="pr-4">
						<div className="user-avatar-profile">
							{
								context?.user?.avatar && <img src={ context.user.avatar } alt="user" />
							}

						</div>
						<div className="flex">
							<span>Work</span><div className="flex-1 lineCustom"></div>
						</div>
						<div>
							<h6 className="text-left">
								Danang University
							</h6>
						</div>
					</div>
				</Col>
				<Col xs={ 12 } md={ 8 }>
					<div className="wrapper-user">
						<h6>
							{
								context?.user?.username
							}
						</h6>
						<div>
							<button className="btn-send">
								<FontAwesomeIcon icon={ faMessage } />
								<span className="ml-2 text-base">
									Send message
								</span>
							</button>
						</div>
					</div>
					<div>
						<div className="tab-bar">
							{
								items.map((item) => {
									return (
										<button key={ item.key } onClick={ () => setValue(item.key) } className={ item.key === value ? 'font-medium item-tab item-tab-active' : 'item-tab' }>
											{ item.icon } <span>
												{ item.label }
											</span>
										</button>
									)
								})
							}
						</div>
						<div className="mt-10 tab-content">
							{
								renderTab
							}
						</div>
					</div>
				</Col>
			</Row>


		</Container>
	)
}

export default ProfilePage;