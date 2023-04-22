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
			context.setIsLoading(true);
			try {
				const res = await authAPI.login(data)
				if (res.status === 200) {
					context.setUser(res.data.data);
					navigator('/');
					localStorage.setItem('userID', res.data.data.id);
					// localStorage.setItem('userID', res.data.refresh_token);
					toast.success('Login Successfully');
					if (res.data.data.role === 2) {
						context.setIsAdmin(true);
					} else {
						context.setIsAdmin(false);
					}
				} else {
					throw new Error("Login failed");
				}
			} catch (error) {
				console.log(error)
				toast.error(error.message)
			}
			finally {
				context.setIsLoading(false);
			}
		} else {
			toast.error('Nhap email password')
		}
	};
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
								<h3 className=''>SIGN IN</h3>
								<div>
									<div className='field-input-wrapper'>
										<input type='text' placeholder='Email' className='w-full' id='email' name='email' value={ data.email } onChange={ handChange } />
									</div>
									<div className='field-input-wrapper'>
										<input type='password' placeholder='Password' className='w-full' id='password' name='password' value={ data.password } onChange={ handChange } />
									</div>
								</div>
								<div >
									<button type="submit" className='btn-login'>Login</button>
								</div>
								<div>
									<span>New here?</span> <Link to='/register'>Create new account</Link>
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
export default Login;