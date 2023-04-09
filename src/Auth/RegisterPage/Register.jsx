import React, { useEffect, useState } from 'react';
import '../../Assets/css/Login.css';
import { Link } from "react-router-dom";
import { faCircleArrowLeft, faUpload, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { AppContext } from '../../App';

import { Select } from 'antd';

const Register = () => {
	const [selectedFile, setSelectedFile] = useState({});
	const [data, setData] = useState({
		username: '',
		email: '',
		password: '',
		phone: '',
		gender: '',
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
	useEffect(() => {
		return () => {
			selectedFile && URL.revokeObjectURL(selectedFile.preview);
		}
	}, [selectedFile]);
	return (
		<div className="register h-screen flex justify-center items-center">
			<div className="register_wrapper rounded-lg shadow-2xl">
				<div className="register_content">
					<div className="top_link text-left text-[greenCustom]">
						<Link to='/' className='no-underline'>
							<FontAwesomeIcon icon={ faCircleArrowLeft } />
							<span className='ml-1.5'>Return home</span>
						</Link>
					</div>
					<h3 className='mt-5'>Register</h3>
					<div className="">
						<div className='field-input'>
							<label htmlFor='username'>
								Username:
							</label>
							<input type='text' id='username' name='username' value={ data.username } onChange={ handChange } />
						</div>
						<div className='field-input'>
							<label htmlFor='email'>
								Email:
							</label>
							<input type='email' id='email' name='email' value={ data.email } onChange={ handChange } />
						</div>
						<div className='field-input'>
							<label htmlFor='phone'>
								Phone:
							</label>
							<input type='text' id='phone' name='phone' value={ data.phone } onChange={ handChange } />
						</div>
						<div className='field-input'>
							<label htmlFor='gender'>
								Gender:
							</label>
							<Select
								style={ {
									width: 120,
								} }
								options={ [
									{
										value: 0,
										label: 'Male',
									},
									{
										value: 1,
										label: 'Female',
									}
								] }
							/>
						</div>
						<div className='field-input'>
							<label htmlFor='password'>
								Password:
							</label>
							<input type='password' id='password' name='password' value={ data.password } onChange={ handChange } />
						</div>
						<div className='field-input'>
							<label htmlFor='confirm-password'>
								Confirm password:
							</label>
							<input type='password' id='confirm-password' name='confirmPassword' value={ data.confirmPassword } onChange={ handChange } />
						</div>
						<div className='field-input '>
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
							<Link to={ '/login' }>You had account, login</Link>
							<button className='btn-custom'>
								Register
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Register;