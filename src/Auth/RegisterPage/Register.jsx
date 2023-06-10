import '../../Assets/css/Register.css';
import registerImage from '../../Assets/images/signup-image.jpg';
import React, { useState, useContext } from 'react';
import { Link } from "react-router-dom";
import { faCircleArrowLeft, faUser, faLock, faAt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { AppContext } from '../../App';
import { authAPI } from '../../api/authApi';
import { Radio, Select } from 'antd';
import InputCustom from '../../components/Input/Input';
import axios from 'axios';


const apiSendMail = axios.create({
	baseURL: "https://bemomentlearning-production.up.railway.app/api",
	headers: {
		"Content-Type": "application/json"
	}
});

// const pattern = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
// const checkUsername = /[A-Z]/;
const formField = [
	{
		id: 'username',
		type: 'text',
		required: true,
		placeholder: 'Your Name',
		icon: <FontAwesomeIcon icon={ faUser } fontSize={ 14 } />,
		name: 'username',
	},
	{
		id: 'email',
		type: 'email',
		required: true,
		placeholder: 'Your Email',
		icon: <FontAwesomeIcon icon={ faAt } fontSize={ 14 } />,
		name: 'email',
	},
	{
		id: 'password',
		type: 'password',
		required: true,
		placeholder: 'Password',
		icon: <FontAwesomeIcon icon={ faLock } fontSize={ 14 } />,
		name: 'password',
	},
	{
		id: 'confirmPassword',
		type: 'password',
		required: true,
		placeholder: 'Repeat your password',
		icon: <FontAwesomeIcon icon={ faLock } fontSize={ 14 } />,
		name: 'confirmPassword',
	}
]
const Register = () => {
	const navigate = useNavigate();
	const context = useContext(AppContext)
	const [agree, setAgree] = useState(false);
	const [data, setData] = useState({
		username: '',
		email: '',
		age: 0,
		password: '',
		gender: 0,
		google_id: 'none',
		full_name: 'none',
		confirmPassword: '',
		phone: 'none',
		address: 'none',
		avatar: 'https://fullstack.edu.vn/static/media/fallback-avatar.155cdb2376c5d99ea151.jpg'
	});
	const handleChange = (e) => {
		e.preventDefault();
		setData({ ...data, [e.target.name]: e.target.value });
	};

	const handleChangeRole = (value) => {
		setData({ ...data, role: value });
	};
	const sendMailRegisterSuccess = async (username, email, password) => {
		const res = await apiSendMail.post(`/register-response`, {
			username: username,
			email: email,
			password: password
		});
		if (res.status === 201) {
			toast.success("Register Success !");
		} else {
			toast.error("Register fail !");
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		context.setIsLoading(true);
		if (agree) {
			if (data.password === data.confirmPassword) {
				const res = await authAPI.register({
					username: data.username,
					gender: data.gender,
					email: data.email,
					password: data.password,
					avatar: data.avatar,
					address: data.address,
					phone: data.phone,
					age: data.age,
					full_name: data.full_name,
					google_id: data.google_id
				});
				if (res.status === 201) {
					toast.success('Register successful');
					navigate('/login');
					sendMailRegisterSuccess(data.username, data.email, data.password)
				} else {
					toast.error('Register fail');
				}
			}
			else {
				toast.error("Password does not match confirm password, Please check again");
			}
		} else {
			toast.error("Please read Terms of service");
		}
		context.setIsLoading(false);
	};

	const handleChangeAgree = (e) => {
		setAgree(e.target.checked);
	}

	return (
		<div className='register-container'>
			<div className='register-content'>
				<div className='register-form'>
					<div className='back-home'>
						<Link to='/' className='no-underline'>
							<FontAwesomeIcon icon={ faCircleArrowLeft } />
							<span className='ml-1.5'>Return home</span>
						</Link>
					</div>
					<div className='form-content'>
						<h2 className='form-title'>Register</h2>
						{
							formField.map((field) => {
								return (
									<InputCustom key={ field.id } type={ field.type } icon={ field.icon } id={ field.id } placeholder={ field.placeholder } required={ field.required } name={ field.name } value={ data[field.name] } onChange={ handleChange } onBlur={ () => { } } />
								)
							})
						}
						<Radio.Group onChange={ handleChange } value={ data.gender } name='gender' className='w-full  mb-20px flex  justify-between'>
							<Radio value={ 0 }>Male</Radio>
							<Radio value={ 1 }>FeMale</Radio>
						</Radio.Group>
						<div className='form-group mb-20px'>
							<Select
								name="role"
								onChange={ handleChangeRole }
								style={ {
									width: 120,
								} }
								defaultValue={ 2 }
								options={ [
									{
										value: 1,
										label: 'Teacher'
									},
									{
										value: 2,
										label: 'Student'
									}
								] }
							/>
						</div>
						<div className='form-group-agree'>
							<input type='checkbox' name='agree' className='agree-input' id='agree' value={ agree } onChange={ e => handleChangeAgree(e) } />
							<span className='agree-label'>
								I agree all statements in Terms of service
							</span>
						</div>
						<div className='form-group form-button'>
							<button className='btn-register' onClick={ handleSubmit }>
								Register
							</button>
							<Link to={ '/login' }>You had account, login</Link>
						</div>
					</div>
				</div>
				<div className='register-image'>
					<img src={ registerImage } alt='register' />
				</div>
			</div>
		</div>
	)
}

export default Register;