import React, { useEffect, useState, useMemo, useRef } from 'react';
import { blogAPI } from '../../api/blogApi';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Space, Table, Popconfirm, Avatar } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import parse from 'html-react-parser';


const truncateString = (str, maxLength = 100) => {
	if (str.length > maxLength) {
		const index = str.indexOf('</p');
		let end = '';
		if (index !== -1) {
			end = str.substring(index);
		}
		return str.slice(0, maxLength) + "..." + end;
	} else {
		return str;
	}
}

const BlogManagement = () => {
	const [listBlog, setListBlog] = useState([]);
	const navigate = useNavigate();
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
			title: 'Title',
			dataIndex: 'title',
			key: 'title',
			width: '20%',

		},
		{
			title: 'Image',
			dataIndex: 'image',
			key: 'image',
			width: '20%',
			render: (image) => (
				<img src={ image } alt='blog' />
			)
		},
		{
			title: 'Creator',
			dataIndex: 'user',
			key: 'name',
			width: '15%',
			render: (user) => (
				<>
					<Avatar src={ user.avatar } alt='avatar' />
					<span>{ user.fullName }</span>
				</>),
		},
		{
			title: 'Content',
			dataIndex: 'content',
			width: '30%',
			key: 'content',
			render: (content) => {
				return parse(truncateString(content));
			}
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

	const dataSource = useMemo(() => {
		if (listBlog) {
			return listBlog.map((course, index) => {
				return {
					...course,
					key: index,
					edit: <button onClick={ () => navigate(`edit/${course.id}`) }><FontAwesomeIcon icon={ faPenToSquare } /></button>,
					delete: <Popconfirm
						placement="topRight"
						title='Are you sure to delete this course?'
						description='Delete the course'
						okText="Yes"
						cancelText="No"
					>
						<button className='btn-danger'><FontAwesomeIcon icon={ faTrashCan } /></button>
					</Popconfirm>
				}
			})
		}
		return [];
	}, [listBlog, navigate])
	const getAllBlog = async () => {
		const res = await blogAPI.getAll();
		if (res.status === 200) {
			setListBlog(res.data);
		} else {
			console.log('blog error', res)
		}


	}
	useEffect(() => {
		getAllBlog();
	}, [])

	return (
		<div>
			<div className='flex justify-between'>
				<h1>
					BlogManagement Daskboard
				</h1>
				<Button className='btn-custom'>
					Create Blog
				</Button>
			</div>
			<div>
				<Table columns={ columns } dataSource={ dataSource } className='mt-4' />;
			</div>

		</div>
	)
}

export default BlogManagement;