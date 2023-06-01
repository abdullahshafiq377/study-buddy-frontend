import React from 'react';
import { useRegisterCourseMutation } from '../registrationApiSlice';

const UnregisteredCoursesTableRow = ({course, studentId, credits}) => {
	const [registerCourse] = useRegisterCourseMutation();
	
	
	const handleRegister = async () => {
		try {
			if (credits + parseInt(course.credit_hours) <= 21) {
				await registerCourse({courseId: course.id, studentId});
			}
		} catch (err) {
			console.log(err);
		}
	};
	
	return (<tr key={course.id}>
			<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
				{course.course_code}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{course.title}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{course.credit_hours}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				<button
					type="button"
					className="inline-flex items-center justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 font-medium text-green-700 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:text-sm"
					onClick={handleRegister}
				>
					Register
				</button>
			</td>
		</tr>
	
	
	);
};

export default UnregisteredCoursesTableRow;
