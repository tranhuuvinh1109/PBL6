import React, { useEffect, useState } from 'react';
import { InputNumber, Input } from 'antd';
import { getStorageClient } from '../../../Firebase/firebaseClient';
import { ref, uploadBytes } from '@firebase/storage';
import { faXmark, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const { TextArea } = Input;
const CreateCourse = () => {
	const [selectedFile, setSelectedFile] = useState(null);
	const [arrLesson, setArrLesson] = useState([{
		id: 1,
		value: "",
	}]);

	const [arrPlan, setArrPlan] = useState([{
		id: 1,
		value: "",
	}]);

	const [course, setCourse] = useState({
		name: '',
		price: 0,
		description: '',
		image: '',
		lesson: [],
		plan: [],
		video: '',
		teacherId: 0,
		category: 0,
	});

	const handleChange2 = e => {
		e.preventDefault();
		const index = e.target.id;
		setArrLesson(s => {
			const newArr = s.slice();
			newArr[index].value = e.target.value;
			return newArr;
		});
	};

	const onChange = (value) => {
		console.log('changed', course, value);
	};


	const handleFileInputChange = (e) => {
		const file = e.target.files[0];
		file.preview = URL.createObjectURL(file);
		setSelectedFile(file);
	}
	const handleFileUpload = async () => {
		const storage = getStorageClient;
		if (selectedFile.preview) {
			console.log(111, selectedFile);
			const storageRef = ref(storage, `images/${selectedFile.preview.name}`);
			await uploadBytes(storageRef, selectedFile.preview);
		}
	}
	const hanldeChange = (event) => {
		setCourse({ ...course, [event.target.name]: event.target.value })
	}
	const addLesson = () => {
		setArrLesson([
			...arrLesson,
			{
				value: ""
			}
		]);
	}
	const removeLesson = (index) => {
		if (arrLesson.length !== 1) {
			const temp = [...arrLesson];
			temp.splice(index, 1);
			setArrLesson(temp)
		}
	}

	const addPlan = () => {
		setArrPlan([
			...arrPlan,
			{
				value: ""
			}
		]);
	}
	const removePlan = (index) => {
		if (arrPlan.length !== 1) {
			const temp = [...arrPlan];
			temp.splice(index, 1);
			setArrPlan(temp)
		}
	}

	useEffect(() => {
		return () => {
			selectedFile && URL.revokeObjectURL(selectedFile.preview);
		}
	}, [selectedFile])
	return (
		<div>
			<div className='flex w-full'>
				<div className='w-4/6'>
					<label htmlFor='name' className='w-3/12'>Course Name:</label>
					<input type='text' id='name' name='name' className='input-custom w-8/12' value={ course.name } onChange={ (event) => hanldeChange(event) } />
				</div>
				<div className='w-2/6'>
					<label htmlFor='price'>Price:</label>
					<InputNumber id='price' defaultValue={ 0 } onChange={ onChange } />
				</div>
			</div>

			<div className='w-full flex'>
				<label className='w-2/12'>Lesson:</label>
				<div className='w-10/12'>
					{ arrLesson.map((item, index) => {
						return (
							<div className='mb-2' key={ index }>
								<input
									className='input-custom w-5/12'
									onChange={ handleChange2 }
									value={ item.value }
									id={ index }
									type="text"
								/>
								<button onClick={ (index) => removeLesson(index) } className='btn-custom w-1/12 ml-7'>
									<FontAwesomeIcon icon={ faXmark } />
								</button>
							</div>
						);
					}) }
					<button onClick={ addLesson } className='btn-custom px-4 py-1'>
						<FontAwesomeIcon icon={ faPlus } />
						<span>
							Add new lesson
						</span>
					</button>
				</div>
			</div>
			<div className='w-full flex'>
				<label className='w-2/12'>Plan:</label>
				<div className='w-10/12'>
					{ arrPlan.map((item, index) => {
						return (
							<div className='mb-2' key={ index }>
								<input
									className='input-custom w-5/12'
									onChange={ handleChange2 }
									value={ item.value }
									id={ index }
									type="text"
								/>
								<button onClick={ (index) => removePlan(index) } className='btn-custom w-1/12 ml-7'>
									<FontAwesomeIcon icon={ faXmark } />
								</button>
							</div>
						);
					}) }
					<button onClick={ addPlan } className='btn-custom px-4 py-1'>
						<FontAwesomeIcon icon={ faPlus } />
						<span>
							Add new plan
						</span>
					</button>
				</div>
			</div>

			<div className='w-full flex'>
				<label htmlFor='image' className='w-2/12'>Image:</label>
				<input type="file" name='image' id='image' className='w-4/12' onChange={ handleFileInputChange } />
				<button onClick={ handleFileUpload }>Upload</button>
				{
					selectedFile && <div className='w-6/12'>
						<img src={ selectedFile.preview } className='w-full max-h-96' alt="imagePreview" />
					</div>
				}
			</div>
			<div>
				<label htmlFor='description' className='w-2/12'>Course Description:</label>
				<TextArea rows={ 4 } className='w-10/12' id='description' name='description' maxLength={ 6 } value={ course.description } onChange={ (event) => hanldeChange(event) } />
			</div>
		</div>
	);
};
export default CreateCourse;