import logo from '../logo.svg';
import { Avatar, Breadcrumb, Layout, Menu, Popover, theme } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faBlog, faLightbulb } from '@fortawesome/free-solid-svg-icons'
import React, { useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import UserClickContent from './components/UserClickContent';
import { AppContext } from '../App';
import useCheckAdmin from '../hook/useCheckAdmin';
const { Content, Sider } = Layout;

const listMenu = [
	{
		title: 'Daskboard',
		icon: <FontAwesomeIcon icon={ faHouse } />,
		url: 'daskboard'
	},
	{
		title: 'Course',
		icon: <FontAwesomeIcon icon={ faLightbulb } />,
		url: 'course'
	},
	{
		title: 'Blog',
		icon: <FontAwesomeIcon icon={ faBlog } />,
		url: 'blog'
	},
]

const AdminContent = () => {
	const context = useContext(AppContext);
	const navigate = useNavigate();
	const {
		token: { colorBgContainer },
	} = theme.useToken();

	const isAdmin = useCheckAdmin(context?.user);

	if (!isAdmin) {
		return <div>
			Bạn không có quyền truy cập vào trang quản trị
			<button className='btn-custom ml-4 px-4 py-2' onClick={ () => navigate(-1) }>Back</button>
		</div>;
	}

	return (
		<Layout
			style={ {
				minHeight: '100vh',
			} }
		>
			<Sider
				theme='light'
			>
				<div
					style={ {
						height: 32,
						margin: 16,
					} }
				>
					<img src={ logo } alt='logo' />

				</div>
				<Menu theme="light" defaultSelectedKeys={ ['0'] } mode="inline">
					{
						listMenu.map((item, index) => {
							return (
								<Menu.Item icon={ item.icon } key={ index } onClick={ () => navigate(`${item.url}`) }>
									{
										item.title
									}
								</Menu.Item>
							)
						})
					}
				</Menu>
			</Sider>
			<Layout className="site-layout">
				<div className='bg-white h-16 relative'>
					<Popover content={ UserClickContent } trigger="click">
						<div className='float-right px-2 min-w-[200px] text-left bg-red-400 userClick'>
							<div className=''>
								<Avatar src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80" size='large' alt="user" />
								<span className='ml-1.5 text-base text-base font-semibold'>
									Admin
								</span>
							</div>
						</div>
					</Popover>
				</div>
				<Content
					style={ {
						margin: '0 16px',
					} }
				>
					<Breadcrumb
						style={ {
							margin: '16px 0',
						} }
					>
					</Breadcrumb>
					<div
						style={ {
							padding: 24,
							minHeight: 360,
							background: colorBgContainer,
						} }
					>
						<Outlet />
					</div>
				</Content>
			</Layout>
		</Layout>
	)
}

export default AdminContent;

