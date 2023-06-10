import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import './style.css';
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { userAPI } from "../../api/userApi.js";
import Loading from "../../components/Loading/Loading.jsx";


const UserPage = () => {
	const { id } = useParams();
	const [userData, setUserData] = useState({});
	const [loading, setLoading] = useState(false);

	const getUserByID = async (id) => {
		setLoading(true);
		try {
			const res = await userAPI.getUserByID(id);
			if (res.status === 200) {
				setUserData(res.data[0]);
			}
			else {
				throw new Error("Get Category failed");
			}
		}
		catch (err) {
			toast.error(err.message);
		}
		finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (id) {
			getUserByID(id);
		}
	}, [id])
	return (
		<>
			{
				loading ? <Loading />
					:
					<>
						<div className="header pb-8 pt-5 pt-lg-8 flex align-center header-pro" >
							<span className="bg-gradient-default opacity-8"></span>
							<div className="w-full text-center">
								<div>
									<h1 className="text-red-400">{ userData?.fullname }</h1>
									<p className="text-white mt-0 mb-5">This is your profile page. You can see the progress you've made with your work and manage your projects or assigned tasks</p>
								</div>
							</div>
						</div>
						<Container className="mt-profile">
							<Row>
								<Col xl={ 4 } className='mb-xl-0'>
									<div className="card card-profile shadow">
										<div className="w-full flex justify-center items-center py-4">
											{
												userData?.avatar ? <div className="image-preview-profile rounded-full" style={ { backgroundImage: `url(${userData.avatar})` } } ></div>
													:
													<div className="image-preview-profile rounded-full" style={ { backgroundImage: `url(https://fullstack.edu.vn/static/media/fallback-avatar.155cdb2376c5d99ea151.jpg)` } }></div>
											}
										</div>

										<div className="card-header text-center border-0 pt-32 pt-md-4 pb-0 pb-md-4">
											<div className="flex justify-between">
												<button className="btn btn-sm btn-info mr-4">Connect</button>
												<button className="btn btn-sm btn-default float-right">Message</button>
											</div>
										</div>
										<div className="card-body pt-0 pt-md-4">
											<Row>
												<Col>
													<div className="card-profile-stats flex justify-center mt-md-5">
														<div>
															<span className="heading">22</span>
															<span className="description">Friends</span>
														</div>
														<div>
															<span className="heading">10</span>
															<span className="description">Photos</span>
														</div>
														<div>
															<span className="heading">89</span>
															<span className="description">Comments</span>
														</div>
													</div>
												</Col>

											</Row>
											<div className="text-center">
												<h3 className="text-lg text-red-400">
													{
														userData?.user_name
													}
												</h3>
												<h3 className="mt-4 text-lg">
													Solution Manager - Creative Tim Officer
												</h3>
												<div>
													<i className="ni education_hat text-sm"></i>University of Computer Science
												</div>
												<hr className="my-4" />
												<p className="text-sm">Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and records all of his own music.</p>
											</div>
										</div>
									</div>
								</Col>

								<Col xl={ 8 } className="order-xl-1">
									<div className="card shadow">
										<div className="card-body  text-left">
											<h6 className="heading-small text-muted mb-4">User information</h6>
											<div className="pl-lg-4">
												<Row>
													<Col xs={ 12 } className="user-infor-wrapper">
														<label className="user-infor-label">
															Phone :
														</label>
														{
															userData?.phonenumber && <h5 className="user-infor-h5">
																{ userData?.phonenumber }
															</h5>
														}
													</Col>

													<Col xs={ 12 } className="user-infor-wrapper">
														<label className="user-infor-label">
															Fullname :
														</label>
														{
															userData?.fullname && <h5 className="user-infor-h5">
																{ userData?.fullname }
															</h5>
														}
													</Col>

													<Col xs={ 12 } className="user-infor-wrapper">
														<label className="user-infor-label">
															Address
														</label>
														{
															userData?.address && <h5 className="user-infor-h5">
																{ userData?.address }
															</h5>
														}
													</Col>
													<Col xs={ 12 } className="user-infor-wrapper">
														<label className="user-infor-label">
															Email
														</label>
														{
															userData?.email && <h5 className="user-infor-h5">
																{ userData?.email }
															</h5>
														}
													</Col>
												</Row>

											</div>
										</div>
									</div>
								</Col>


							</Row>
						</Container>
					</>
			}
		</>


	)
}

export default UserPage;