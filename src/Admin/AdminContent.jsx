import logo from '../logo.png';
import { Avatar, Breadcrumb, Layout, Menu, Popover, theme } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faBlog, faLightbulb, faChartLine } from '@fortawesome/free-solid-svg-icons'
import React, { useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import UserClickContent from './components/UserClickContent';
import useCheckAdmin from '../hook/useCheckAdmin';
import { AppContext } from '../App';
const { Content, Sider } = Layout;

const listMenu = [
	{
		title: 'Daskboard',
		icon: <FontAwesomeIcon icon={ faChartLine } />,
		url: ''
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
	{
		title: 'Home',
		icon: <FontAwesomeIcon icon={ faHouse } />,
		url: '/'
	},
]

const AdminContent = () => {
	const context = useContext(AppContext);
	const navigate = useNavigate();
	const {
		token: { colorBgContainer },
	} = theme.useToken();
	const isAdmin = useCheckAdmin(context);

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
						height: 68,
						marginLeft: 20,
						marginTop: 4
					} }
				>
					<img src={ logo } alt='logo' className='w-16 h-16 rounded-lg object-cover object-center' />

				</div>
				<Menu theme="light" defaultSelectedKeys={ ['0'] } mode="inline">
					{
						listMenu.map((item) => {
							return (
								<Menu.Item icon={ item.icon } key={ item.title } onClick={ () => navigate(`${item.url}`) }>
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
								{
									context?.user && <>
										<Avatar src={ context.user.avatar } size='large' alt="user" />
										<span className='ml-1.5 text-base text-base font-semibold'>
											{
												context.user.username
											}
										</span>
									</>
								}

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

