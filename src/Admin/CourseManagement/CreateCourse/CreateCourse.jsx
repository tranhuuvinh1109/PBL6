import React, { useEffect, useState } from 'react';
import { InputNumber, Input, Divider } from 'antd';
import { faXmark, faPlus, faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { courseAPI } from '../../../api/courseAPI';
import { toast } from 'react-hot-toast';
import uploadFileWithProgress from '../../../Firebase/uploadFileWithProgress';
import ProgressUpload from '../../components/ProgressUpload/ProgressUpload';
import { useNavigate } from 'react-router-dom';


const { TextArea } = Input;
const CreateCourse = () => {
	const navigate = useNavigate();
	const [selectedFile, setSelectedFile] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [progress, setProgress] = useState(0);
	const [arrLesson, setArrLesson] = useState([{
		id: 1,
		name: "",
		video: "",
		grammar: "",
	}]);

	const [arrPlan, setArrPlan] = useState([{
		id: 1,
		title: "",
	}]);

	const [imageUrl, setImageUrl] = useState(null);

	const [course, setCourse] = useState({
		name: '',
		price: 0,
		description: '',
		image: '',
		lesson: [],
		plan: [],
		teacherId: 0,
		category: 0,
	});

	const handleChangeLesson = e => {
		e.preventDefault();
		const id = +e.target.id.split("-")[1];
		const temp = [...arrLesson];
		const itemChange = temp.findIndex(item => item.id === id);
		temp[itemChange][e.target.name.split("-")[0]] = e.target.value;
		setArrLesson(temp);
	};

	const handleChangePlan = e => {
		e.preventDefault();
		const id = +e.target.name.split("-")[1];
		const temp = [...arrPlan];
		const itemChange = temp.findIndex(item => item.id === id);
		temp[itemChange][e.target.name.split("-")[0]] = e.target.value;
		setArrPlan(temp)
	};

	const onChange = (value) => {
		setCourse({ ...course, price: value })
	};


	const handleFileInputChange = (e) => {
		const file = e.target.files[0];
		file.preview = URL.createObjectURL(file);
		setSelectedFile(file);
	}

	const hanldeChange = (event) => {
		setCourse({ ...course, [event.target.name]: event.target.value })
	}
	const addLesson = () => {
		const randomNum = new Date().getTime();
		setArrLesson([
			...arrLesson,
			{
				id: randomNum,
				name: "",
				video: "",
				grammar: "",
			}
		]);
	};

	const handleSubmit = async () => {
		setIsLoading(true);
		if (selectedFile.preview) {
			const randomNum = new Date().getTime();
			const newName = course.name + randomNum;

			const url = await uploadFileWithProgress(
				selectedFile,
				`images/course`,
				newName,
				setProgress
			);
			if (url) {
				console.log(1, url);
				setImageUrl(url);
				const res = await courseAPI.postCourse({
					name: course.name,
					description: course.description,
					teacher: 1,
					image: url,
					lessons: arrLesson,
					plans: arrPlan,
					price: course.price,
				});
				if (res.status === 200) {
					toast.success('submit successful');
					navigate('/admin/course')
				} else {
					toast.error('submit fail');
				}
			} else {
				toast.error('Upload image failed');
			}
			setIsLoading(false);
		}
	}

	const removeLesson = (id) => {
		if (arrLesson.length !== 1) {
			const temp = [...arrLesson];
			const index = temp.findIndex(item => item.id === id);
			temp.splice(index, 1);
			setArrLesson(temp)
		}
	}

	const addPlan = () => {
		const randomNum = new Date().getTime();
		setArrPlan([
			...arrPlan,
			{
				id: randomNum,
				title: ""
			}
		]);
	}
	const removePlan = (id) => {
		if (arrPlan.length !== 1) {
			const temp = [...arrPlan];
			const index = temp.findIndex(item => item.id === id);
			temp.splice(index, 1);
			setArrPlan(temp)
		}
	}

	useEffect(() => {
		return () => {
			selectedFile && URL.revokeObjectURL(selectedFile.preview);
		}
	}, [selectedFile])
	return (<>
		<div className='text-left relative'>
			<div className='flex w-full'>
				<div className='w-8/12'>
					<label htmlFor='name' className='w-3/12 text-base font-medium'>Course Name:</label>
					<Input id='name' name='name' className='w-9/12' value={ course.name } onChange={ (event) => hanldeChange(event) } />
				</div>
				<div className='w-4/12'>
					<label htmlFor='price' className='m-0 px-4 pl-8 text-base font-medium' >Price:</label>
					<InputNumber id='price' name='price' defaultValue={ 0 } value={ course.price } onChange={ onChange } />
				</div>
			</div>
			<Divider />

			<div className='w-full flex'>
				<label className='w-2/12 text-base font-medium'>Lesson:</label>
				<div className='w-10/12'>
					{ arrLesson.map((item) => {
						return (
							<div className='mb-4' key={ item.id }>
								<div className='flex'>
									<div className='mb-2 w-6/12'>
										<label htmlFor={ `lessonName-${item.id}` } className='w-2/12'>Lesson Name:</label>
										<Input id={ `lessonName-${item.id}` } name={ `name-${item.id}` } className='w-8/12' onChange={ handleChangeLesson } value={ item.name } />
									</div>
									<div className='w-6/12'>
										<label htmlFor={ `linkVideo-${item.id}` } className='w-2/12'>Link Video:</label>
										{/* <input type='file' id={ `linkVideo-${item.id}` } name={ `video-${item.id}` } onChange={ handleChangeFile } /> */ }
										<Input id={ `linkVideo-${item.id}` } name={ `video-${item.id}` } className='w-8/12' onChange={ handleChangeLesson } value={ item.video } />
										<button onClick={ () => removeLesson(item.id) } className='btn-custom w-1/12 ml-2'>
											<FontAwesomeIcon icon={ faXmark } />
										</button>
									</div>
								</div>
								<div className='w-full'>
									<label htmlFor={ `grammar-${item.id}` } className='w-1/12'>Grammar:</label>
									<ReactQuill theme="snow" value={ item.grammar } id={ `grammar-${item.id}` }
										onChange={ (e) => {
											const temp = [...arrLesson];
											const itemChange = temp.findIndex(e => e.id === item.id)
											temp[itemChange].grammar = e;
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
						{ arrPlan.map((item) => {
							return (
								<div className='mb-2' key={ item.id }>
									<Input id={ item.id } name={ `title-${item.id}` } className='w-8/12' onChange={ handleChangePlan } value={ item.title } />
									<button onClick={ () => removePlan(item.id) } className='btn-custom w-1/12 ml-7'>
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
				<div className="avatar-upload">
					<div className="avatar-edit">
						<input type='file' name='image' accept=".png, .jpg, .jpeg" id='image' className='w-4/12 imageUploadInput' onChange={ handleFileInputChange } />
						<label htmlFor="image" className='imageUpload text-center'>
							<FontAwesomeIcon icon={ faPencil } className='text-slate-400 iconLabel' />
						</label>
					</div>
					<div className="avatar-preview">
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
			<Divider />
			<div>
				<button className='btn-custom px-3 py-2' onClick={ handleSubmit }>
					DONE
				</button>
				{ imageUrl && <img src={ imageUrl } alt="Uploaded" /> }
			</div>
			{
				isLoading && <ProgressUpload progress={ progress } />
			}
		</div>
	</>
	);
};
export default CreateCourse;