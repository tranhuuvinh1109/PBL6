import Contact from "../Contact/Contact";
import Course from "../CoursePage/Course";
import Event from "../EventPage/Event";
import HomePage from "../Home/HomePage";

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
		component: Course
	},
	{
		path: 'contact',
		component: Contact
	}
];
