import React from "react";
import './Header.css';
import logo from '../../logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTelegram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { Container, Row, Col, Navbar } from "react-bootstrap";
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
			<header className="header navbar-area">
				<div className="toolbar-area">
					<Container>
						<Row>
							<Col lg={8} md={6} xs={12}>
								<div className="toolbar-social">
									<ul>
										<li><span className="title">Follow Us On : </span></li>
										<li><a href="#"><FontAwesomeIcon icon={faFacebook} /></a></li>
										<li><a href="#"><FontAwesomeIcon icon={faInstagram} /></a></li>
										<li><a href="#"><FontAwesomeIcon icon={faTelegram} /></a></li>
										<li><a href="#"><FontAwesomeIcon icon={faEnvelope} /></a></li>
									</ul>
								</div>
							</Col>
							<Col lg={8} md={6} xs={12}>
								<div className="toolbar-login">
									<div className="button">
										<a href="#">Create an Account</a>
										<a href="#" className="btn">Log In</a>
									</div>
								</div>
							</Col>
						</Row>
					</Container>
				</div>
				<Container>
					<Row className="items-center">
						<Col lg={12}>
							<div className="nav-inner">
								<Navbar expand="lg">
									<a className="navbar-brand" href="#">
										<img src={logo} alt="Logo" />
									</a>
									<button className="navbar-toggler mobile-menu-btn" type="button" data-bs-toggle="collapse"
										data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
										aria-expanded="false" aria-label="Toggle navigation">
										<span className="toggler-icon"></span>
										<span className="toggler-icon"></span>
										<span className="toggler-icon"></span>
									</button>
									<div className=" navbar-collapse sub-menu-bar" id="navbarSupportedContent">
										<ul id="nav" className="navbar-nav ms-auto">
											<li className="nav-item cursor-pointer"><a className="active" href="#">Home</a></li>
											<li className="nav-item cursor-pointer"><a href="#">Courses</a></li>
											<li className="nav-item cursor-pointer"><a href="#">Events</a></li>
											<li className="nav-item cursor-pointer"><a href="#">Pages</a></li>
											<li className="nav-item cursor-pointer"><a href="#">Blog</a></li>
											<li className="nav-item cursor-pointer"><a href="#">Contact</a></li>
										</ul>
										<form className="d-flex search-form">
											<input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
											<button className="btn btn-outline-success" type="submit"><i
												className="lni lni-search-alt"></i></button>
										</form>
									</div>
								</Navbar>

							</div>
						</Col>

					</Row>
				</Container>

			</header>
			{/*  End Header Area  */}

		</>
	)
}

export default Header;