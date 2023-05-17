import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useGetStudentsQuery } from '../../students/studentsApiSlice';
import { useGetInstructorsQuery } from '../../instructors/instructorsApiSlice';
import { useSelector } from 'react-redux';
import { selectActiveMeetings, selectMeetingDetails } from '../meetingsApiSlice';
import { getOnlineUsers } from '../../chats/usersApiSlice';

function classNames (...classes) {
	return classes.filter(Boolean)
	              .join(' ');
}

export default function ParticipantsSlideOver ({open, setOpen}) {
	const onlineUsers = useSelector(getOnlineUsers);
	let users = [];
	let participants = [];
	const meetingDetails = useSelector(selectMeetingDetails);
	const activeMeetings = useSelector(selectActiveMeetings);
	
	if (meetingDetails && activeMeetings) {
		activeMeetings.map(meeting => {
			if (meeting.id === meetingDetails.id) {
				meeting.participants.map(participant => {
					participants = [...participants, participant.userId];
				});
			}
		});
		
	}
	
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
	console.log('participants', participants);
	console.log('users', users);
	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog as="div" className="relative z-10" onClose={setOpen}>
				<div className="fixed inset-0"/>
				
				<div className="fixed inset-0 overflow-hidden">
					<div className="absolute inset-0 overflow-hidden">
						<div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
							<Transition.Child
								as={Fragment}
								enter="transform transition ease-in-out duration-500 sm:duration-700"
								enterFrom="translate-x-full"
								enterTo="translate-x-0"
								leave="transform transition ease-in-out duration-500 sm:duration-700"
								leaveFrom="translate-x-0"
								leaveTo="translate-x-full"
							>
								<Dialog.Panel className="pointer-events-auto w-screen max-w-md">
									<div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
										<div className="p-6">
											<div className="flex items-start justify-between">
												<Dialog.Title
													className="text-base font-semibold leading-6 text-gray-900">Participants</Dialog.Title>
												<div className="ml-3 flex h-7 items-center">
													<button
														type="button"
														className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
														onClick={() => setOpen(false)}
													>
														<span className="sr-only">Close panel</span>
														<XMarkIcon className="h-6 w-6" aria-hidden="true"/>
													</button>
												</div>
											</div>
										</div>
										<ul role="list" className="flex-1 divide-y divide-gray-200 overflow-y-auto">
											{users?.map(user => {
												return participants?.map(participant => {
													if (participant === user.id) {
														return (
															<li key={user.id}>
																<div
																	className="group relative flex items-center px-5 py-6">
																	<div
																		className="-m-1 block flex-1 p-1">
																		<div
																			className="absolute inset-0 group-hover:bg-gray-50"
																			aria-hidden="true"/>
																		<div
																			className="relative flex min-w-0 flex-1 items-center">
                                <span className="relative inline-block flex-shrink-0">
                                  <img className="h-10 w-10 rounded-full"
                                       src={`http://localhost:8000/api/v1/files/${user.image}`} alt=""/>
                                  <span
	                                  className={classNames(
		                                  onlineUsers.includes(user?.id) ? 'bg-green-400' : 'bg-gray-300',
		                                  'absolute top-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white'
	                                  )}
	                                  aria-hidden="true"
                                  />
                                </span>
																			<div className="ml-4 truncate">
																				<p className="truncate text-sm font-medium text-gray-900">{user.name}</p>
																				<p className="truncate text-sm text-gray-500">{user.role}</p>
																			</div>
																		</div>
																	</div>
																</div>
															</li>
														);
													}
												});
											})}
										</ul>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
}
