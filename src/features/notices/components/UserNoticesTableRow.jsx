import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { selectNoticeById } from '../noticesApiSlice';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import ViewNoticeSlideOver from './ViewNoticeSlideOver';

const UserNoticesTableRow = ({noticeId}) => {
	const notice = useSelector((state) => selectNoticeById(state, noticeId));
	const [openViewNoticeSlideOver, setOpenViewNoticeSlideOver] = useState(false);
	
	return (
		<tr key={notice.id}>
			<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
				{notice.title.length > 90
				 ? `${notice.title.slice(0, 90)}...`
				 : notice.title}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{notice.link.length > 30
				 ? `${notice.link.slice(0, 30)}...`
				 : notice.link}
			</td>
			
			<td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
				<button
					onClick={() => setOpenViewNoticeSlideOver(!openViewNoticeSlideOver)}
					className="text-blue-600 hover:text-primary-900"
				>
					<ChevronRightIcon className="w-7"/>
				</button>
			</td>
			<ViewNoticeSlideOver open={openViewNoticeSlideOver} setOpen={setOpenViewNoticeSlideOver} notice={notice}/>
		</tr>
	);
};

export default UserNoticesTableRow;
