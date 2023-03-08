import React from 'react';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const ListItem = ({ infor }) => {
	return (
		<div>
			<FontAwesomeIcon icon={faCirclePlay} />
			<button>
				{infor?.name}
			</button>
		</div>
	)
}

export default ListItem;