import Daskboard from "../Admin/Dashboard/Daskboard";
import Contact from "../Page/Contact/Contact";
import CoursePage from "../Page/CoursePage/CoursePage";
import HomePage from "../Home/HomePage";
import ProfilePage from "../Page/ProfilePage/ProfilePage";
import Learning from "../Page/LearningPage/Learning";
import CourseManagement from "../Admin/CourseManagement/CourseManagement";
import EventManagement from "../Admin/EventManagement/EventManagement";
import CreateCourse from "../Admin/CourseManagement/CreateCourse/CreateCourse";
import BlogPage from "../Page/BlogPage/BlogPage";
import CreateBlog from "../Page/BlogPage/CreateBlog/CreateBlog";

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
		path: 'contact',
		component: Contact
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
];


export const adminRouter = [
	{
		path: 'daskboard',
		component: Daskboard
	},
	{
		path: 'event',
		component: EventManagement
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