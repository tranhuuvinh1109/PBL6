import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import '../../Assets/css//Footer.css';
import logo from '../../logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTelegram } from '@fortawesome/free-brands-svg-icons';
import { faCalendarDays, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
	return (
		<footer className="footer mt-6">
			<div className="footer-middle">
				<Container>
					<Row>
						<Col lg={3} md={6} xs={12}>
							<div className="f-about single-footer">
								<div className="logo">
									<a href="index.html"><img src={logo} alt="Logo" /></a>
								</div>
								<p className="text-left">Nemo enim enim voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
									consequ magni dolores eos qui ratione.</p>
								<div className="footer-social">
									<ul className="p-0 text-left">
										<li><FontAwesomeIcon fontSize={14} icon={faFacebook} /></li>
										<li><FontAwesomeIcon fontSize={14} icon={faInstagram} /></li>
										<li><FontAwesomeIcon fontSize={14} icon={faTelegram} /></li>
										<li><FontAwesomeIcon fontSize={14} icon={faEnvelope} /></li>
									</ul>
								</div>
							</div>
						</Col>

						<Col lg={3} md={6} xs={12}>
							<div className="single-footer sm-custom-border recent-blog">
								<h3 className="text-left">Latest News</h3>
								<ul className="p-0">
									<li >
										<div className="flex text-left">
											<img src="https://static-images.vnncdn.net/files/publish/2023/1/3/mu-ngoai-hang-anh-85.jpg" alt="#" className="w-[75px] h-[75px]" />
											<p className="pl-2">
												Top 10 books you Must read in 2023
												<span className="date"><FontAwesomeIcon icon={faCalendarDays} className="text-greenCustom inline-block mr-1.5" />July 15, 2023</span>
											</p>
										</div>
									</li>
									<li>
										<div className="flex text-left">
											<img src="https://images2.thanhnien.vn/Uploaded/gianglao/2022_04_30/rodrygo-1473.jpeg" alt="#" className="w-[75px] h-[75px]" />
											<p className="pl-2">
												How to Improve Your Communication Skill
												<span className="date"><FontAwesomeIcon icon={faCalendarDays} className="text-greenCustom inline-block mr-1.5" />July 1, 2023</span>
											</p>
										</div>

									</li>
								</ul>
							</div>
						</Col>

						<Col lg={3} md={6} xs={12}>
							<div className="single-footer sm-custom-border f-link">
								<h3 className="text-left">Course List</h3>
								<ul className="text-left p-0">
									<li>Advance Javascript – ES6</li>
									<li>WordPress for Intermediate</li>
									<li>iOS App Development</li>
									<li>Wbsite Development</li>
									<li>Android App Development</li>
								</ul>
							</div>
						</Col>

						<Col lg={3} md={6} xs={12}>
							<div className="single-footer footer-newsletter">
								<h3 className="text-left">Newsletter</h3>
								<p className="text-left">Subscribe to us to always stay in touch with us and get the latest news.</p>
								<form action="mail/mail.php" method="get" target="_blank" className="newsletter-form">
									<input name="EMAIL" placeholder="Your email address" className="common-input" type="email" />
									<div className="button">
										<button className="btn">Subscribe Now!</button>
									</div>
								</form>
							</div>
						</Col>

					</Row>
				</Container>

			</div>
		</footer>
	)
}

export default Footer;