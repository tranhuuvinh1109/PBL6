import React, { useState } from 'react';

const InputCustom = ({ name, id, type, placeholder, required, value, onChange, onBlur, ...props }) => {
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
		<div className='field-input-wrapper' { ...props }>
			<input
				name={ name }
				type={ type }
				value={ value }
				onChange={ onChange }
				placeholder={ placeholder }
				onBlur={ handleBlur }
				className={ error ? 'input-error' : '' }
			/>
			{ error && <p className='text-xs text-red-500 w-full mt-1'>{ error }</p> }
		</div>
	);
}

export default InputCustom;