import React, { useEffect, useState } from 'react';
import { InputNumber, Input, Divider } from 'antd';
// import { getStorageClient } from '../../../Firebase/firebaseClient';
// import { ref, uploadBytes } from '@firebase/storage';
import { faXmark, faPlus, faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const { TextArea } = Input;
const CreateCourse = () => {
	const [selectedFile, setSelectedFile] = useState(null);
	const [arrLesson, setArrLesson] = useState([{
		lessonName: "",
		linkVideo: "",
		grammar: "",
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

	const handleChangeLesson = e => {
		e.preventDefault();
		const index = +e.target.id.slice(-1);
		const temp = [...arrLesson];
		temp[index][e.target.name.split("-")[0]] = e.target.value;
		setArrLesson(temp);
	};

	const handleChangeLessonGrammar = (index, e) => {
		// const index = +e.target.id.slice(-1);
		// const temp = [...arrLesson];
		// temp[index][e.target.name.split("-")[0]] = e.target.value;
		// setArrLesson(temp);
		console.log(index, e)
	};

	const handleChangePlan = e => {
		e.preventDefault();
		const index = e.target.id;
		setArrPlan(s => {
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
	// const handleFileUpload = async () => {
	// 	const storage = getStorageClient;
	// 	if (selectedFile.preview) {
	// 		console.log(111, selectedFile);
	// 		const storageRef = ref(storage, `images/${selectedFile.preview.name}`);
	// 		await uploadBytes(storageRef, selectedFile.preview);
	// 	}
	// }
	const hanldeChange = (event) => {
		setCourse({ ...course, [event.target.name]: event.target.value })
	}
	const addLesson = () => {
		setArrLesson([
			...arrLesson,
			{
				lessonName: "",
				linkVideo: "",
				grammar: "",
			}
		]);
	}
	const removeLesson = (index) => {

		if (arrLesson.length !== 1) {
			const temp = [...arrLesson];
			temp.splice(index, 1);
			setArrLesson(temp)
			console.log("remove", index, temp, arrLesson)
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
		<div className='text-left'>
			<div className='flex w-full'>
				<div className='w-8/12'>
					<label htmlFor='name' className='w-3/12 text-base font-medium'>Course Name:</label>
					<Input id='name' name='name' className='w-9/12' value={ course.name } onChange={ (event) => hanldeChange(event) } />
				</div>
				<div className='w-4/12'>
					<label htmlFor='price' className='m-0 px-4 pl-8 text-base font-medium'>Price:</label>
					<InputNumber id='price' defaultValue={ 0 } onChange={ onChange } />
				</div>
			</div>
			<Divider />

			<div className='w-full flex'>
				<label className='w-2/12 text-base font-medium'>Lesson:</label>
				<div className='w-10/12'>
					{ arrLesson.map((item, index) => {
						return (
							<div className='mb-4'>
								<div className='flex'>
									<div className='mb-2 w-6/12' key={ index }>
										<label htmlFor={ `lessonName-${index}` } className='w-2/12'>Lesson Name:</label>
										<Input id={ `lessonName-${index}` } name={ `lessonName-${index}` } className='w-8/12' onChange={ handleChangeLesson } value={ item.name } />
									</div>
									<div className='w-6/12'>
										<label htmlFor={ `linkVideo-${index}` } className='w-2/12'>Link Video:</label>
										<Input id={ `linkVideo-${index}` } name={ `linkVideo-${index}` } className='w-8/12' onChange={ handleChangeLesson } value={ item.linkVideo } />
										<button onClick={ () => removeLesson(index) } className='btn-custom w-1/12 ml-2'>
											<FontAwesomeIcon icon={ faXmark } />
										</button>
									</div>
								</div>
								<div className='w-full'>
									<label htmlFor={ `grammar-${index}` } className='w-1/12'>Grammar:</label>
									<ReactQuill theme="snow" value={ item.grammar } id={ `grammar-${index}` }
										onChange={ (e) => {
											const temp = [...arrLesson];
											temp[index].grammar = e;
											setArrLesson(temp);
										} } />
								</div>
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
			<Divider />

			<div>
				<div className='flex w-6/12'>
					<label className='w-4/12 text-base font-medium'>Plan:</label>
					<div className='w-8/12'>
						{ arrPlan.map((item, index) => {
							return (
								<div className='mb-2' key={ index }>
									<Input id={ index } className='w-8/12' onChange={ handleChangePlan } value={ item.value } />
									<button onClick={ () => removePlan(index) } className='btn-custom w-1/12 ml-7'>
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
			</div>
			<Divider />

			<div className='w-full flex'>
				<label className='w-2/12 text-base font-medium'>Image:</label>
				<div class="avatar-upload">
					<div class="avatar-edit">
						<input type='file' accept=".png, .jpg, .jpeg" name='image' id='image' className='w-4/12 imageUploadInput' onChange={ handleFileInputChange } />
						<label htmlFor="image" className='imageUpload text-center'>
							<FontAwesomeIcon icon={ faPencil } className='text-slate-400 iconLabel' />
						</label>
					</div>
					<div class="avatar-preview">
						{
							selectedFile && <div id="imagePreview" style={ { backgroundImage: `url(${selectedFile.preview})` } }>
							</div>
						}
					</div>
				</div>
			</div>
			<Divider />

			<div>
				<label htmlFor='description' className='w-2/12 text-base font-medium' onClick={ () => console.log('arr', arrLesson) }>Description:</label>
				<TextArea rows={ 4 } className='w-10/12' id='description' name='description' maxLength={ 6 } value={ course.description } onChange={ (event) => hanldeChange(event) } />
			</div>
		</div>
	);
};
export default CreateCourse;