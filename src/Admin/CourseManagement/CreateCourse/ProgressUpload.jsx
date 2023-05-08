import React, { useState, useEffect } from 'react';

const Progress = ({ progress }) => {
	const [percentage, setPercentage] = useState(0);

	useEffect(() => {
		setPercentage(progress);
	}, [progress]);

	return (
		<div>
			<progress max="100" value={ percentage }></progress>
			<p>{ percentage }%</p>
		</div>
	);
};

export default Progress;
