import React from "react";
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LessonItem = ({ lesson, setActived, isActive }) => {
	return (
		<div onClick={() => setActived(lesson.id)}
			className={
				isActive ? 'px-1.5 py-1.5 my-1 text-left cursor-pointer bg-stone-200 text-neutral-500'
					:
					'px-1.5 py-1.5 my-1 text-left cursor-pointer hover:bg-stone-200 hover:text-neutral-500'
			}>
			<FontAwesomeIcon icon={faCirclePlay} fontSize={16} />
			<span className="ml-1.5 text-sm font-medium text-base">
				{
					lesson.title
				}
			</span>
		</div>
	)
}

export default LessonItem;