import { Avatar } from 'antd';
import React from 'react';

const CommentItem = ({ comment }) => {
	return (
		<div className='flex text-left mb-3'>
			<div>
				<Avatar src={ comment?.user?.avatar } size="large" />
			</div>
			<div className='ml-2'>
				<div className='flex'>
					<p className='m-0'>
						<span className='text-base font-medium'>
							{
								comment?.user?.name
							}
						</span>
						<span className='ml-1.5 text-xs text-gray-500'>
							{/* {
								comment.createAt
							} */}
						</span>
					</p>
				</div>
				<div className=''>
					<p className='m-0 text-sm'>
						{
							comment?.content
						}
					</p>
				</div>
			</div>
		</div>
	)
}

export default CommentItem;