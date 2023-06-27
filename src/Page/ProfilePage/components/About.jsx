import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { DatePicker, Select } from 'antd';
import { authAPI } from '../../../api/authApi';
import { toast } from 'react-hot-toast';
import { ProfileContext } from '../ProfilePage';
import uploadFileWithProgress from '../../../Firebase/uploadFileWithProgress';
import { AppContext } from '../../../App';
import { EnCodeBase64 } from '../../../hook/EnCodeBase64';

const About = () => {
	const context = useContext(AppContext);
	const profileContext = useContext(ProfileContext);

	const onChange = (_date, dateString) => {
		profileContext.setDataProfile({ ...profileContext?.dataProfile, birthday: dateString });
	};

	const toggleButtonEdit = () => {
		profileContext.setIsEdit(!profileContext.isEdit);
	};

	const handleChangeField = (e) => {
		profileContext?.setDataProfile({ ...profileContext?.dataProfile, [e.target.name]: e.target.value });
	}

	const updateProfile = async () => {
		profileContext.setIsLoading(true);
		let url = '';
		if (profileContext.avatar?.name) {
			url = await uploadFileWithProgress(profileContext.avatar, 'images/avatar', profileContext.avatar.name, profileContext.setProgress);
		} else {
			url = profileContext.avatar.preview;
		}


		const res = await authAPI.updateProfile(EnCodeBase64({
			fullname: profileContext.dataProfile.fullname,
			address: profileContext.dataProfile.address,
			phone: profileContext.dataProfile.phone,
			avatar: url,
			id: context?.user?.id,
			birthday: profileContext.dataProfile.birthday
		}));
		if (res.status === 200) {
			context.setUser(res.data.data)
			toast.success('Profile updated');
		} else {
			toast.error('Profile failed');
		}
		profileContext.setIsLoading(false);
	};



	return (
		<div className='text-left'>
			<div className='flex justify-between'>
				<p className='my-4 text-gray-400 font-medium'>
					Contact Information
				</p>
				<button onClick={ toggleButtonEdit }>
					{
						profileContext.isEdit ? <FontAwesomeIcon icon={ faCircleXmark } />
							: <FontAwesomeIcon icon={ faPenToSquare } />
					}
				</button>
			</div>
			<div className='flex mb-2.5 input-wrapper'>
				<div className='w-2/12'>
					<label htmlFor='fullname'>
						Fullname:
					</label>
				</div>
				<div className='w-8/12 ml-4'>
					{
						profileContext.isEdit ? <input id='fullname' name='fullname' type='text' onChange={ handleChangeField } value={ profileContext?.dataProfile?.fullname } className='w-full' />
							: <p className='m-0 text-blue-600'>{ profileContext?.dataProfile?.fullname }</p>
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
						profileContext.isEdit ? <input id='phone' name='phone' type='text' onChange={ handleChangeField } value={ profileContext?.dataProfile?.phone } className='w-full' />
							: <p className='m-0 text-blue-600'>{ profileContext?.dataProfile?.phone }</p>
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
						profileContext.isEdit ? <input id='address' name='address' type='text' onChange={ handleChangeField } value={ profileContext?.dataProfile?.address } className='w-full' />
							: <p className='m-0'>{ profileContext?.dataProfile?.address }</p>
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
					<p className='m-0 text-blue-600'>{ profileContext?.dataProfile?.email }</p>
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
								profileContext.isEdit ? <DatePicker onChange={ onChange } />
									: <p className='m-0'>{ profileContext?.dataProfile?.birthday }</p>
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
								profileContext.isEdit ? <Select
									defaultValue={ profileContext?.dataProfile?.gender }
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
											profileContext?.dataProfile?.gender === 1 ? 'Male' : 'Female'
										}
									</p>
							}
						</div>
					</div>
				</div>
			</div>
			{
				profileContext.isEdit && <div className='flex justify-end items-center'>
					<button className='btn-custom my-btn px-4 py-2' onClick={ updateProfile }>Save</button>
				</div>
			}

		</div>
	)
}

export default About;	