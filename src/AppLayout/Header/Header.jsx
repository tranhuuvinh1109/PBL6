import React from "react";
import '../../Assets/css//Header.css';
import logo from '../../logo.png';
import { Container, Row, Col } from "react-bootstrap";
import Navbar from "./components/Navbar";



const Header = () => {
	return (
		<header className="">
			<header className="header navbar-area header-after">
				<Container>
					<Row className="items-center">
						<Col lg={12}>
							<Navbar logo={logo} />
						</Col>
					</Row>
				</Container>
			</header>
		</header>
	)
}

export default Header;