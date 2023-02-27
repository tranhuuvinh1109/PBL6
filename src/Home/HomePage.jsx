import React from 'react';
import Footer from '../AppLayout/Footer/Footer';
import Header from '../AppLayout/Header/Header';
import Slider from '../AppLayout/Slider/Slider';
import Course from '../components/Course/Course';
import About from './components/About/About';
import Achievement from './components/Achievement/Achievement';
import CallAction from './components/CallAction/CallAction';
import NewsLetter from './components/NewsLetter/NewsLetter';

const HomePage = () => {
	return (
		<>
			<Header />
			<Slider />
			<About />
			<Course listCourse={undefined} />
			<Achievement />
			<NewsLetter />
			<CallAction />
			<Footer />
		</>
	)
}
export default HomePage;