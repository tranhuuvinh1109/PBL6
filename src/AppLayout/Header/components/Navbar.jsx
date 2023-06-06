import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useContext, useMemo, useState } from 'react';
import '../../../Assets/css/Navbar.css';
import { NavLink, Link } from 'react-router-dom';
import { Avatar, Button, Divider, Popover } from 'antd';
import { faArrowRightFromBracket, faUser, faBars, faHouse, faBlog, faLightbulb, faBookmark, faChartLine } from '@fortawesome/free-solid-svg-icons'
import { AppContext } from '../../../App';
import Offcanvas from 'react-bootstrap/Offcanvas';
import MyCourseItem from './MyCourseItem';
import Search from '../../../components/Search/Search';

const listNavbar = [
	{
		title: 'Home',
		path: '/',
		icon: <FontAwesomeIcon icon={ faHouse } />
	},
	{
		title: 'Course',
		path: '/course',
		icon: <FontAwesomeIcon icon={ faLightbulb } />
	},
	{
		title: 'Blog',
		path: '/blog',
		icon: <FontAwesomeIcon icon={ faBlog } />
	},
]
const Navbar = ({ logo }) => {
	const [show, setShow] = useState(false);
	const contextData = useContext(AppContext);

	const handleClickLogout = useCallback(() => {
		contextData.setUser(undefined);
		contextData.setIsAdmin(false);
		localStorage.setItem('userID', '');
	}, [contextData]);
	const handleClose = () => setShow(false);
	const toggleShow = () => setShow((s) => !s);

	const renderUserMobile = useMemo(() => {
		if (contextData.user) {
			return (
				<>
					<div>
						{
							contextData.user?.avatar ? <img src={ contextData.user.avatar } alt='avatar' className='w-16 h-16 rounded-full' />
								:
								<img src='https://fullstack.edu.vn/static/media/fallback-avatar.155cdb2376c5d99ea151.jpg' alt='avatar' className='w-16 h-16 rounded-full' />
						}
						{
							contextData.user?.username && <h4 className='mt-2 text-xl'>
								{
									contextData.user?.username
								}
							</h4>
						}
					</div>
					<Divider className='m-0' />
				</>
			);
		}
	}, [contextData]);

	const renderUser = useMemo(() => {
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
									<Link to={ 'my-course' } >
										View All
									</Link>
								</div>
								<div className='max-h-[490px] overflow-y-auto'>
									{
										contextData?.listCourse?.map((e, index) => {
											return (
												<MyCourseItem course={ e } key={ index } />
											)
										})
									}
								</div>
							</div>
						}
					>
						<Button className='btn-hidden'>My Course</Button>
					</Popover>
					<Popover placement="bottomRight" trigger="click"
						content={
							<div className='px-6 py-2'>
								<div>
									<div className='flex justify-center  items-center pt-2 pb-3'>
										{
											contextData.user?.avatar ? <img className='w-14 h-14 object-cover rounded-full mr-1.5' src={ contextData?.user.avatar } alt='avatar' />
												:
												<img src="https://fullstack.edu.vn/static/media/fallback-avatar.155cdb2376c5d99ea151.jpg" className='w-14 h-14 object-cover rounded-full mr-1.5' alt="avtar" />
										}
										<div>
											{
												contextData.user?.username && <h6 className='m-0'>{ contextData.user.username }</h6>
											}
											{
												contextData.user?.email && <span>{ contextData.user.email }</span>
											}
										</div>
									</div>
									<Divider className='m-0' />
									<Link to='/user/profile' className='no-underline '><p className='py-2.5 m-0 text-slate-400 hover:text-slate-600'><FontAwesomeIcon icon={ faUser } fontSize={ 16 } /><span className='text-base font-semibold ml-2.5'>Profile</span></p></Link>
									<Divider className='m-0' />
									{
										(contextData.user.role === 0 || contextData.user.role === 1) && <>
											<Link to='/admin' className='no-underline '><p className='py-2.5 m-0 text-slate-400 hover:text-slate-600'><FontAwesomeIcon icon={ faChartLine } fontSize={ 16 } /><span className='text-base font-semibold ml-2.5'>Daskboard</span></p></Link>
											<Divider className='m-0' />
										</>
									}
									<Link to='/bookmark' className='no-underline '><p className='py-2.5 m-0 text-slate-400 hover:text-slate-600'><FontAwesomeIcon icon={ faBookmark } fontSize={ 16 } /><span className='text-base font-semibold ml-2.5'>Bookmark</span></p></Link>
									<Divider className='m-0' />
									<Link to='/login' onClick={ handleClickLogout } className='no-underline '><p className='py-2.5 m-0 text-slate-400 hover:text-slate-600'><FontAwesomeIcon icon={ faArrowRightFromBracket } fontSize={ 16 } /><span className='text-base font-semibold ml-2.5'>Logout</span></p></Link>
								</div>
							</div>
						}
					>
						<div className='p-1 rounded-full cursor-pointer hover:opacity-80 hidden lg:block'>
							{
								contextData.user?.avatar ? <Avatar size='large' src={ contextData?.user.avatar } alt='avatar' />
									:
									<Avatar src="https://fullstack.edu.vn/static/media/fallback-avatar.155cdb2376c5d99ea151.jpg" size='large' alt="avtar" />
							}
						</div>
					</Popover>
				</div>
			)
		} else {
			return (
				<button className='btn-custom px-2 py-1' onClick={ handleClickLogout }>
					<Link to="/login" className='no-underline '>Login</Link>
				</button>
			)
		}
	}, [contextData, handleClickLogout])

	return (
		<header className='nav-header'>
			<button onClick={ toggleShow } className='lg:hidden float-right px-2 py-1.5'>
				<FontAwesomeIcon icon={ faBars } />
			</button>
			<a href='/' className='logo-customize'>
				<img src={ logo } className='w-16 h-16 rounded-lg object-center object-cover' alt='logo' />
			</a>
			<nav className='nav-nav'>
				{
					listNavbar.map((item, index) => {
						return (
							<NavLink
								to={ item.path }
								key={ index }
								className={ ({ isActive }) =>
									isActive ? "link-item active-item" : "link-item"
								}
							>
								{ item.icon }
								<span className='ml-2'>
									{ item.title }
								</span>
							</NavLink>
						)
					})
				}
			</nav>
			<Search />
			{
				renderUser
			}
			<Offcanvas show={ show } onHide={ handleClose }>
				<Offcanvas.Header closeButton>
					<Offcanvas.Title></Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					{
						renderUserMobile
					}
					<div className='flex flex-col justify-between'>
						<Link to='/user/profile' className='link-item m-0'>
							<FontAwesomeIcon icon={ faUser } />
							<span className='ml-3'>
								Profile
							</span>
						</Link>
						<Link to='/user/profile' className='link-item m-0'>
							<FontAwesomeIcon icon={ faLightbulb } />
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
											to={ item.path }
											key={ index }
											className={ ({ isActive }) =>
												isActive ? "link-item m-0 active-item" : "link-item m-0"
											}
										>
											{ item.icon }
											<span className='ml-3'>
												{ item.title }
											</span>
										</NavLink>
									)
								})
							}
						</div>
						<Divider className='m-0' />
						<button onClick={ handleClickLogout } className='px-3 py-2.5 w-full text-left'>
							<Link to='/login' className='no-underline text-zinc-400 font-semibold w-full'>
								<FontAwesomeIcon icon={ faArrowRightFromBracket } />
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