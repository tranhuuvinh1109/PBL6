import React, { useContext, useCallback } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Popconfirm } from 'antd';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Highlighter from 'react-highlight-words';
import { AppContext } from '../../App';
import { useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { courseAPI } from '../../api/courseAPI';
import { toast } from 'react-hot-toast';

const CourseManagement = () => {
	const navigate = useNavigate();
	const context = useContext(AppContext);

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
			width: '5%',
			...getColumnSearchProps('id'),
			sortDirections: ['descend', 'ascend'],
		},
		{
			title: 'Image',
			dataIndex: 'image',
			key: 'image',
			width: '15%',
			render: (image) => (
				<img
					src={ image }
					alt="Product"
					className='object-cover'
					style={ { width: '100%', height: '100px' } }
				/>)
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
			width: '5%',
			...getColumnSearchProps('price'),
		},
		{
			title: 'Teacher',
			dataIndex: 'teacher',
			key: 'teacher',
			width: '5%',
			...getColumnSearchProps('teacher'),
		},
		{
			title: 'Description',
			dataIndex: 'description',
			key: 'description',
			width: '30%',
			...getColumnSearchProps('description'),
		},
		{
			title: '',
			dataIndex: 'edit',
			key: 'edit',
			width: '5%',
		},
		{
			title: '',
			dataIndex: 'delete',
			key: 'delete',
			width: '5%',
		},
	];
	const confirm = useCallback(async (id) => {
		const res = await courseAPI.deleteCourse(id);
		if (res.status === 200) {
			context.setListCourse(res.data.data);
			toast.success('Delete Course Successfully');
		} else {
			toast.error('Delete Course Fail');
		}
	}, [context]);

	const dataSource = useMemo(() => {
		if (context.listCourse) {
			return context.listCourse.map((course) => {
				return {
					...course,
					edit: <button onClick={ () => navigate(`edit/${course.id}`) }><FontAwesomeIcon icon={ faPenToSquare } /></button>,
					delete: <Popconfirm
						placement="topRight"
						title='Are you sure to delete this course?'
						description='Delete the course'
						onConfirm={ () => confirm(course.id) }
						okText="Yes"
						cancelText="No"
					>
						<button className='btn-danger'><FontAwesomeIcon icon={ faTrashCan } /></button>
					</Popconfirm>
				}
			})
		}
		return [];
	}, [context.listCourse, confirm, navigate])
	return (
		<div>
			<div className='flex justify-end'>
				<Button className='btn-custom' onClick={ () => navigate('create') }>
					Create Course
				</Button>
			</div>
			<Table columns={ columns } dataSource={ dataSource } className='mt-4' />;
		</div>
	)
}
export default CourseManagement;