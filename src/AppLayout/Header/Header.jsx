import React from "react";
import '../../Assets/css//Header.css';
import logo from '../../logo.svg';
import { Container, Row, Col } from "react-bootstrap";
import Navbar from "./components/Navbar";


const Header = () => {
	return (
		<>
			<div className="preloader">
				<div className="preloader-inner">
					<div className="preloader-icon">
						<span></span>
						<span></span>
					</div>
				</div>
			</div>
			<header className="header navbar-area header-after relative">
				<Container>
					<Row className="items-center">
						<Col lg={12}>
							<Navbar logo={logo} />
						</Col>
					</Row>
				</Container>
			</header>

		</>
	)
}

export default Header;