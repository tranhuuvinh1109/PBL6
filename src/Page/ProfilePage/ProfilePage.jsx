import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import './style.css';
const ProfilePage = () => {
	return (
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
					<Col xl={4} className='mb-xl-0'>
						<div className="card card-profile shadow">
							<Row className="justify-center">
								<Col lg={3} className="order-lg-2">
									<div className="card-profile-image">
										<a href="#">
											<img src="https://demos.creative-tim.com/argon-dashboard/assets-old/img/theme/team-4.jpg" className="rounded-circle" alt="team" />
										</a>
									</div>
								</Col>
							</Row>

							<div className="card-header text-center border-0 pt-32 pt-md-4 pb-0 pb-md-4">
								<div className="flex justify-between">
									<a href="#" className="btn btn-sm btn-info mr-4">Connect</a>
									<a href="#" className="btn btn-sm btn-default float-right">Message</a>
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
										Jessica Jones<span className="font-light">, 27</span>
									</h3>
									<div className="text-sm">
										<i className="ni location_pin"></i>Bucharest, Romania
									</div>
									<h3 className="mt-4 text-lg">
										Solution Manager - Creative Tim Officer
									</h3>
									<div>
										<i className="ni education_hat text-sm"></i>University of Computer Science
									</div>
									<hr className="my-4" />
									<p className="text-sm">Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and records all of his own music.</p>
									<a href="#">Show more</a>
								</div>
							</div>
						</div>
					</Col>

					<Col xl={8} className="order-xl-1">
						<div className="card shadow">
							<div className="card-header bg-white border-0">
								<Row className="items-center">
									<Col xs={8}>
										<h3 className="mb-0 text-left text-lg">My account</h3>
									</Col>
									<Col xs={4} className="text-right">
										<a href="#" className="btn btn-sm btn-primary">Settings</a>
									</Col>

								</Row>

							</div>
							<div className="card-body  text-left">
								<form>
									<h6 className="heading-small text-muted mb-4">User information</h6>
									<div className="pl-lg-4">
										<Row>
											<Col lg={6}>
												<div className="form-group focused">
													<label className="form-control-label" htmlFor="input-username">Username</label>
													<input type="text" id="input-username" className="form-control form-control-alternative" placeholder="Username" value="lucky.jesse" />
												</div>
											</Col>

											<Col lg={6}>
												<div className="form-group">
													<label className="form-control-label" htmlFor="input-email">Email address</label>
													<input type="email" id="input-email" className="form-control form-control-alternative" placeholder="jesse@example.com" />
												</div>
											</Col>
										</Row>

										<Row>
											<Col lg={6}>
												<div className="form-group focused">
													<label className="form-control-label" htmlFor="input-first-name">First name</label>
													<input type="text" id="input-first-name" className="form-control form-control-alternative" placeholder="First name" value="Lucky" />
												</div>
											</Col>

											<Col lg={6}>
												<div className="form-group focused">
													<label className="form-control-label" htmlFor="input-last-name">Last name</label>
													<input type="text" id="input-last-name" className="form-control form-control-alternative" placeholder="Last name" value="Jesse" />
												</div>
											</Col>

										</Row>

									</div>
									<hr className="my-4" />
									<h6 className="heading-small text-muted mb-4">Contact information</h6>
									<div className="pl-lg-4">
										<Row>
											<Col md={12}>
												<div className="form-group focused">
													<label className="form-control-label" htmlFor="input-address">Address</label>
													<input id="input-address" className="form-control form-control-alternative" placeholder="Home Address" value="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09" type="text" />
												</div>
											</Col>
										</Row>

										<Row>
											<Col lg={4}>
												<div className="form-group focused">
													<label className="form-control-label" htmlFor="input-city">City</label>
													<input type="text" id="input-city" className="form-control form-control-alternative" placeholder="City" value="New York" />
												</div>
											</Col>

											<Col lg={4}>
												<div className="form-group focused">
													<label className="form-control-label" htmlFor="input-country">Country</label>
													<input type="text" id="input-country" className="form-control form-control-alternative" placeholder="Country" value="United States" />
												</div>
											</Col>

											<Col lg={4}>
												<div className="form-group">
													<label className="form-control-label" htmlFor="input-country">Postal code</label>
													<input type="number" id="input-postal-code" className="form-control form-control-alternative" placeholder="Postal code" />
												</div>
											</Col>

										</Row>

									</div>
									<hr className="my-4" />
									<h6 className="heading-small text-muted mb-4">About me</h6>
									<div className="pl-lg-4">
										<div className="form-group focused">
											<label>About Me</label>
											<textarea rows={4} className="form-control form-control-alternative" placeholder="A few words about you ...">A beautiful Dashboard for Bootstrap 4. It is Free and Open Source.</textarea>
										</div>
									</div>
								</form>
							</div>
						</div>
					</Col>


				</Row>
			</Container>
		</>


	)
}

export default ProfilePage;