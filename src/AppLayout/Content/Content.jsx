import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { AppContext } from '../../App';
import Loading from '../../components/Loading/Loading';

const AppContent = () => {
	const context = useContext(AppContext);
	return (
		<>
			{
				context.isLoading ? <Loading />
					:
					<>
						<Header />
						{/* main content */ }
						<div className='mt-20'>
							<Outlet />
						</div>
						{/* end main content */ }
						<Footer />
					</>
			}

		</>
	)
}
export default AppContent;