import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetSectionByIdQuery } from '../../features/sections/sectionsApiSlice';
import MarkAttendanceTable from '../../features/attendance/components/MarkAttendanceTable';
import { useGetLectureByIdQuery } from '../../features/attendance/lecturesApiSlice';
import { formatISO } from 'date-fns';
import QRCode from 'react-qr-code';

const InstructorMarkAttendancePage = () => {
	const {lectureId} = useParams();
	console.log(lectureId);
	
	
	const {isSuccess, data} = useGetLectureByIdQuery(lectureId);
	console.log(data);
	let lecture = {
		title: '',
		start_time: '',
		end_time: '',
	};
	
	if (isSuccess) {
		lecture = data.entities[lectureId];
	}
	
	console.log(lecture.date);
	return (
		<div className="px-4 sm:px-6 lg:px-8">
			<div className="sm:flex sm:items-center">
				<div className="sm:flex-auto">
					<h1 className="text-2xl font-bold text-gray-900">
						Attendance
					</h1>
				</div>
				<div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
					<a
						href={`http://localhost:3000/QR/${lectureId}`}
						target={'_blank'}
						className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 sm:w-auto"
					>
						Generate QR
					</a>
				</div>
			</div>
			
			<div className="overflow-hidden bg-white shadow sm:rounded-lg mt-4">
				<div className="border-t border-gray-200 px-4 py-5 sm:p-0">
					<dl className="sm:divide-y sm:divide-gray-200">
						<div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
							<dt className="text-sm font-medium text-gray-500">
								Title
							</dt>
							<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
								{lecture?.title}
							</dd>
						</div>
						<div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
							<dt className="text-sm font-medium text-gray-500">
								Date
							</dt>
							<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
								{lecture.date ? formatISO(new Date(lecture?.date), {representation: 'date'}) : ''}
							</dd>
						</div>
						<div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
							<dt className="text-sm font-medium text-gray-500">
								Start Time
							</dt>
							<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
								{lecture?.start_time.slice(0, 5)}
							</dd>
						</div>
						<div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
							<dt className="text-sm font-medium text-gray-500">
								End Time
							</dt>
							<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
								{lecture?.end_time.slice(0, 5)}
							</dd>
						</div>
					</dl>
				</div>
			</div>
			<div className="mt-8">
				<MarkAttendanceTable lectureId={lectureId}/>
			</div>
		</div>
	);
};

export default InstructorMarkAttendancePage;
