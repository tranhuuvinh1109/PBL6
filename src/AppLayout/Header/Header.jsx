import React from "react";
import '../../Assets/css//Header.css';
import logo from '../../logo.svg';
import { Container, Row, Col } from "react-bootstrap";
import Navbar from "./components/Navbar";

const listNavbar = [
	{
		title: 'Home',
		path: '/',
	},
	{
		title: 'Course',
		path: '/page/course',
	},
	{
		title: 'Event',
		path: '/page/event',
	},
	{
		title: 'Contact',
		path: '/page/contact',
	},
]
const Header = () => {
	return (
		<>
			{/* Preloader  */}
			<div className="preloader">
				<div className="preloader-inner">
					<div className="preloader-icon">
						<span></span>
						<span></span>
					</div>
				</div>
			</div>
			{/* End Preloader */}
			{/*  Start Header Area */}
			<header className="header navbar-area header-after relative">
				{/* <div className="toolbar-area">
					<Container>
						<Row>
							<Col lg={8} md={6} xs={12}>
								<div className="toolbar-social">
									<ul>
										<li><span className="title">Follow Us On : </span></li>
										<li><FontAwesomeIcon icon={faFacebook} className='text-white' /></li>
										<li><FontAwesomeIcon icon={faInstagram} className='text-white' /></li>
										<li><FontAwesomeIcon icon={faTelegram} className='text-white' /></li>
										<li><FontAwesomeIcon icon={faEnvelope} className='text-white' /></li>
									</ul>
								</div>
							</Col>
							<Col lg={8} md={6} xs={12}>
								<div className="toolbar-login">
									<div className="button">
										<Link to="/login" className="btn">Log in</Link>
									</div>
								</div>
							</Col>
						</Row>
					</Container>
				</div> */}
				<Container>
					<Row className="items-center">
						<Col lg={12}>
							<Navbar logo={logo} listNav={listNavbar} />
						</Col>

					</Row>
				</Container>

			</header>
			{/*  End Header Area  */}

		</>
	)
}

export default Header;