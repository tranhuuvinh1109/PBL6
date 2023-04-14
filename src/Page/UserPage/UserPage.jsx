import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
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
				setUserData(res.data.data);
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
									<h1 className="text-white">Hello Jesse</h1>
									<p className="text-white mt-0 mb-5">This is your profile page. You can see the progress you've made with your work and manage your projects or assigned tasks</p>
									<a href="#!" className="btn btn-info">Edit profile</a>
								</div>
							</div>
						</div>
						<Container className="mt-profile">
							<Row>
								<Col xl={ 4 } className='mb-xl-0'>
									<div className="card card-profile shadow">
										<Row className="justify-center">
											<Col lg={ 6 } className="order-lg-2">
												{
													userData?.avatar ? <div className="image-preview-profile rounded-full" style={ { backgroundImage: `url(${userData.avatar})` } } >
														<button className="btn-change text-white">
															<FontAwesomeIcon icon={ faPenToSquare } className="icon-change" />
														</button>
													</div>
														:
														<div className="image-preview-profile rounded-full" style={ { backgroundImage: `url(https://fullstack.edu.vn/static/media/fallback-avatar.155cdb2376c5d99ea151.jpg)` } }>
															<FontAwesomeIcon icon={ faPenToSquare } className="icon-change" />
														</div>
												}

												{/* <img src="https://demos.creative-tim.com/argon-dashboard/assets-old/img/theme/team-4.jpg" className="rounded-circle" alt="team" /> */ }
												{/* <FontAwesomeIcon icon={ faPenToSquare } /> */ }
											</Col>
										</Row>

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
												<h3 className="text-lg">
													{
														userData?.name
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
										<div className="card-header bg-white border-0">
											<Row className="items-center">
												<Col xs={ 8 }>
													<h3 className="mb-0 text-left text-lg">My account</h3>
												</Col>
												<Col xs={ 4 } className="text-right">
													<button className="btn btn-sm btn-primary">Settings</button>
												</Col>

											</Row>

										</div>
										<div className="card-body  text-left">
											<form>
												<h6 className="heading-small text-muted mb-4">User information</h6>
												<div className="pl-lg-4">
													<Row>
														<Col lg={ 6 }>
															<div className="form-group focused">
																<label className="form-control-label" htmlFor="input-username">Username</label>
																<input type="text" id="input-username" className="form-control form-control-alternative" placeholder="Username" value={ userData?.name } readOnly={ true } />
															</div>
														</Col>

														<Col lg={ 6 }>
															<div className="form-group">
																<label className="form-control-label" htmlFor="input-email">Email address</label>
																<input type="email" id="input-email" className="form-control form-control-alternative" placeholder="email@example.com" value={ userData?.email } readOnly={ true } />
															</div>
														</Col>
													</Row>

													<Row>
														<Col lg={ 6 }>
															<div className="form-group focused">
																<label className="form-control-label" htmlFor="input-phone">Phone</label>
																<input type="text" id="input-phone" className="form-control form-control-alternative" placeholder="Phone" value={ userData?.phone } readOnly={ true } />
															</div>
														</Col>
													</Row>
												</div>
												<hr className="my-4" />
												<h6 className="heading-small text-muted mb-4">About me</h6>
												<div className="pl-lg-4">
													<div className="form-group focused">
														<label>About Me</label>
														<textarea rows={ 4 } className="form-control form-control-alternative" placeholder="A few words about you ...">A beautiful Dashboard for Bootstrap 4. It is Free and Open Source.</textarea>
													</div>
												</div>
											</form>
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