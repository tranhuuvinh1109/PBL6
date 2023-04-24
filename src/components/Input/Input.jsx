import React, { useState } from 'react';

const InputCustom = ({ name, id, icon, type, placeholder, required, value, onChange, onBlur, readOnly = false, ...props }) => {
	const [error, setError] = useState('');

	const handleBlur = () => {
		if (required && !value) {
			setError('This field is required');
		} else {
			setError('');
		}

		onBlur();
	};

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