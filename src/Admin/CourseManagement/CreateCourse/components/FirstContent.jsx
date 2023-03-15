import React, { useContext, useState } from 'react';
import { CreateCourseContext } from '../CreateCourse';
import { InputNumber } from 'antd';
import { getStorageClient } from '../../../../Firebase/firebaseClient';
import { ref, uploadBytes } from '@firebase/storage';

const FirstContent = () => {
	const courseContext = useContext(CreateCourseContext)
	const onChange = (value) => {
		console.log('changed', courseContext, value);
	};
	const [selectedFile, setSelectedFile] = useState(null);
	const handleFileInputChange = (e) => {
		setSelectedFile(e.target.files[0]);
	}
	const handleFileUpload = async () => {
		const storage = getStorageClient;
		if (selectedFile) {
			console.log(111, selectedFile);
			const storageRef = ref(storage, `images/${selectedFile.name}`);
			await uploadBytes(storageRef, selectedFile);
		}
	}
	return (
		<div>
			<label htmlFor='cousreName'>Course Name:</label>
			<input type='text' id='courseName' name='courseName' className='border-zinc-700 border-2 border-solid' />
			<label htmlFor='coursePrice'>Price:</label>
			<InputNumber id='coursePrice' defaultValue={0} onChange={onChange} />
			<div>
				<input type="file" onChange={handleFileInputChange} />
				<button onClick={handleFileUpload}>Upload</button>
			</div>
		</div>
	)
}

export default FirstContent;