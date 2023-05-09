import React from "react";

const Input = (name, field, readOnly, icon, value) => {


	return (
		<div>
			<label id={ name } >{ icon }
				<span>
					{ field }
				</span>
			</label>
			<input readOnly={ readOnly } value={ value } />
		</div>
	)
}
export default Input;