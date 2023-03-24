import React, { useEffect, useState } from 'react';
import { InputNumber, Input, Divider } from 'antd';
import { getStorageClient } from '../../../Firebase/firebaseClient';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { faXmark, faPlus, faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { courseAPI } from '../../../api/courseAPI';


const { TextArea } = Input;
const CreateCourse = () => {
	const [selectedFile, setSelectedFile] = useState(null);
	const [arrLesson, setArrLesson] = useState([{
		id: 1,
		lessonName: "",
		linkVideo: "",
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
		console.log(e)
		const id = +e.target.id.split("-")[1];
		const temp = [...arrLesson];
		const itemChange = temp.findIndex(item => item.id === id);
		temp[itemChange][e.target.name.split("-")[0]] = e.target.value;
		setArrLesson(temp);
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
		console.log(value, imageUrl)
		setCourse({ ...course, price: value })
	};


	const handleFileInputChange = (e) => {
		const file = e.target.files[0];
		file.preview = URL.createObjectURL(file);
		setSelectedFile(file);
	}
	const handleFileUpload = async () => {
		const randomNum = new Date().getTime();
		const newName = 'course' + randomNum;
		if (selectedFile.preview) {
			const storageRef = ref(getStorageClient, `images/course`);
			const fileRef = ref(storageRef, newName);

			uploadBytes(fileRef, selectedFile)
				.then((snapshot) => {
					getDownloadURL(snapshot.ref).then((downloadURL) => {
						console.log("Upload successful, download URL:", downloadURL);
						setImageUrl(downloadURL);
					});
				})
				.catch((error) => {
					console.log("Upload failed:", error);
				});

		}
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
				lessonName: "",
				linkVideo: "",
				grammar: "",
			}
		]);
	}

	const handleSubmit = async () => {
		const res = await courseAPI.postCourse({
			name: course.name,
			description: course.description,
			image: imageUrl,
			lesson: arrLesson,
			plan: arrPlan,
			price: course.price,
			video: '',
			total_star: 5,
		})
		console.log('SUBMIT ', {
			name: course.name,
			description: course.description,
			image: imageUrl,
			lesson: arrLesson,
			plan: arrPlan,
			price: course.price
		}, res)
	}

	const removeLesson = (id) => {

		if (arrLesson.length !== 1) {
			const temp = [...arrLesson];
			const index = temp.findIndex(item => item.id === id);
			temp.splice(index, 1);
			setArrLesson(temp)
			console.log("remove", index, temp, arrLesson)
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
	return (
		<div className='text-left'>
			<div className='flex w-full'>
				<div className='w-8/12'>
					<label htmlFor='name' className='w-3/12 text-base font-medium'>Course Name:</label>
					<Input id='name' name='name' className='w-9/12' value={course.name} onChange={(event) => hanldeChange(event)} />
				</div>
				<div className='w-4/12'>
					<label htmlFor='price' className='m-0 px-4 pl-8 text-base font-medium' >Price:</label>
					<InputNumber id='price' name='price' defaultValue={0} value={course.price} onChange={onChange} />
				</div>
			</div>
			<Divider />

			<div className='w-full flex'>
				<label className='w-2/12 text-base font-medium'>Lesson:</label>
				<div className='w-10/12'>
					{arrLesson.map((item) => {
						return (
							<div className='mb-4' key={item.id}>
								<div className='flex'>
									<div className='mb-2 w-6/12'>
										<label htmlFor={`lessonName-${item.id}`} className='w-2/12'>Lesson Name:</label>
										<Input id={`lessonName-${item.id}`} name={`lessonName-${item.id}`} className='w-8/12' onChange={handleChangeLesson} value={item.name} />
									</div>
									<div className='w-6/12'>
										<label htmlFor={`linkVideo-${item.id}`} className='w-2/12'>Link Video:</label>
										<Input id={`linkVideo-${item.id}`} name={`linkVideo-${item.id}`} className='w-8/12' onChange={handleChangeLesson} value={item.linkVideo} />
										<button onClick={() => removeLesson(item.id)} className='btn-custom w-1/12 ml-2'>
											<FontAwesomeIcon icon={faXmark} />
										</button>
									</div>
								</div>
								<div className='w-full'>
									<label htmlFor={`grammar-${item.id}`} className='w-1/12'>Grammar:</label>
									<ReactQuill theme="snow" value={item.grammar} id={`grammar-${item.id}`}
										onChange={(e) => {
											const temp = [...arrLesson];
											const itemChange = temp.findIndex(e => e.id === item.id)
											temp[itemChange].grammar = e;
											setArrLesson(temp);
										}} />
								</div>
							</div>
						);
					})}
					<button onClick={addLesson} className='btn-custom px-4 py-1'>
						<FontAwesomeIcon icon={faPlus} />
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
						{arrPlan.map((item) => {
							return (
								<div className='mb-2' key={item.id}>
									<Input id={item.id} className='w-8/12' onChange={handleChangePlan} value={item.value} />
									<button onClick={() => removePlan(item.id)} className='btn-custom w-1/12 ml-7'>
										<FontAwesomeIcon icon={faXmark} />
									</button>
								</div>
							);
						})}
						<button onClick={addPlan} className='btn-custom px-4 py-1'>
							<FontAwesomeIcon icon={faPlus} />
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
						<input type='file' name='image' id='image' className='w-4/12 imageUploadInput' onChange={handleFileInputChange} />
						<label htmlFor="image" className='imageUpload text-center'>
							<FontAwesomeIcon icon={faPencil} className='text-slate-400 iconLabel' />
						</label>
					</div>
					<div class="avatar-preview">
						{
							selectedFile && <div id="imagePreview" style={{ backgroundImage: `url(${selectedFile.preview})` }}>
							</div>
						}
					</div>
				</div>
			</div>
			<Divider />

			<div>
				<label htmlFor='description' className='w-2/12 text-base font-medium' onClick={() => console.log('arr', arrLesson)}>Description:</label>
				<TextArea rows={4} className='w-10/12' id='description' name='description' maxLength={6} value={course.description} onChange={(event) => hanldeChange(event)} />
			</div>
			<Divider />
			<div>
				<button className='btn-custom px-3 py-2' onClick={handleSubmit}>
					DONE
				</button>
				<button className='btn-custom px-3 py-2' onClick={handleFileUpload}>
					UPLOAD
				</button>
				{imageUrl && <img src={imageUrl} alt="Uploaded" />}
			</div>
		</div>
	);
};
export default CreateCourse;