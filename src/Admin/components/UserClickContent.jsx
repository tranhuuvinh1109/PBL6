import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import { faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';


const UserClickContent = () => {
	return (
		<div>
			<ul className='p-0 m-0'>
				<li>
					<Link to='/login' className='no-underline'>
						<FontAwesomeIcon icon={faRightFromBracket} />
						Logout
					</Link>
				</li>
				<li>
					<Link to='/login' className='no-underline'>
						<FontAwesomeIcon icon={faUser} />
						Profile
					</Link>
				</li>
			</ul>
		</div>
	)
}

export default UserClickContent;