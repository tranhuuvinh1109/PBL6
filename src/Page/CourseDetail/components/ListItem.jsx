import React from 'react';

const ListItem = ({ infor, setIdLecture }) => {
	return (
		<div>
			<button onClick={() => setIdLecture(infor.id)}>
				{infor?.name}
			</button>
		</div>
	)
}

export default ListItem;