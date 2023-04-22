import React from "react";
import { Progress } from 'antd';

const ProgressUpload = ({ progress }) => {
	return (
		<div className='overlay-progress'>
			<div className="h-screen flex items-center justify-center z-[100000]">
				<Progress type="dashboard" percent={progress} size="small" strokeColor='rgb(52 211 153)' />
			</div>
		</div>
	)
}

export default ProgressUpload;
