import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import '../../../Assets/css/Achievement.css';


const Achievement = () => {
	return (
		<div className="our-achievement section overlay">
			<Container>
				<Row>
					<Col lg={3} md={3} xs={12}>
						<div className="single-achievement wow fadeInUp" data-wow-delay=".2s">
							<h3 className="counter"><span id="secondo1" className="countup" cup-end="500">500</span>+</h3>
							<h4>Happy Clients</h4>
						</div>
					</Col>

					<Col lg={3} md={3} xs={12}>
						<div className="single-achievement wow fadeInUp" data-wow-delay=".4s">
							<h3 className="counter"><span id="secondo2" className="countup" cup-end="70">70</span>+</h3>
							<h4>Online Courses</h4>
						</div>
					</Col>

					<Col lg={3} md={3} xs={12}>
						<div className="single-achievement wow fadeInUp" data-wow-delay=".6s">
							<h3 className="counter"><span id="secondo3" className="countup" cup-end="100">100</span>%</h3>
							<h4>Satisfaction</h4>
						</div>
					</Col>

					<Col lg={3} md={3} xs={12}>
						<div className="single-achievement wow fadeInUp" data-wow-delay=".6s">
							<h3 className="counter"><span id="secondo3" className="countup" cup-end="100">100%</span>%</h3>
							<h4>Support</h4>
						</div>
					</Col>

				</Row>

			</Container>

		</div>
	)
}

export default Achievement;