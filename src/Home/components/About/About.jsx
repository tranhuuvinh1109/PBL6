import React from "react";
import '../../../Assets/css/About.css';
import { Container, Row, Col } from "react-bootstrap";
const About = () => {
	return (
		// <!-- Start About Us Area -->
		<div className="about-us pt-32">
			<Container>
				<Row>
					<Col lg={ 6 } xs={ 12 }>
						<div className="about-left">
							<div className="about-title text-left">
								<span className="wow fadeInDown" data-wow-delay=".2s">About Our Website</span>
								<h2 className="wow fadeInUp" data-wow-delay=".4s">Welcome to Edugrids</h2>
								<p className="wow fadeInUp" data-wow-delay=".6s">Learn to work</p>
								<p className="qote wow fadeInUp" data-wow-delay=".8s"></p>
								<div className="button wow fadeInUp" data-wow-delay="1s">
									<a href="about-us.html" className="btn">Read More</a>
									<a href="https://www.youtube.com/watch?v=r44RKWyfcFw&fbclid=IwAR21beSJORalzmzokxDRcGfkZA1AtRTE__l5N4r09HcGS5Y6vOluyouM9EM"
										className="glightbox video btn"> Play Video<i className="lni lni-play"></i></a>
								</div>
							</div>
						</div>
					</Col>
					<Col lg={ 6 } xs={ 12 }>
						<div className="about-right wow fadeInRight" data-wow-delay=".4s">
							<img src="https://demo.graygrids.com/themes/edugrids/assets/images/about/about-img2.png" alt="#" />
						</div>
					</Col>
				</Row>
			</Container>
		</div>
		// End About Us Area
	)
}
export default About;