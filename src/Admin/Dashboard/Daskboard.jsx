import React, { useState, useEffect, useMemo } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { statisticAPI } from '../../api/statisticAPI';
import { toast } from 'react-hot-toast';

const colorArray = ['#FFFF00', '#FF00FF', '#FF0000', '#00FFFF', '#00FF00', '#FFCC33', '#FF99FF', '#3300FF', '#330066'];

const randomColor = () => {
	const randomIndex = Math.floor(Math.random() * colorArray.length);
	return colorArray[randomIndex];
}

const Daskboard = () => {
	const [options, setOptions] = useState({
		chart: {
			type: 'spline'
		},
		title: {
			text: 'Course Statistic'
		},
		series: [],
		xAxis: {}
	});


	const getStatisticCourse = async () => {
		const res = await statisticAPI.statisticCourse();
		if (res.status === 200) {
			const { arrayValue } = res.data.reduce(
				(acc, item) => {
					acc.arrayValue.push(item.quantity);
					return acc;
				},
				{ arrayValue: [] }
			);
			const courses = res.data.map(item => {
				return { course: item.course }
			});

			setOptions({
				...options,
				xAxis: {
					categories: courses.map(item => item.course.name),
					crosshair: true,
					title: {
						text: null
					}
				},
				series: [
					{
						name: '',
						data: arrayValue.map((item, index) => {
							return {
								name: courses[index].course.name,
								y: item,
								color: randomColor()
							}
						}),
						tooltip: {
							formatter: () => {
								return 'The value for <b>' + this.x + '</b> is <b>' + this.y + '</b>, in series ' + this.series.name;
							}
						}
					}
				]
			});
		} else {
			toast.error('Get static data fail !');
		}
	};

	const renderStatistic = useMemo(() => {
		return <HighchartsReact highcharts={ Highcharts } options={ options } />;
	}, [options]);

	useEffect(() => {
		getStatisticCourse();
	}, []);

	return (
		<div>
			<h1>Daskboard</h1>
			<div>{ renderStatistic }</div>
		</div>
	);
};

export default Daskboard;
