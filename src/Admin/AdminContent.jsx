import logo from '../logo.svg';
import logoSmall from '../logo-small.svg';
import { PieChartOutlined, DesktopOutlined } from '@ant-design/icons';
import { Avatar, Breadcrumb, Layout, Menu, Popover, theme } from 'antd';
import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import UserClickContent from './components/UserClickContent';
const { Header, Content, Footer, Sider } = Layout;

const listMenu = [
	{
		title: 'Dashboard',
		icon: <DesktopOutlined />,
		url: 'dashboard'
	},
	{
		title: 'Course',
		icon: <PieChartOutlined />,
		url: 'course'
	},
	{
		title: 'Event',
		icon: <DesktopOutlined />,
		url: 'event'
	},
]

const AdminContent = () => {
	const navigate = useNavigate();
	const [collapsed, setCollapsed] = useState(false);
	const {
		token: { colorBgContainer },
	} = theme.useToken();
	return (
		<Layout
			style={{
				minHeight: '100vh',
			}}
		>
			<Sider
				collapsible collapsed={collapsed} onCollapse={(value) => {
					console.log('collapsed', value)
					setCollapsed(value)
				}} theme='light'
			>
				<div
					style={{
						height: 32,
						margin: 16,
					}}
				>
					{
						collapsed ? <img src={logoSmall} alt='logo' className='w-full' />
							: <img src={logo} alt='logo' />
					}

				</div>
				<Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
					{
						listMenu.map((item, index) => {
							return (
								<Menu.Item icon={item.icon} key={index} onClick={() => navigate(`${item.url}`)}>
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
				<Header
					style={{
						padding: 0,
						background: colorBgContainer,
					}}
				>
					<Popover content={UserClickContent} trigger="click">
						<div className='float-right px-2 min-w-[200px] text-left'>
							<div className=''>
								<Avatar src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80" size='large' alt="user" />
								<span className='ml-1.5 text-base text-base font-semibold'>
									Admin
								</span>
							</div>

						</div>

					</Popover>

				</Header>
				<Content
					style={{
						margin: '0 16px',
					}}
				>
					<Breadcrumb
						style={{
							margin: '16px 0',
						}}
					>
						<Breadcrumb.Item>User</Breadcrumb.Item>
						<Breadcrumb.Item>Bill</Breadcrumb.Item>
					</Breadcrumb>
					<div
						style={{
							padding: 24,
							minHeight: 360,
							background: colorBgContainer,
						}}
					>
						<Outlet />
					</div>
				</Content>
				<Footer
					style={{
						textAlign: 'center',
					}}
				>
					Ant Design ©2023 Created by Ant UED
				</Footer>
			</Layout>
		</Layout>
	)
}

export default AdminContent;

