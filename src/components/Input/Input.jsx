import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';

const InputCustom = ({ name, id, icon, type, placeholder, required, value, onChange, onBlur, readOnly = false, ...props }) => {
	const [error, setError] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	const handleBlur = () => {
		if (required && !value) {
			setError('This field is required');
		} else {
			if (type === 'password' && value.length < 8) {
				setError('Password must not be less than 8 characters');
			} else {
				setError('');
			}
		}
		onBlur();
	};
	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	}
	if (type === 'password') {

		return (
			<div className='mb-20px'>
				<div className={ error ? 'form-error form-group' : 'form-group' } { ...props }>
					<label htmlFor={ id }>
						{ icon }
					</label>
					<input
						readOnly={ readOnly }
						name={ name }
						type={ showPassword ? 'text' : 'password' }
						value={ value }
						onChange={ onChange }
						placeholder={ placeholder }
						onBlur={ handleBlur }
						className={ error ? 'input-error' : '' }
					/>
					<button onClick={ handleClickShowPassword } className='btn-show-pass' tabIndex={ -1 }>
						{
							showPassword ? <FontAwesomeIcon icon={ faEye } fontSize={ 10 } />
								: <FontAwesomeIcon icon={ faEyeSlash } fontSize={ 10 } />
						}
					</button>
				</div>
				{ error && <p className='text-xs text-red-500 w-full m-0'>{ error }</p> }
			</div>
		)
	}

	return (
		<div className='mb-20px'>
			<div className={ error ? 'form-error form-group' : 'form-group' } { ...props }>
				<label htmlFor={ id }>
					{ icon }
				</label>
				<input
					readOnly={ readOnly }
					name={ name }
					type={ type }
					value={ value }
					onChange={ onChange }
					placeholder={ placeholder }
					onBlur={ handleBlur }
					className={ error ? 'input-error' : '' }
				/>
			</div>
			{ error && <p className='text-xs text-red-500 w-full m-0'>{ error }</p> }
		</div>

	);
}

export default InputCustom;