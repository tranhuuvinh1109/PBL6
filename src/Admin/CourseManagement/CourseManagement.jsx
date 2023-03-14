import React from 'react';
// import { Avatar, List } from 'antd';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Modal, Space, Table } from 'antd';
import { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import CreateCourse from './CreateCourse/CreateCourse';
const data = [
	{
		id: '1',
		name: 'John Brown',
		price: 32,
		description: 'New York No. 1 Lake Park',
		teacher: 'John',
		category: 'English',
	},
	{
		id: '2',
		name: 'Joe Black',
		price: 42,
		description: 'London No. 1 Lake Park',
		teacher: 'Joe',
		category: 'Japanese',
	},
	{
		id: '3',
		name: 'Jim Green',
		price: 32,
		description: 'Sydney No. 1 Lake Park',
		teacher: 'Jim',
		category: 'Vietnamese',
	},
	{
		id: '4',
		name: 'Jim Red',
		price: 32,
		description: 'London No. 2 Lake Park',
		teacher: 'Jim',
		category: 'Spanish',
	},
];
const CourseManagement = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};
	const [searchText, setSearchText] = useState('');
	const [searchedColumn, setSearchedColumn] = useState('');
	const searchInput = useRef(null);
	const handleSearch = (selectedKeys, confirm, dataIndex) => {
		confirm();
		setSearchText(selectedKeys[0]);
		setSearchedColumn(dataIndex);
	};
	const handleReset = (clearFilters) => {
		clearFilters();
		setSearchText('');
	};
	const getColumnSearchProps = (dataIndex) => ({
		filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
			<div
				style={ {
					padding: 8,
				} }
				onKeyDown={ (e) => e.stopPropagation() }
			>
				<Input
					ref={ searchInput }
					placeholder={ `Search ${dataIndex}` }
					value={ selectedKeys[0] }
					onChange={ (e) => setSelectedKeys(e.target.value ? [e.target.value] : []) }
					onPressEnter={ () => handleSearch(selectedKeys, confirm, dataIndex) }
					style={ {
						marginBottom: 8,
						display: 'block',
					} }
				/>
				<Space>
					<Button
						type="primary"
						onClick={ () => handleSearch(selectedKeys, confirm, dataIndex) }
						icon={ <SearchOutlined /> }
						size="small"
						style={ {
							width: 90,
						} }
					>
						Search
					</Button>
					<Button
						onClick={ () => clearFilters && handleReset(clearFilters) }
						size="small"
						style={ {
							width: 90,
						} }
					>
						Reset
					</Button>
					<Button
						type="link"
						size="small"
						onClick={ () => {
							confirm({
								closeDropdown: false,
							});
							setSearchText(selectedKeys[0]);
							setSearchedColumn(dataIndex);
						} }
					>
						Filter
					</Button>
					<Button
						type="link"
						size="small"
						onClick={ () => {
							close();
						} }
					>
						close
					</Button>
				</Space>
			</div>
		),
		filterIcon: (filtered) => (
			<SearchOutlined
				style={ {
					color: filtered ? '#1890ff' : undefined,
				} }
			/>
		),
		onFilter: (value, record) =>
			record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
		onFilterDropdownOpenChange: (visible) => {
			if (visible) {
				setTimeout(() => searchInput.current?.select(), 100);
			}
		},
		render: (text) =>
			searchedColumn === dataIndex ? (
				<Highlighter
					highlightStyle={ {
						backgroundColor: '#ffc069',
						padding: 0,
					} }
					searchWords={ [searchText] }
					autoEscape
					textToHighlight={ text ? text.toString() : '' }
				/>
			) : (
				text
			),
	});
	const columns = [
		{
			title: 'ID',
			dataIndex: 'id',
			key: 'id',
			width: '10%',
			...getColumnSearchProps('id'),
			sorter: (a, b) => {
				console.log(1111, a, b)
			},
			sortDirections: ['descend', 'ascend'],
		},
		{
			title: 'Name Course',
			dataIndex: 'name',
			key: 'name',
			width: '20%',
			...getColumnSearchProps('name'),
		},
		{
			title: 'Category',
			dataIndex: 'category',
			widtd: '10%',
			key: 'category',
			...getColumnSearchProps('category'),
			// sorter: (a, b) => a.address.length - b.address.length,
			// sortDirections: ['descend', 'ascend'],
		}, {
			title: 'Price',
			dataIndex: 'price',
			key: 'price',
			width: '10%',
			...getColumnSearchProps('price'),
		},
		{
			title: 'Teacher',
			dataIndex: 'teacher',
			key: 'teacher',
			width: '10%',
			...getColumnSearchProps('teacher'),
		},
		{
			title: 'Description',
			dataIndex: 'description',
			key: 'description',
			width: '40%',
			...getColumnSearchProps('description'),
		},
	];
	return (
		<div>
			<div className='flex justify-between'>
				<h1>
					Course Daskboard
				</h1>
				<Button className='btn-custom' onClick={ showModal }>
					Create Course
				</Button>
				<Modal title="Basic Modal" open={ isModalOpen } onOk={ handleOk } onCancel={ handleCancel } width={ 1200 }>
					<div>
						<CreateCourse />
					</div>
				</Modal>
			</div>
			<Table columns={ columns } dataSource={ data } className='mt-4' />;
		</div>
	)
}
export default CourseManagement;