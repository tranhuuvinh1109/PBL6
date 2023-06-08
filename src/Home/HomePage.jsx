import React, { useContext, useEffect } from 'react';
import Slider from '../AppLayout/Slider/Slider';
import Course from '../components/Course/Course';
import About from './components/About/About';
import Achievement from './components/Achievement/Achievement';
import NewsLetter from './components/NewsLetter/NewsLetter';
import { AppContext } from '../App';
import ScrollToTop from "react-scroll-to-top";
import Loading from '../components/Loading/Loading';

const HomePage = () => {
	const context = useContext(AppContext);
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	return (
		<>
			{
				context.isLoading ? <Loading />
					:
					<>
						<Slider />
						<About />
						<Course />
						<Achievement />
						<NewsLetter />
						<ScrollToTop smooth />
					</>
			}
		</>
	)
}
export default HomePage;