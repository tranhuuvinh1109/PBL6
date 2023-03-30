import React, { useContext } from 'react';
import Footer from '../AppLayout/Footer/Footer';
import Header from '../AppLayout/Header/Header';
import Slider from '../AppLayout/Slider/Slider';
import Course from '../components/Course/Course';
import About from './components/About/About';
import Achievement from './components/Achievement/Achievement';
import CallAction from './components/CallAction/CallAction';
import NewsLetter from './components/NewsLetter/NewsLetter';
import { AppContext } from '../App';
import ScrollToTop from "react-scroll-to-top";
import Search from '../components/Search/Search';

const HomePage = () => {
	const context = useContext(AppContext)
	return (
		<>
			<Header />
			<Slider />
			<About />
			<Search />
			<Course listCourse={context.listCourse} />
			<Achievement />
			<NewsLetter />
			<CallAction />
			<ScrollToTop smooth />
			<Footer />
		</>
	)
}
export default HomePage;