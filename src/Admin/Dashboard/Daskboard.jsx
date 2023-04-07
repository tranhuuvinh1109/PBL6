import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
const options = {
	title: {
		text: 'My chart'
	},
	series: [{
		data: [1, 2, 3]
	}]
}

const Daskboard = () => {
	return (
		<div>
			<h1>Daskboard</h1>
			<div>
				<HighchartsReact
					highcharts={ Highcharts }
					options={ options }
				/>
			</div>
		</div>
	)
}

export default Daskboard;