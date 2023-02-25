import React from 'react';
import Footer from '../AppLayout/Footer/Footer';
import Header from '../AppLayout/Header/Header';
import Slider from '../AppLayout/Slider/Slider';
import About from './components/About/About';
import Achievement from './components/Achievement/Achievement';
import CallAction from './components/CallAction/CallAction';
import Course from './components/Course/Course';
import NewsLetter from './components/NewsLetter/NewsLetter';

const HomePage = () => {
	return (
		<>
			<Header />
			<Slider />
			<About />
			<Course />
			<Achievement />
			<NewsLetter />
			<CallAction />
			<Footer />
		</>
	)
}
export default HomePage;