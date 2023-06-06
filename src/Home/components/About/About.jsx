import React from "react";
import '../../../Assets/css/About.css';
import { Container, Row, Col } from "react-bootstrap";

const text = 'Discover Learn Anywhere - your one - stop online learning platform! With a diverse course catalog, expert instructors, flexible learning options, interactive lessons, community collaboration, and progress tracking, you can unleash your potential and learn anytime, anywhere.Join us at our website and start your educational journey today!';
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
								<p className="wow fadeInUp mt-4" data-wow-delay=".6s">{ text }</p>
								<p className="qote wow fadeInUp" data-wow-delay=".8s"></p>
								<div className="button wow fadeInUp" data-wow-delay="1s">
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