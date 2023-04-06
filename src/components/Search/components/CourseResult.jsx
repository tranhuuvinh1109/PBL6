import React from "react";

const CourseResult = ({ data }) => {
	return (
		<div className="flex mb-2">
			{
				data.image && <img src={data.image} alt="course" className="w-20 h-12 object-cover rounded-lg" />
			}
			{
				data.name && <h6 className="ml-2 whitespace-nowrap text-ellipsis overflow-hidden">{data.name}</h6>
			}
		</div>
	)
}

export default CourseResult;