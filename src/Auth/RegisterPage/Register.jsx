import '../../Assets/css/Register.css';
import React, { useEffect, useState, useContext } from 'react';
import { Link } from "react-router-dom";
import { faCircleArrowLeft, faUpload, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { AppContext } from '../../App';
import { authAPI } from '../../api/authApi';
import { Radio } from 'antd';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getStorageClient } from '../../Firebase/firebaseClient';
import InputCustom from '../../components/Input/Input';

const Register = () => {
	const navigate = useNavigate();
	const context = useContext(AppContext)

	const [selectedFile, setSelectedFile] = useState({});
	const [data, setData] = useState({
		username: '',
		email: '',
		password: '',
		phone: '',
		gender: 0,
		avatar: '',
		confirmPassword: ''
	});
	const handChange = (e) => {
		e.preventDefault();
		setData({ ...data, [e.target.name]: e.target.value });
	};
	const handleChangeFile = (e) => {
		const file = e.target.files[0];
		file.preview = URL.createObjectURL(file);
		setSelectedFile(file);
	};
	const handleRemoveFile = () => {
		setSelectedFile({})
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		context.setIsLoading(true);
		if (data.password === data.confirmPassword) {
			if (selectedFile.preview) {
				const randomNum = new Date().getTime();
				const newName = 'avatar' + randomNum;
				const storageRef = ref(getStorageClient, `images/avatar`);
				const fileRef = ref(storageRef, newName);
				await uploadBytes(fileRef, selectedFile)
					.then((snapshot) => {
						getDownloadURL(snapshot.ref).then(async (downloadURL) => {
							setData({ ...data, avatar: downloadURL })
							const res = await authAPI.register({
								username: data.username,
								gender: data.gender,
								email: data.email,
								password: data.password,
								phone: data.phone,
								avatar: data.avatar
							});
							if (res.status === 200) {
								toast.success('submit successful');
								navigate('/login');
							} else {
								toast.error('submit fail');
							}
						});
					})
					.catch((error) => {
						toast.error('Upload image failed');
					});
			} else {
				const res = await authAPI.register({
					username: data.username,
					gender: data.gender,
					email: data.email,
					password: data.password,
					phone: data.phone,
					avatar: data.avatar
				});
				if (res.status === 200) {
					toast.success('submit successful');
					navigate('/login');
				} else {
					toast.error('submit fail');
				}
			}
		}
		else {
			toast.error("Password does not match confirm password, Please check again");
		}
		context.setIsLoading(false);
	}


	useEffect(() => {
		return () => {
			selectedFile && URL.revokeObjectURL(selectedFile.preview);
		}
	}, [selectedFile]);

	return (
		<div className="login">
			<div className="login_box rounded-lg shadow-2xl">
				<div className="login_content">
					<div className='login_content_left'>
						<div className="top-link text-left text-[greenCustom] ">
							<Link to='/' className='no-underline return-home'>
								<FontAwesomeIcon icon={ faCircleArrowLeft } />
								<span className='ml-1.5'>Return home</span>
							</Link>
							<div className='top-link-title'>
								<h2>
									Education
								</h2>
								<h4>
									Learn to work
								</h4>
							</div>
						</div>
						<div className="field-body">
							<form
								onSubmit={ handleSubmit }
								className='field-content'
							>
								<h3 className=''>Register</h3>
								<div>
									<InputCustom type='text' id='username' required={ true } placeholder='Username' name='username' value={ data.username } onChange={ handChange } onBlur={ () => { } } />
									<InputCustom type='email' id='email' required={ true } placeholder='Email' name='email' value={ data.email } onChange={ handChange } onBlur={ () => { } } />
									<InputCustom type='text' id='phone' required={ true } placeholder='Phone' name='phone' value={ data.phone } onChange={ handChange } onBlur={ () => { } } />
									<InputCustom type='password' id='password' required={ true } placeholder='Password' name='password' value={ data.password } onChange={ handChange } onBlur={ () => { } } />
									<InputCustom type='password' id='confirm-password' required={ true } placeholder='Confirm Password' name='confirmPassword' value={ data.confirmPassword } onChange={ handChange } onBlur={ () => { } } />
									<div className='field-input-wrapper'>
										<Radio.Group onChange={ handChange } value={ data.gender } name='gender' className='w-full  flex  justify-between'>
											<Radio value={ 0 }>Male</Radio>
											<Radio value={ 1 }>FeMale</Radio>
										</Radio.Group>
									</div>
									<div className='field-input-wrapper '>
										{
											selectedFile.preview ?
												<div className='w-full h-28 flex justify-center items-center relative'>
													<img src={ selectedFile.preview } className='w-28 rounded-full h-28 object-cover' alt='preview' />
													<button className='absolute top-0.5 right-0.5 hover:text-slate-400 py-0.5 px-1.5' onClick={ handleRemoveFile }>
														<FontAwesomeIcon icon={ faCircleXmark } />
													</button>
												</div>
												:
												<>
													<label htmlFor="avatar" className="cursor-pointer p-1 text-center border-red-400 text-red-400 border-2 border-solid rounded-2xl hover:text-red-600 hover:border-red-600 field-image">
														<FontAwesomeIcon icon={ faUpload } className="mr-2" /> Choose avatar to upload
													</label>
													<input type="file" accept=".png, .jpg, .jpeg" name="avatar" id="avatar" className="hidden" onChange={ handleChangeFile } />
												</>
										}
									</div>
									<div>
										<button className='btn-register'>
											Register
										</button>
									</div>
									<div>
										<Link to={ '/login' }>You had account, login</Link>
									</div>
								</div>
							</form>

						</div>
					</div>
					<div className='login_content_right'>
						<div className='login_content_right_title'>
							<h2>
								Education
							</h2>
							<h4>
								Learn to work
							</h4>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Register;