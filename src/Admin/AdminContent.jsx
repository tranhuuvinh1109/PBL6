import logo from '../logo.svg';
import logoSmall from '../logo-small.svg';
import { PieChartOutlined, DesktopOutlined } from '@ant-design/icons';
import { Avatar, Breadcrumb, Layout, Menu, Popover, theme } from 'antd';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import UserClickContent from './components/UserClickContent';
const { Header, Content, Footer, Sider } = Layout;
function getItem (label, key, icon, children) {
	return {
		key,
		icon,
		children,
		label,
	};
}
const items = [
	getItem('Option 1', '1', <PieChartOutlined />, undefined),
	getItem('Option 2', '2', <DesktopOutlined />, undefined),
	// getItem('User', 'sub1', <UserOutlined />, [
	//   getItem('Tom', '3', undefined, undefined),
	//   // getItem('Bill', '4'),
	//   // getItem('Alex', '5'),
	// ], undefined),
	// getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
	// getItem('Files', '9', <FileOutlined />),
];

const AdminContent = () => {
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
						// background: 'rgba(255, 255, 255, 0.2)',
					}}
				>
					{
						collapsed ? <img src={logoSmall} alt='logo' className='w-full' />
							: <img src={logo} alt='logo' />
					}

				</div>
				<Menu theme="light" defaultSelectedKeys={['1']} mode="inline" items={items} />
			</Sider>
			<Layout className="site-layout">
				<Header
					style={{
						padding: 0,
						background: colorBgContainer,
					}}
				>
					<Popover content={UserClickContent} trigger="click">
						<div className='bg-red-500 max-w-[14rem]'>
							<Avatar src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80" size='large' alt="user" />
							<span>
								Admin
							</span>
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

