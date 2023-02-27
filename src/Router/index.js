import Daskboard from "../Admin/Dashboard/Daskboard";
import Contact from "../Contact/Contact";
import CoursePage from "../CoursePage/CoursePage";
import Event from "../EventPage/Event";
import HomePage from "../Home/HomePage";
import ProfilePage from "../ProfilePage/ProfilePage";

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
	}
];


export const adminRouter = [
	{
		path: 'daskboard',
		component: Daskboard
	},
	// {
	// 	path: 'event',
	// 	component: Event
	// },
	// {
	// 	path: 'course',
	// 	component: Course
	// },
	// {
	// 	path: 'contact',
	// 	component: Contact
	// }
];