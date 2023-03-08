import { Collapse } from 'antd';
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'
const { Panel } = Collapse;

const Learning = () => {
	return (
		<div>
			<Container>
				<Row>
					<Col xs={12} lg={8}>
						<iframe src="https://player.vimeo.com/video/805460496?h=2012a742f0"
							width="600" height="564" title='video' frameBorder="0" allow="autoplay; fullscreen" allowFullScreen style={{ width: "100%" }} />
					</Col>
					<Col xs={12} lg={4}>
						<Collapse accordion className='lg:mt-[46px]'>
							<Panel header="Lesson content" key="1" >
								<div className='max-h-96  overflow-y-auto'>
									<h1>hhhh</h1>
									<h1>hhhh</h1>
									<h1>hhhh</h1>
									<h1>hhhh</h1>
									<h1>hhhh</h1>
									<h1>hhhh</h1>
									<h1>hhhh</h1>
									<h1>hhhh</h1>
									<h1>hhhh</h1>
									<h1>hhhh</h1>
									<h1>hhhh</h1>
								</div>
							</Panel>
						</Collapse>
					</Col>
				</Row>
			</Container>
			<div>
				<h1>
					lý thuyết
				</h1>
				<h2>
					こんにちは
				</h2>
			</div>
		</div>
	)
}

export default Learning;