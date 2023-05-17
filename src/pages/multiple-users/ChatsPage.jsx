import React, { useEffect, useState } from 'react';
import SearchUsers from '../../features/chats/components/SearchUsers';
import AllUsers from '../../features/chats/components/AllUsers';
import ChatRoom from '../../features/chats/components/ChatRoom';
import Welcome from '../../features/chats/components/Welcome';
import { useGetStudentsQuery } from '../../features/students/studentsApiSlice';
import { useGetInstructorsQuery } from '../../features/instructors/instructorsApiSlice';
import { getChosenChatDetails } from '../../features/chats/chatsApiSlice';
import { useSelector } from 'react-redux';
import { getDirectChatHistory, getDirectConversationHistory } from '../../services/RTC/socketConnection';

const ChatsPage = () => {
	const [openSearch, setOpenSearch] = useState(false);
	
	let users = [];
	
	const {isSuccess: isSuccessStudent, data: studentData} = useGetStudentsQuery();
	if (isSuccessStudent) {
		const students = studentData.ids.map(id => {
			return {...studentData.entities[id], role: 'Student'};
		});
		users = [...users, ...students];
	}
	const {isSuccess: isSuccessInstructor, data: instructorData} = useGetInstructorsQuery();
	if (isSuccessInstructor) {
		const instructors = instructorData.ids.map(id => {
			return {...instructorData.entities[id], role: 'Instructor'};
		});
		users = [...users, ...instructors];
	}
	
	const currentChatDetails = useSelector(getChosenChatDetails);
	
	useEffect(() => {
		if (currentChatDetails) {
			getDirectChatHistory({receiverId: currentChatDetails.id});
		}
	}, [currentChatDetails]);
	
	useEffect(() => {
		getDirectConversationHistory();
	}, [currentChatDetails]);
	
	return (
		<div className="px-4 sm:px-6 lg:px-8">
			<div className="sm:flex sm:items-center">
				<div className="sm:flex-auto">
					<h1 className="text-2xl font-bold text-gray-900">
						Chats
					</h1>
					<p className="mt-2 text-sm text-gray-700">
						A list of all the sub admins in the system including
						their names, emails, genders and contact numbers.
					</p>
				</div>
				<div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
					<button
						onClick={() => setOpenSearch(true)}
						className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 sm:w-auto"
					>
						New Chat
					</button>
				</div>
			</div>
			<div className="mt-8 flex flex-col">
				<div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
						<div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
							
							
							<div className="container mx-auto">
								<div
									className="min-w-full bg-white border-x border-b border-gray-200 rounded lg:grid lg:grid-cols-3">
									<div className="bg-white border-r border-gray-200 lg:col-span-1">
										{/*AllUsers Start*/}
										<AllUsers users={users} currentChatDetails={currentChatDetails}/>
										{/*AllUsers End*/}
									</div>
									
									{currentChatDetails ? (
										<ChatRoom currentChatDetails={currentChatDetails}/>
									) : (
										 <Welcome/>
									 )}
								
								</div>
							</div>
						
						
						</div>
					</div>
				</div>
			</div>
			<SearchUsers open={openSearch} setOpen={setOpenSearch} data={users}/>
		</div>
	);
};

export default ChatsPage;
