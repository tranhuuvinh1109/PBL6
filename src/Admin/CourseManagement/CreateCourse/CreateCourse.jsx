import { Button, message, Steps } from 'antd';
import React, { createContext, useMemo, useState } from 'react';
import FirstContent from './components/FirstContent';
import SecondContent from './components/SecondContent';
import ThirdContent from './components/ThirdContent';
export const CreateCourseContext = createContext({});
const steps = [
	{
		id: 0,
		title: 'First',
		content: FirstContent
	},
	{
		id: 1,
		title: 'Second',
		content: SecondContent
	},
	{
		id: 2,
		title: 'Last',
		content: ThirdContent
	},
];
const CreateCourse = () => {
	const [courseContext, setCourseContext] = useState({
		courseName: '',
		price: 0,
		description: '',
		image: '',
		lesson: [],
		plan: [],
		video: '',
		teacherId: 0,
		category: 0,
	});
	const [current, setCurrent] = useState(0);
	const onChange = (value) => {
		setCurrent(value);
	};
	const next = () => {
		setCurrent(current + 1);
	};
	const prev = () => {
		setCurrent(current - 1);
	};
	const items = steps.map((item) => ({
		key: item.title,
		title: item.title,
	}));

	const renderStep = useMemo(() => {
		const stepActive = steps.filter(step => step.id === current);
		return stepActive[0].content;
	}, [current])
	return (
		<CreateCourseContext.Provider value={{ courseContext, setCourseContext }}>
			<Steps
				current={current}
				onChange={onChange}
				type='navigation'
				items={items}
			>
			</Steps>
			<div>
				{
					renderStep()
				}
			</div>
			<div
				style={{
					marginTop: 24,
				}}
			>
				{current < steps.length - 1 && (
					<Button className='btn-custom' onClick={() => next()}>
						Next
					</Button>
				)}
				{current === steps.length - 1 && (
					<Button className='btn-custom' onClick={() => message.success('Processing complete!')}>
						Done
					</Button>
				)}
				{current > 0 && (
					<Button
						style={{
							margin: '0 8px',
						}}
						onClick={() => prev()}
					>
						Previous
					</Button>
				)}
			</div>
		</CreateCourseContext.Provider>
	);
};
export default CreateCourse;