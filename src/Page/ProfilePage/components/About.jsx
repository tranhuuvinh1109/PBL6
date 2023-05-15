import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { AppContext } from '../../../App';
import { useState } from 'react';
import { DatePicker, Select } from 'antd';

const About = () => {
	const context = useContext(AppContext);
	const [edit, setEdit] = useState(false);

	const toggleButtonEdit = () => {
		setEdit(!edit);
	};

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
					<label htmlFor='phone'>
						Phone:
					</label>
				</div>
				<div className='w-8/12 ml-4'>
					{
						edit ? <input id='phone' name='phone' type='text' value={ context?.user?.phone } className='w-full' />
							: <p className='m-0 text-blue-600'>{ context?.user?.phone }</p>
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
						edit ? <input id='address' name='address' type='text' value={ context?.user?.address } className='w-full' />
							: <p className='m-0'>{ context?.user?.address }</p>
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
					{
						edit ? <input id='phone' name='phone' type='email' value={ context?.user?.email } className='w-full' />
							: <p className='m-0 text-blue-600'>{ context?.user?.email }</p>
					}
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
									defaultValue={ context?.user?.gender }
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
											context?.user?.gender === 1 ? 'Male' : 'Female'
										}
									</p>
							}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default About;	