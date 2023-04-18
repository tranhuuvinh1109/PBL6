import React, { useContext } from 'react';
import Footer from '../AppLayout/Footer/Footer';
import Header from '../AppLayout/Header/Header';
import Slider from '../AppLayout/Slider/Slider';
import Course from '../components/Course/Course';
import About from './components/About/About';
import Achievement from './components/Achievement/Achievement';
import NewsLetter from './components/NewsLetter/NewsLetter';
import { AppContext } from '../App';
import ScrollToTop from "react-scroll-to-top";
import Loading from '../components/Loading/Loading';

const HomePage = () => {
	const context = useContext(AppContext)
	return (
		<>
			{
				context.isLoading ? <Loading />
					:
					<>
						<Header />
						<div className='mt-32'>
							<Slider />
							<About />
							<Course listCourse={ context.listCourse } />
							<Achievement />
							<NewsLetter />
							<ScrollToTop smooth />
						</div>
						<Footer />
					</>
			}
		</>
	)
}
export default HomePage;