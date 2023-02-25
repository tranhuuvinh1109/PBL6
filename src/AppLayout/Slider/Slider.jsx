import React from 'react';
import './Slider.css';
import Carousel from 'react-bootstrap/Carousel'
import bg1 from './Images/slider-bg1.jpg';
import bg2 from './Images/slider-bg2.jpg';
import bg3 from './Images/slider-bg3.jpg';

const Slider = () => {
	return (
		// <div classNameName="hero-area">
		// 	<div classNameName="hero-slider">
		// 		<div classNameName="hero-inner overlay slider-bg1">
		// 			<div classNameName="container">
		// 				<div classNameName="row ">
		// 					<div classNameName="col-lg-8 offset-lg-2 col-md-12 co-12">
		// 						<div classNameName="home-slider">
		// 							<div classNameName="hero-text">
		// 								<h5 classNameName="wow fadeInUp" data-wow-delay=".3s">Start to Learning Today</h5>
		// 								<h1 classNameName="wow fadeInUp" data-wow-delay=".5s">Excellent And Friendly <br /> Faculty Members</h1>
		// 								<p classNameName="wow fadeInUp" data-wow-delay=".7s">Lorem Ipsum is simply dummy text of the
		// 									printing and typesetting <br /> industry. Lorem Ipsum has been the industry's
		// 									standard
		// 									<br />dummy text ever since an to impression.</p>
		// 								<div classNameName="button wow fadeInUp" data-wow-delay=".9s">
		// 									<a href="about-us.html" classNameName="btn">Learn More</a>
		// 									<a href="courses-grid.html" classNameName="btn alt-btn">Our Courses</a>
		// 								</div>
		// 							</div>
		// 						</div>
		// 					</div>
		// 				</div>
		// 			</div>
		// 		</div>
		// 		<div classNameName="hero-inner overlay slider-bg2" >
		// 			<div classNameName="container">
		// 				<div classNameName="row ">
		// 					<div classNameName="col-lg-8 offset-lg-2 col-md-12 co-12">
		// 						<div classNameName="home-slider">
		// 							<div classNameName="hero-text">
		// 								<h5 classNameName="wow fadeInUp" data-wow-delay=".3s">Start to learning Today</h5>
		// 								<h1 classNameName="wow fadeInUp" data-wow-delay=".5s">Innovation Paradise<br /> For Students </h1>
		// 								<p classNameName="wow fadeInUp" data-wow-delay=".7s">Lorem Ipsum is simply dummy text of the
		// 									printing and typesetting <br /> industry. Lorem Ipsum has been the industry's
		// 									standard
		// 									<br />dummy text ever since an to impression.</p>
		// 								<div classNameName="button wow fadeInUp" data-wow-delay=".9s">
		// 									<a href="about-us.html" classNameName="btn">Learn More</a>
		// 									<a href="events-grid.html" classNameName="btn alt-btn">Our Events</a>
		// 								</div>
		// 							</div>
		// 						</div>
		// 					</div>
		// 				</div>
		// 			</div>
		// 		</div>
		// 		<div classNameName="hero-inner overlay slider-bg3">
		// 			<div classNameName="container">
		// 				<div className="row ">
		// 					<div className="col-lg-8 offset-lg-2 col-md-12 co-12">
		// 						<div className="home-slider">
		// 							<div className="hero-text">
		// 								<h5 className="wow fadeInUp" data-wow-delay=".3s">Start to learning Today</h5>
		// 								<h1 className="wow fadeInUp" data-wow-delay=".5s">Your Ideas Will Be <br /> Heard & Supported</h1>
		// 								<p className="wow fadeInUp" data-wow-delay=".7s">Lorem Ipsum is simply dummy text of the
		// 									printing and typesetting <br /> industry. Lorem Ipsum has been the industry's
		// 									standard
		// 									<br />dummy text ever since an to impression.</p>
		// 								<div className="button wow fadeInUp" data-wow-delay=".9s">
		// 									<a href="about-us.html" className="btn">Learn More</a>
		// 									<a href="#" className="btn alt-btn">Our Courses</a>
		// 								</div>
		// 							</div>
		// 						</div>
		// 					</div>
		// 				</div>
		// 			</div>
		// 		</div>
		// 	</div>
		// </div>
		<Carousel variant="light" className='h-96 overflow-hidden'>
			<Carousel.Item style={{
				opacity: '0.9',
				background: '#081828'
			}}>
				<img
					className="d-block w-100"
					src={bg1}
					alt="First slide"
				/>
				<Carousel.Caption>
					<div className="container">
						<div className="row ">
							<div className="col-lg-8 offset-lg-2 col-md-12 co-12">
								<div className="home-slider">
									<div className="hero-text">
										<h5 className="wow fadeInUp" data-wow-delay=".3s">Start to Learning Today</h5>
										<h1 className="wow fadeInUp" data-wow-delay=".5s">Excellent And Friendly <br /> Faculty Members</h1>
										<p className="wow fadeInUp" data-wow-delay=".7s">Lorem Ipsum is simply dummy text of the
											printing and typesetting <br /> industry. Lorem Ipsum has been the industry's
											standard
											<br />dummy text ever since an to impression.</p>
										<div className="button wow fadeInUp" data-wow-delay=".9s">
											<a href="about-us.html" className="btn">Learn More</a>
											<a href="courses-grid.html" className="btn alt-btn">Our Courses</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item>
				<img
					className="d-block w-100"
					src={bg2}
					alt="Second slide"
				/>
				<Carousel.Caption>
					<h5>Second slide label</h5>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
				</Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item>
				<img
					className="d-block w-100"
					src={bg3}
					alt="Third slide"
				/>
				<Carousel.Caption>
					<h5>Third slide label</h5>
					<p>
						Praesent commodo cursus magna, vel scelerisque nisl consectetur.
					</p>
				</Carousel.Caption>
			</Carousel.Item>
		</Carousel>
	)
}

export default Slider;