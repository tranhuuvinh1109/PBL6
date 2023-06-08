import React, { useContext, useMemo, useState, useCallback, useEffect, createContext } from "react";
import { AppContext } from "../../App.js";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faUser, faChalkboardUser, faBlog, faLocationDot, faPencil } from "@fortawesome/free-solid-svg-icons";
import './style.css';
import Blog from "./components/Blog.jsx";
import About from "./components/About.jsx";
import Course from "./components/Course.jsx";
import ProgressUpload from "../../Admin/components/ProgressUpload/ProgressUpload.js";

export const ProfileContext = createContext({});

const ProfilePage = () => {
	const context = useContext(AppContext);
	const [value, setValue] = useState(0);
	const [progress, setProgress] = useState(0);
	const [avatar, setAvatar] = useState({ preview: '' });
	const [isLoading, setIsLoading] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const [dataProfile, setDataProfile] = useState({});
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

	const renderTab = useMemo(() => {
		const actived = items.filter(item => item.key === value);
		return actived[0].children;
	}, [value]);

	const handleChangeAvatar = useCallback((e) => {
		const file = e.target.files[0];
		file.preview = URL.createObjectURL(file);
		setAvatar(file);
	}, []);

	const renderAvatar = useMemo(() => {
		return (
			<div className="user-avatar-profile relative">
				{
					avatar && <img src={ avatar.preview } alt="user" />
				}
				{
					isEdit && <>
						<label htmlFor="avatar" className="icon-edit-avatar"><FontAwesomeIcon icon={ faPencil } /></label>
						<input type='file' id='avatar' name='avatar' className="hidden" onChange={ handleChangeAvatar } />
					</>
				}
			</div>
		)
	}, [avatar, isEdit])

	useEffect(() => {
		if (context?.user?.avatar) {
			setAvatar({ ...avatar, preview: context.user.avatar });
		}
		setDataProfile(context?.user);
	}, [context?.user])
	return (
		<ProfileContext.Provider value={ { isLoading, isEdit, setIsLoading, setIsEdit, dataProfile, setDataProfile, avatar, progress, setProgress } }>
			{
				isLoading ? <ProgressUpload progress={ progress } />
					: <Container>
						<Row>
							<Col xs={ 12 } md={ 4 }>
								<div className="pr-4">
									{
										renderAvatar
									}
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
									<div className="flex">
										<h6 className="m-0 text-base">
											{
												context?.user?.username
											}
										</h6>
										<span className="ml-4 text-base">
											<FontAwesomeIcon icon={ faLocationDot } className="mr-1" />
											{
												context?.user?.address
											}
										</span>
									</div>
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
			}
		</ProfileContext.Provider>

	)
}

export default ProfilePage;