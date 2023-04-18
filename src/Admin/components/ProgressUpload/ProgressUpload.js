import React from "react";
import { Progress } from 'antd';

const ProgressUpload = ({ progress }) => {
	return (
		<div>
			<Progress type="dashboard" percent={progress} size="small" />
		</div>
	)
}

export default ProgressUpload;
