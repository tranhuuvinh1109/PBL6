import Daskboard from "../Admin/Dashboard/Daskboard";
import Contact from "../Page/Contact/Contact";
import CoursePage from "../Page/CoursePage/CoursePage";
import Event from "../Page/EventPage/Event";
import HomePage from "../Home/HomePage";
import ProfilePage from "../Page/ProfilePage/ProfilePage";
import Learning from "../Page/LearningPage/Learning";
import CourseManagement from "../Admin/CourseManagement/CourseManagement";
import EventManagement from "../Admin/EventManagement/EventManagement";

export const routers = [
	{
		path: 'home',
		component: HomePage
	},
	{
		path: 'event',
		component: Event
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
	}
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
	// {
	// 	path: 'contact',
	// 	component: Contact
	// }
];