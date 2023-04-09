import React, { useContext, useState } from 'react';
import '../../Assets/css/Login.css';
import { Link } from "react-router-dom";
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { AppContext } from '../../App';
import { authAPI } from '../../api/authApi';


const Login = () => {
	const navigator = useNavigate();
	const [data, setData] = useState({
		username: '',
		email: '',
		password: ''
	})
	const context = useContext(AppContext)

	const handChange = (e) => {
		e.preventDefault();
		setData({ ...data, [e.target.name]: e.target.value });
	}
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (data.email && data.password) {
			try {
				const res = await authAPI.login(data)
				if (res.status === 200) {
					context.setUser(res.data.data);
					navigator('/');
					localStorage.setItem('userID', res.data.data.id);
					// localStorage.setItem('userID', res.data.refresh_token);
					toast.success('Login Successfully')
				}
			} catch (error) {
				console.log(error)
				toast.error('Nhap email passwordaaaaa')
			}
		} else {
			toast.error('Nhap email password')
		}
	};
	return (
		<div className="login">
			<div className="login_box rounded-lg shadow-2xl">
				<div className="login_content">
					<div className="top_link text-left text-[greenCustom]">
						<Link to='/' className='no-underline'>
							<FontAwesomeIcon icon={ faCircleArrowLeft } />
							<span className='ml-1.5'>Return home</span>
						</Link>
					</div>
					<h3 className='mt-5'>SIGN IN</h3>
					<div className="mt-10">
						<form
							onSubmit={ handleSubmit }
						>
							<div className='field-input'>
								<label htmlFor='email'>
									Email:
								</label>
								<input type='text' id='email' name='email' value={ data.email } onChange={ handChange } />
							</div>
							<div className='field-input'>
								<label htmlFor='password'>
									Password:
								</label>
								<input type='text' id='password' name='password' value={ data.password } onChange={ handChange } />
							</div>
							<div >
								<button type="submit" className='btn-custom'>Đăng nhập</button>
								Or <Link to='/register'>Create new account</Link>
							</div>
						</form>
						{/* <div className='field-input'>
							<label htmlFor='username'>
								Username:
							</label>
							<input type='text' id='username' name='username' value={ data.username } onChange={ handChange } />
						</div> */}

					</div>
				</div>
				{/* <div className="right hidden md:block">
					<div className="right-text">
						<h2>JLPT</h2>
						<h5>Teaching Japanese to everyone</h5>
					</div>
				</div> */}
			</div>
		</div>
	)
}
export default Login;