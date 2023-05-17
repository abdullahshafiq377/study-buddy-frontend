import { useGetStudentsQuery } from '../features/students/studentsApiSlice';
import { useGetInstructorsQuery } from '../features/instructors/instructorsApiSlice';
import { useGetSubAdminsQuery } from '../features/sub-admins/subAdminsApiSlice';
import { useGetCoursesQuery } from '../features/courses/coursesApiSlice';
import { useGetDepartmentsQuery } from '../features/departments/departmentsApiSlice';
import { useGetProgramsQuery } from '../features/programs/programsApiSlice';
import { useGetEventsQuery } from '../features/events/eventsApiSlice';
import { useGetNoticesQuery } from '../features/notices/noticesApiSlice';


export default function Stats () {
	const {isSuccess: isSuccessStudent, data: students} = useGetStudentsQuery();
	const {isSuccess: isSuccessInstructor, data: instructors} = useGetInstructorsQuery();
	const {isSuccess: isSuccessSubAdmin, data: subAdmins} = useGetSubAdminsQuery();
	const {isSuccess: isSuccessDepartment, data: departments} = useGetDepartmentsQuery();
	const {isSuccess: isSuccessProgram, data: programs} = useGetProgramsQuery();
	const {isSuccess: isSuccessCourse, data: courses} = useGetCoursesQuery();
	const {isSuccess: isSuccessEvents, data: events} = useGetEventsQuery();
	const {isSuccess: isSuccessNotices, data: notices} = useGetNoticesQuery();
	
	let stats = [
		{name: 'Students', stat: 'Loading'},
		{name: 'Instructors', stat: 'Loading'},
		{name: 'Sub-Admins', stat: 'Loading'},
		{name: 'Departments', stat: 'Loading'},
		{name: 'Programs', stat: 'Loading'},
		{name: 'Courses', stat: 'Loading'},
		{name: 'Upcoming Events', stat: 'Loading'},
		{name: 'Notices', stat: 'Loading'},
	];
	
	if (isSuccessStudent && isSuccessInstructor && isSuccessSubAdmin && isSuccessCourse && isSuccessDepartment && isSuccessProgram && isSuccessEvents && isSuccessNotices) {
		stats = [
			{name: 'Students', stat: students.ids.length},
			{name: 'Instructors', stat: instructors.ids.length},
			{name: 'Sub-Admins', stat: subAdmins.ids.length},
			{name: 'Departments', stat: departments.ids.length},
			{name: 'Programs', stat: programs.ids.length},
			{name: 'Courses', stat: courses.ids.length},
			{name: 'Upcoming Events', stat: events.ids.length},
			{name: 'Notices', stat: notices.ids.length},
		];
	}
	return (
		<div>
			<h3 className="text-lg font-medium leading-6 text-gray-900">Stats</h3>
			<dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
				{stats.map((item) => (
					<div key={item.name} className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
						<dt className="truncate text-sm font-medium text-gray-500">{item.name}</dt>
						<dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{item.stat}</dd>
					</div>
				))}
			</dl>
		</div>
	);
}
