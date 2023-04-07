import Daskboard from "../Admin/Dashboard/Daskboard";
import CoursePage from "../Page/CoursePage/CoursePage";
import HomePage from "../Home/HomePage";
import ProfilePage from "../Page/ProfilePage/ProfilePage";
import Learning from "../Page/LearningPage/Learning";
import CourseManagement from "../Admin/CourseManagement/CourseManagement";
import CreateCourse from "../Admin/CourseManagement/CreateCourse/CreateCourse";
import BlogPage from "../Page/BlogPage/BlogPage";
import CreateBlog from "../Page/BlogPage/CreateBlog/CreateBlog";
import BlogDetail from "../Page/BlogDetail/BlogDetail";
import CoureDetail from "../Page/CourseDetail/CourseDetail";
import MyCourse from "../Page/MyCourse/MyCourse";
import BlogManagement from "../Admin/BlogManagement/BlogManagement";

export const routers = [
	{
		path: 'home',
		component: HomePage
	},
	{
		path: 'blog',
		component: BlogPage
	},
	{
		path: 'course',
		component: CoursePage
	},
	{
		path: 'course/:id',
		component: CoureDetail
	},
	{
		path: 'user/profile',
		component: ProfilePage
	},
	{
		path: 'learning/:id',
		component: Learning
	},
	{
		path: 'blog/create',
		component: CreateBlog
	},
	{
		path: 'blog/:id',
		component: BlogDetail
	},
	{
		path: 'my-course',
		component: MyCourse
	},
];


export const adminRouter = [
	{
		path: 'daskboard',
		component: Daskboard
	},
	{
		path: 'blog',
		component: BlogManagement
	},
	{
		path: 'course',
		component: CourseManagement
	},
	{
		path: 'course/create',
		component: CreateCourse
	},

	// {
	// 	path: 'contact',
	// 	component: Contact
	// }
];