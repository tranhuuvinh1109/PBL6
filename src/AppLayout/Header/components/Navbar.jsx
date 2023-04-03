import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useContext, useMemo, useState } from 'react';
import '../../../Assets/css/Navbar.css';
import { NavLink, Link } from 'react-router-dom';
import { Avatar, Button, Dropdown, Popover, Space } from 'antd';
import { faArrowRightFromBracket, faUser, faBars, faHouse, faBlog, faAddressCard, faLightbulb } from '@fortawesome/free-solid-svg-icons'
import { AppContext } from '../../../App';
import Offcanvas from 'react-bootstrap/Offcanvas';
import MyCourseItem from './MyCourseItem';

const listNavbar = [
	{
		title: 'Home',
		path: '/',
		icon: <FontAwesomeIcon icon={faHouse} />
	},
	{
		title: 'Course',
		path: '/page/course',
		icon: <FontAwesomeIcon icon={faLightbulb} />
	},
	{
		title: 'Blog',
		path: '/page/blog',
		icon: <FontAwesomeIcon icon={faBlog} />
	},
	{
		title: 'Contact',
		path: '/page/contact',
		icon: <FontAwesomeIcon icon={faAddressCard} />
	},
]
const Navbar = ({ logo }) => {
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const toggleShow = () => setShow((s) => !s);
	const contextData = useContext(AppContext)
	const handleClickLogout = useCallback(() => {
		contextData.setUser(undefined);
		localStorage.setItem('userID', '');
	}, [contextData])

	const renderUser = useMemo(() => {
		const items = [
			{
				label: <Link to='/page/user/profile' className='no-underline '><FontAwesomeIcon icon={faUser} fontSize={16} /><span className='text-base font-semibold ml-2.5'>Profile</span></Link>,
				key: '0',
			},
			{
				label: <Link to='/login' onClick={handleClickLogout} className='no-underline '><FontAwesomeIcon icon={faArrowRightFromBracket} fontSize={16} /><span className='text-base font-semibold ml-2.5'>Logout</span></Link>,
				key: '1',
			}
		];
		if (contextData.user) {
			return (
				<div className='flex items-center'>
					<Popover placement="bottomRight" trigger="hover"
						content={
							<div className='w-[380px]'>
								<div className='flex justify-between'>
									<h6>
										My Course
									</h6>
									<Link to={'my-course'} >
										View All
									</Link>
								</div>
								<div>
									<MyCourseItem />
								</div>
							</div>
						}
					>
						<Button>My Course</Button>
					</Popover>
					<Dropdown
						menu={{
							items,
						}}
						trigger={['click']}
					>
						<Space>
							<div className='p-1 rounded-full cursor-pointer hover:opacity-80 hidden lg:block'>
								{
									contextData.user?.avatar ? <Avatar size='large' src={contextData?.user.avatar} alt='avatar' />
										:
										<Avatar src="https://fullstack.edu.vn/static/media/fallback-avatar.155cdb2376c5d99ea151.jpg" size='large' alt="avtar" />
								}

							</div>
						</Space>
					</Dropdown>
				</div>

			)
		} else {
			return (
				<button className='btn-custom'
					onClick={handleClickLogout}
				>
					<Link to="/login" className='no-underline '>Login</Link>
				</button>
			)
		}
	}, [contextData, handleClickLogout])

	return (
		<header className='nav-header'>
			<a href='/'>
				<img src={logo} className='w-[170px]' alt='logo' />
			</a>
			<nav className='nav-nav'>
				{
					listNavbar.map((item, index) => {
						return (
							<NavLink
								to={item.path}
								key={index}
								className={({ isActive }) =>
									isActive ? "link-item active-item" : "link-item"
								}
							>
								{item.icon}
								<span className='ml-2'>
									{item.title}
								</span>
							</NavLink>
						)
					})
				}
			</nav>
			<button onClick={toggleShow} className='lg:hidden float-right'>
				<FontAwesomeIcon icon={faBars} />
			</button>
			{
				renderUser
			}
			<Offcanvas show={show} onHide={handleClose}>
				<Offcanvas.Header closeButton>
					<Offcanvas.Title></Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					<div>
						<img src='https://danviet.mediacdn.vn/296231569849192448/2022/7/10/1657467881994186713673-0-0-1250-2000-crop-16574679259871419731430.jpg' alt='avatar' className='w-16 h-16 rounded-full' />
						<Link to='/page/user/profile'>
							<h4 className='mt-2'>
								Tran Huu Vinh
							</h4>
						</Link>
					</div>
					<div className='flex flex-col justify-between'>
						<div className='flex flex-col mt-3'>
							{
								listNavbar.map((item, index) => {
									return (
										<NavLink
											to={item.path}
											key={index}
											className={({ isActive }) =>
												isActive ? "link-item active-item" : "link-item"
											}
										>
											{item.icon}
											<span className='ml-3'>
												{item.title}
											</span>
										</NavLink>
									)
								})
							}
						</div>
						<button onClick={handleClickLogout}>
							<Link to='/login'>
								<FontAwesomeIcon icon={faArrowRightFromBracket} />
								<span>
									Logout
								</span>
							</Link>

						</button>
					</div>
				</Offcanvas.Body>
			</Offcanvas>

		</header>
	)
}
export default Navbar;