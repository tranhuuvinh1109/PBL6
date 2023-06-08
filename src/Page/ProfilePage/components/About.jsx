import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { AppContext } from '../../../App';
import { useState } from 'react';
import { DatePicker, Select } from 'antd';
import { authAPI } from '../../../api/authApi';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';

const About = ({ setIsLoading }) => {
	const context = useContext(AppContext);
	const [dataProfile, setDataProfile] = useState({});

	const [edit, setEdit] = useState(false);

	const toggleButtonEdit = () => {
		setEdit(!edit);
	};

	const handleChangeField = (e) => {
		setDataProfile({ ...dataProfile, [e.target.name]: e.target.value });
	}

	const updateProfile = async () => {
		setIsLoading(true);
		const res = await authAPI.updateProfile({
			fullName: "",
			address: "",
			phone: "",
			avatar: "",
			gender: ""
		});
		console.log('dataProfile updated', dataProfile);
		if (res.status === 200) {
			console.log('Updated profile', res);
			toast.success('Profile updated');
		} else {
			console.log('errr', res);
		}
		setDataProfile(false);
	};


	useEffect(() => {
		if (context?.user?.id) {
			console.log('user', context?.user)
			setDataProfile(context?.user);
		}
	}, [context?.user])

	return (
		<div className='text-left'>
			<div className='flex justify-between'>
				<p className='my-4 text-gray-400 font-medium'>
					Contact Information
				</p>
				<button onClick={ toggleButtonEdit }>
					{
						edit ? <FontAwesomeIcon icon={ faCircleXmark } />
							: <FontAwesomeIcon icon={ faPenToSquare } />
					}
				</button>
			</div>
			<div className='flex mb-2.5 input-wrapper'>
				<div className='w-2/12'>
					<label htmlFor='fullName'>
						Fullname:
					</label>
				</div>
				<div className='w-8/12 ml-4'>
					{
						edit ? <input id='fullName' name='fullName' type='text' onChange={ handleChangeField } value={ dataProfile?.fullName } className='w-full' />
							: <p className='m-0 text-blue-600'>{ dataProfile?.fullName }</p>
					}
				</div>
			</div>
			<div className='flex mb-2.5 input-wrapper'>
				<div className='w-2/12'>
					<label htmlFor='phone'>
						Phone:
					</label>
				</div>
				<div className='w-8/12 ml-4'>
					{
						edit ? <input id='phone' name='phone' type='text' onChange={ handleChangeField } value={ dataProfile?.phone } className='w-full' />
							: <p className='m-0 text-blue-600'>{ dataProfile?.phone }</p>
					}
				</div>
			</div>
			<div className='flex mb-2.5 input-wrapper'>
				<div className='w-2/12'>
					<label htmlFor='address'>
						Address:
					</label>
				</div>
				<div className='w-8/12 ml-4'>
					{
						edit ? <input id='address' name='address' type='text' onChange={ handleChangeField } value={ dataProfile?.address } className='w-full' />
							: <p className='m-0'>{ dataProfile?.address }</p>
					}
				</div>
			</div>
			<div className='flex mb-2.5 input-wrapper'>
				<div className='w-2/12'>
					<label htmlFor='phone'>
						Email:
					</label>
				</div>
				<div className='w-8/12 ml-4'>
					<p className='m-0 text-blue-600'>{ dataProfile?.email }</p>
				</div>
			</div>


			<div>
				<p className='my-4 text-gray-400 font-medium'>
					Basic Information
				</p>
				<div>
					<div className='flex mb-2.5 input-wrapper'>
						<div className='w-2/12'>
							<label htmlFor='birthday'>
								Birthday:
							</label>
						</div>
						<div className='w-8/12 ml-4'>
							{
								edit ? <DatePicker />
									: <p className='m-0'>11/09/2002</p>
							}
						</div>
					</div>
					<div className='flex mb-2.5 input-wrapper'>
						<div className='w-2/12'>
							<label htmlFor='gender'>
								Gender:
							</label>
						</div>
						<div className='w-8/12 ml-4'>
							{
								edit ? <Select
									defaultValue={ dataProfile?.gender }
									style={ {
										width: 120,
									} }
									options={ [
										{
											value: 1,
											label: 'Male',
										},
										{
											value: 2,
											label: 'FeMale',
										},
									] }
								/>
									: <p className='m-0'>
										{
											dataProfile?.gender === 1 ? 'Male' : 'Female'
										}
									</p>
							}
						</div>
					</div>
				</div>
			</div>
			{
				edit && <div className='flex justify-end items-center'>
					<button className='btn-custom my-btn px-4 py-2' onClick={ updateProfile }>Save</button>
				</div>
			}

		</div>
	)
}

export default About;	