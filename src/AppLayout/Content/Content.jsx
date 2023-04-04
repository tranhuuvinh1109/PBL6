import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

const AppContent = () => {
	return (
		<>
			<Header />
			{/* main content */}
			<Outlet />
			{/* end main content */}
			<Footer />
		</>
	)
}
export default AppContent;