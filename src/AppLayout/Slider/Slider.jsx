import React from 'react';
import './Slider.css';
import Carousel from 'react-bootstrap/Carousel'
import bg1 from './Images/slider-bg1.jpg';
import bg2 from './Images/slider-bg2.jpg';
import bg3 from './Images/slider-bg3.jpg';

const Slider = () => {
	return (
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
			</Carousel.Item>
			<Carousel.Item>
				<img
					className="d-block w-100"
					src={bg2}
					alt="Second slide"
				/>
			</Carousel.Item>
			<Carousel.Item>
				<img
					className="d-block w-100"
					src={bg3}
					alt="Third slide"
				/>
				<Carousel.Caption>
					<h5>Third slide label</h5>
				</Carousel.Caption>
			</Carousel.Item>
		</Carousel>
	)
}

export default Slider;