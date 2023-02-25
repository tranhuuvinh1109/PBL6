import React from 'react';
import Header from '../AppLayout/Header/Header';
import Slider from '../AppLayout/Slider/Slider';
import About from './components/About/About';
import Course from './components/Course/Course';

const HomePage = () => {
	return (
		<>
			<Header />
			<Slider />
			<About />
			<Course />
		</>
	)
}
export default HomePage;