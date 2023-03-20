import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';


const UserClickContent = () => {
	return (
		<div className=''>
			<ul className='px-2 py-1 m-0 text-left '>
				<li >
					<Link to='/login' className='no-underline text-slate-800 hover:text-neutral-300' >
						<FontAwesomeIcon icon={faRightFromBracket} />
						<span className='ml-2 font-medium'>Logout</span>
					</Link>
				</li>
			</ul>
		</div>
	)
}

export default UserClickContent;