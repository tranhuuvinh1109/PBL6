import React from 'react';
import '../../../Assets/css/CallAction.css';
import { Container, Row, Col } from "react-bootstrap";

const CallAction = () => {
	return (
		<div className="call-action section overlay">
			<Container>
				<Row>
					<Col lg={8} md={12} xs={12} className='ml-2-12 call-action-m-0'>
						<div className="call-content">
							<span>EduGrids Free Lite Version</span>
							<h2>Currently you are using free <br />Lite
								Version of EduGrids</h2>
							<p>Please, purchase full version of the template to get all pages,<br />
								features and commercial license</p>
							<div className="button">
								<a href="#" className="btn">Buy Now</a>
							</div>
						</div>
					</Col>

				</Row>
			</Container>

		</div>
	)
}

export default CallAction;