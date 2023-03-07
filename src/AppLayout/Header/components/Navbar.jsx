import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useRef } from 'react';
import { faCircleXmark, faBars } from '@fortawesome/free-solid-svg-icons';
import '../../../Assets/css/Navbar.css';
import { NavLink, Link } from 'react-router-dom';
import { Avatar, Dropdown, Space } from 'antd';
import { faCaretDown, faArrowRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons'
import { AppContext } from '../../../App';
import { authAPI } from '../../../api/authApi';


const Navbar = ({ logo, listNav }) => {
	const navRef = useRef();
	const contextData = useContext(AppContext)
	const GetUser = async () => {
		const res = await authAPI.getUser('/users')
		console.log('s', res)

	}
	console.log('user', contextData);
	useEffect(() => {
		GetUser();
	}, [])
	const showNavbar = () => {
		navRef.current.classList.toggle("responsive_nav");
	};
	const handleClickLogout = () => {
		localStorage.setItem('userID', '')
	}
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

	return (
		<header className='nav-header'>
			<a href='/'>
				<img src={logo} className='w-[170px]' alt='logo' />
			</a>
			{/* mobile */}
			<Dropdown
				menu={{
					items,
				}}
				trigger={['click']}
			>
				<Space>
					<div className='nav-user xl:hidden 2xl:hidden  bg-orange-200 px-1.5 py-1 rounded-full cursor-pointer'>
						<Avatar src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPJVOqLLr0GTxic4gT7si741MVw7U8q-x91A&usqp=CAU' alt='avatar' />
						<span className='px-1 text-base font-medium'>Tran Huu Vinh</span>
						<FontAwesomeIcon icon={faCaretDown} className='pr-1' />
					</div>
				</Space>
			</Dropdown>

			<nav ref={navRef} className='nav-nav'>
				{
					listNav.map((item, index) => {
						return (
							<NavLink
								to={item.path}
								key={index}
								className={({ isActive }) =>
									isActive ? "link-item active-item" : "link-item"
								}
							>
								{item.title}
							</NavLink>
						)
					})
				}

				<button className="nav-btn nav-close-btn" onClick={showNavbar}>
					<FontAwesomeIcon icon={faCircleXmark} />
				</button>
			</nav>
			<button className="nav-btn" onClick={showNavbar}>
				<FontAwesomeIcon icon={faBars} />
			</button>
			{/* table - pc */}
			<Dropdown
				menu={{
					items,
				}}
				trigger={['click']}
			>
				<Space>
					<div className='hidden xl:block 2xl:block bg-orange-200 px-1.5 py-1 rounded-full cursor-pointer hover:opacity-80'>
						<Avatar size='large' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPJVOqLLr0GTxic4gT7si741MVw7U8q-x91A&usqp=CAU' alt='avatar' />
						{
							contextData?.user && <span className='px-2 text-base font-medium'>{contextData?.user}</span>
						}
						<FontAwesomeIcon icon={faCaretDown} className='pr-1.5' />
					</div>
				</Space>
			</Dropdown>

		</header>
	)
}
export default Navbar;