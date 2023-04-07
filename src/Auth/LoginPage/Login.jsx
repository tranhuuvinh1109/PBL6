import React, { useContext } from 'react';
import '../../Assets/css/Login.css';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { Link } from "react-router-dom";
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { AppContext } from '../../App';
import { authAPI } from '../../api/authApi';


const Login = () => {
	const navigator = useNavigate();
	const context = useContext(AppContext)
	const onFinish = async (values) => {
		// await fetch('https://agonizing-star-production.up.railway.app/api/login', {
		// 	method: 'POST',
		// 	headers: {
		// 		'Accept': 'application/json',
		// 		'Content-Type': 'application/json'
		// 	},
		// 	body: JSON.stringify(values)
		// }).then((res) => {
		// 	// console.log(res); // Log the response object
		// 	return res.json(); // Return the parsed JSON
		// }).then((data) => {
		// 	console.log(data);
		// }).catch(function (err) {
		// 	console.log(err)
		// })



		if (values.email && values.password) {
			try {

				const res = await authAPI.login(values)
				if (res.status === 200) {
					context.setUser(res.data.data);
					navigator('/');
					localStorage.setItem('userID', res.data.refresh_token);
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
			<div className="login_box">
				<div className="left">
					<div className="top_link text-left text-[greenCustom]">
						<Link to='/' className='no-underline'>
							<FontAwesomeIcon icon={ faCircleArrowLeft } />
							<span className='ml-1.5'>Return home</span>
						</Link>
					</div>
					<h3 className='mt-5'>SIGN IN</h3>
					<div className="contact">
						<Form
							size='small'
							name="normal_login"
							className="login-form"
							initialValues={ { remember: true } }
							onFinish={ onFinish }
						>
							<Form.Item
								name="email"
								rules={ [{ required: true, message: 'Please input your Email!' }] }
							>
								<Input prefix={ <UserOutlined className="site-form-item-icon" /> } placeholder="Email" />
							</Form.Item>
							<Form.Item
								name="password"
								rules={ [{ required: true, message: 'Please input your Password!' }] }
							>
								<Input
									style={ { margin: 0 } }
									prefix={ <LockOutlined className="site-form-item-icon" /> }
									type="password"
									placeholder="Password"
								/>
							</Form.Item>
							{/* <Form.Item>
								<Form.Item name="remember" valuePropName="checked" noStyle>
									<Checkbox>Remember me</Checkbox>
								</Form.Item>
							</Form.Item> */}

							<Form.Item>
								<Button type="primary" htmlType="submit" className="login-form-button w-full">
									Log in
								</Button>
							</Form.Item>
							<Form.Item>
								Or <Link to='register'>Create new account</Link>
							</Form.Item>
						</Form>
					</div>
				</div>
				<div className="right hidden md:block">
					<div className="right-text">
						<h2>JLPT</h2>
						<h5>Teaching Japanese to everyone</h5>
					</div>
				</div>
			</div>
		</div>
	)
}
export default Login;