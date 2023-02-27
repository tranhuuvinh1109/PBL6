import React from 'react';
import Course from '../../components/Course/Course';


const listCourse = [
	{
		id: 1,
		name: 'JLPT N1',
		description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt laborum.',
		price: 500,
		image: 'https://znews-photo.zingcdn.me/w660/Uploaded/dqmblcvo/2022_07_04/real_madrid_5.jpg'
	},
	{
		id: 2,
		name: 'JLPT N2',
		description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt laborum.',
		price: 500,
		image: 'https://mega.com.vn/media/news/0206_hinh-nen-MU-may-tinh28.jpg'
	},
	{
		id: 3,
		name: 'JLPT N3',
		description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt laborum.',
		price: 500,
		image: 'https://znews-photo.zingcdn.me/w660/Uploaded/dqmblcvo/2022_07_04/real_madrid_5.jpg'
	},
	{
		id: 4,
		name: 'JLPT N4',
		description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt laborum.',
		price: 500,
		image: 'https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blt47e54933360c1620/625af04cd9fee5493d1255de/GettyImages-1240024030(1).jpg'
	},
	{
		id: 5,
		name: 'JLPT N5',
		description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt laborum.',
		price: 500,
		image: 'https://images2.thanhnien.vn/Uploaded/gianglao/2022_04_07/benzema-afp-1371.jpeg'
	},
	{
		id: 6,
		name: 'JLPT N6',
		description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt laborum.',
		price: 500,
		image: 'https://image.sggp.org.vn/w800/Uploaded/2023/dqmbbcvo/2022_01_11/tonikroos_APFF.jpg'
	}
]

const CoursePage = () => {
	return (
		<>
			<Course listCourse={listCourse} />
		</>
	)
}

export default CoursePage;