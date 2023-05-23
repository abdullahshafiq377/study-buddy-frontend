import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetSectionsByInstructorQuery } from '../../sections/sectionsApiSlice';
import { useSelector } from 'react-redux';
import { selectCurrentUserId } from '../../auth/authSlice';
import ConfirmDeletionModal from '../../../components/ConfirmDeletionModal';
import { deleteScheduledMeeting } from '../../../services/RTC/socketConnection';
import { formatISO } from 'date-fns';
import { startNewMeeting } from '../../../services/RTC/meetingHandler';


const InstructorMeetingsTableRow = ({meeting}) => {
	const userId = useSelector(selectCurrentUserId);
	const {data: sectionData, isSuccess: isSuccessSection} = useGetSectionsByInstructorQuery(userId);
	let section = '';
	if (isSuccessSection) {
		section = sectionData.entities[meeting.section_id];
	}
	
	const [openConfirmDeletionModal, setOpenConfirmDeletionModal] = useState(false);
	
	const handleJoin = () => {
		startNewMeeting({meetingId: meeting.id});
	};
	
	const handleDelete = () => {
		deleteScheduledMeeting({meetingId: meeting.id});
		setOpenConfirmDeletionModal(false);
	};
	
	return (
		<tr key={meeting?.id}>
			<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
				{meeting?.title}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{section.course_title}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{section.title}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{meeting?.start_time.slice(0, 5)}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{formatISO(new Date(meeting?.start_date), {representation: 'date'})}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				<button
					type="button"
					className="inline-flex items-center justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 font-medium text-red-700 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:text-sm"
					onClick={() => setOpenConfirmDeletionModal(true)}
				>
					Cancel
				</button>
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				<Link
					to="in-meeting"
					onClick={handleJoin}
					className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-900 px-4 py-2 font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 sm:text-sm"
				
				>
					Start
				</Link>
			</td>
			<ConfirmDeletionModal open={openConfirmDeletionModal}
			                      setOpen={setOpenConfirmDeletionModal}
			                      title={meeting.title}
			                      onDelete={handleDelete}
			/>
		</tr>
	);
};

export default InstructorMeetingsTableRow;
