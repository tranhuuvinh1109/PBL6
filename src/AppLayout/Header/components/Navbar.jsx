import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useContext, useMemo, useState } from 'react';
import '../../../Assets/css/Navbar.css';
import { NavLink, Link } from 'react-router-dom';
import { Avatar, Button, Divider, Dropdown, Popover, Space } from 'antd';
import { faArrowRightFromBracket, faUser, faBars, faHouse, faBlog, faLightbulb } from '@fortawesome/free-solid-svg-icons'
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
]
const Navbar = ({ logo }) => {
	const [show, setShow] = useState(false);
	const [searchValue, setSearchValue] = useState('');
	const handleClose = () => setShow(false);
	const toggleShow = () => setShow((s) => !s);
	const contextData = useContext(AppContext)
	const handleClickLogout = useCallback(() => {
		contextData.setUser(undefined);
		localStorage.setItem('userID', '');
	}, [contextData]);

	const handleChange = (e) => {
		e.preventDefault();
		setSearchValue(e.target.value);
	}

	const renderUserMobile = useMemo(() => {
		if (contextData.user) {
			return (
				<>
					<div>
						{
							contextData.user?.avatar ? <img src={contextData.user.avatar} alt='avatar' className='w-16 h-16 rounded-full' />
								:
								<img src='https://fullstack.edu.vn/static/media/fallback-avatar.155cdb2376c5d99ea151.jpg' alt='avatar' className='w-16 h-16 rounded-full' />
						}

						<h4 className='mt-2 text-xl'>
							Tran Huu Vinh
						</h4>
					</div>
					<Divider className='m-0' />
				</>
			);
		}
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
								<div className='max-h-[490px] overflow-y-auto'>
									<MyCourseItem />
									<MyCourseItem />
									<MyCourseItem />
									<MyCourseItem />
									<MyCourseItem />
									<MyCourseItem />
									<MyCourseItem />
								</div>
							</div>
						}
					>
						<Button className='btn-hidden'>My Course</Button>
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
				<button className='btn-custom px-2 py-1' onClick={handleClickLogout}>
					<Link to="/login" className='no-underline '>Login</Link>
				</button>
			)
		}
	}, [contextData, handleClickLogout])

	return (
		<header className='nav-header'>
			<button onClick={toggleShow} className='lg:hidden float-right px-2 py-1.5'>
				<FontAwesomeIcon icon={faBars} />
			</button>
			<a href='/' className='logo-customize'>
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
			<div className='search-wrapper'>
				<div className='search-icon'>
				</div>
				<input type='text' placeholder='search course, video, blog,...' className='search-input-nav' value={searchValue} onChange={handleChange} />
			</div>
			{
				renderUser
			}
			<Offcanvas show={show} onHide={handleClose}>
				<Offcanvas.Header closeButton>
					<Offcanvas.Title></Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					{
						renderUserMobile
					}
					<div className='flex flex-col justify-between'>
						<Link to='/page/user/profile' className='link-item m-0'>
							<FontAwesomeIcon icon={faUser} />
							<span className='ml-3'>
								Profile
							</span>
						</Link>
						<Link to='/page/user/profile' className='link-item m-0'>
							<FontAwesomeIcon icon={faLightbulb} />
							<span className='ml-3'>
								My Course
							</span>
						</Link>
					</div>
					<Divider className='m-0' />
					<div className='flex flex-col justify-between'>
						<div className='flex flex-col mt-3'>
							{
								listNavbar.map((item, index) => {
									return (
										<NavLink
											to={item.path}
											key={index}
											className={({ isActive }) =>
												isActive ? "link-item m-0 active-item" : "link-item m-0"
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
						<Divider className='m-0' />
						<button onClick={handleClickLogout} className='px-3 py-2.5 w-full text-left'>
							<Link to='/login' className='no-underline text-zinc-400 font-semibold w-full'>
								<FontAwesomeIcon icon={faArrowRightFromBracket} />
								<span className='ml-3'>
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