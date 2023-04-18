import React from "react";
import '../../Assets/css//Header.css';
import logo from '../../logo.png';
import { Container, Row, Col } from "react-bootstrap";
import Navbar from "./components/Navbar";
// import Back from "../Back/Back";



const Header = () => {
	return (
		<header>
			<header className="header navbar-area">
				<Container className="">
					<Row className="items-center">
						<Col lg={ 12 }>
							<Navbar logo={ logo } />
						</Col>
					</Row>
				</Container>
				<div className="header-after"></div>
				{/* <Back /> */ }
			</header>
		</header>
	)
}

export default Header;