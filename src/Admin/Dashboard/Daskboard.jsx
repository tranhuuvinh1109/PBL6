import React, { useState, useEffect, useMemo } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { statisticAPI } from '../../api/statisticAPI';

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
			const { arrayKey, arrayValue } = res.data.reduce(
				(acc, item) => {
					acc.arrayKey.push(item.course_id);
					acc.arrayValue.push(item.quantity);
					return acc;
				},
				{ arrayKey: [], arrayValue: [] }
			);
			setOptions({
				...options,
				xAxis: {
					categories: arrayKey,
					crosshair: true,
					title: {
						text: null
					}
				},
				series: [
					{
						name: 'Series 1',
						data: arrayValue
					}
				]
			});
		} else {
			console.log('err', res);
		}
	};

	const renderStatistic = useMemo(() => {
		console.log(options);
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
