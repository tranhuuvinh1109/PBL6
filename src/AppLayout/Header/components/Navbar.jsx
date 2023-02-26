import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef } from 'react';
import { faCircleXmark, faBars } from '@fortawesome/free-solid-svg-icons';
import '../../../Assets/css/Navbar.css';
// import { NavLink } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Navbar = ({ logo, listNav }) => {
	const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle("responsive_nav");
	};

	return (
		<header className='nav-header'>
			<a href='/'>
				<img src={logo} className='w-[170px]' alt='logo' />
			</a>

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
		</header>
	)
}
export default Navbar;