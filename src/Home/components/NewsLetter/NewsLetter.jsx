import React from "react";
import '../../../Assets/css/NewsLetter.css';
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTelegram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

const NewsLetter = () => {
	return (
		<div className="newsletter-area section">
			<Container>
				<Row>
					<Col lg={6} md={12} xs={12} className="ml-[25%]">
						<div className="newsletter-title">
							<span>Sign Up for</span>
							<h2>The Newsletter</h2>
							<p>Subscribe to us to always stay in touch with us and get the latest news<br />
								about our company and all of our activities!</p>
						</div>
						<div className="subscribe-text wow fadeInUp" data-wow-delay=".2s">
							<form action="mail/mail.php" method="get" target="_blank" className="newsletter-inner">
								<input name="EMAIL" placeholder="Your email address" className="common-input" type="email" />
								<div className="button">
									<button className="btn">Subscribe Now!</button>
								</div>
							</form>
							<ul className="newsletter-social">
								<li className="newsletter-icon cursor-pointer"><FontAwesomeIcon icon={faFacebook} fontSize={14} /></li>
								<li className="newsletter-icon cursor-pointer"><FontAwesomeIcon icon={faInstagram} fontSize={14} /></li>
								<li className="newsletter-icon cursor-pointer"><FontAwesomeIcon icon={faTelegram} fontSize={14} /></li>
								<li className="newsletter-icon cursor-pointer"><FontAwesomeIcon icon={faEnvelope} fontSize={14} /></li>
							</ul>
						</div>
					</Col>

				</Row>

			</Container>

		</div>
	)
}

export default NewsLetter;