import { Fragment, useState } from 'react';
import { Dialog, Menu, Transition } from '@headlessui/react';
import {
	ArrowPathIcon,
	Bars3BottomLeftIcon,
	BellAlertIcon,
	BookOpenIcon,
	CalculatorIcon,
	CalendarDaysIcon,
	ChartPieIcon,
	ChatBubbleLeftRightIcon,
	ChatBubbleOvalLeftEllipsisIcon,
	ChevronDownIcon,
	ClipboardDocumentCheckIcon,
	ClipboardDocumentListIcon,
	DocumentCheckIcon,
	DocumentTextIcon,
	HomeIcon,
	NewspaperIcon,
	QueueListIcon,
	TableCellsIcon,
	TvIcon,
	UserIcon,
	UsersIcon,
	XMarkIcon,
} from '@heroicons/react/24/outline';
import { logOut, selectCurrentUserId } from '../features/auth/authSlice';
import { NavLink } from 'react-router-dom';
import { useLogoutMutation } from '../features/auth/authApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../assets/logos/logo-dark@2x.png';
import { useGetStudentByIdQuery } from '../features/students/studentsApiSlice';

export default function StudentSideNav (props) {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [logout] = useLogoutMutation();
	const dispatch = useDispatch();
	const studentId = useSelector(selectCurrentUserId);
	const {data, isLoading, isSuccess, isError, error} =
		useGetStudentByIdQuery(studentId);
	
	let name = '';
	let email = '';
	if (isLoading) {
		name = 'Loading';
		email = 'Loading';
	}
	else if (isSuccess) {
		let student = data.entities[studentId];
		if (student) {
			name = student.name;
			email = student.email;
		}
	}
	else if (isError) {
		name = 'Not Found';
		email = 'Not found';
	}
	
	const handleLogout = async () => {
		try {
			await logout();
			dispatch(logOut());
		} catch (error) {
			console.log(error);
		}
	};
	
	return (
		<>
			<div>
				<Transition.Root show={sidebarOpen} as={Fragment}>
					<Dialog
						as="div"
						className="relative z-40 md:hidden"
						onClose={setSidebarOpen}
					>
						<Transition.Child
							as={Fragment}
							enter="transition-opacity ease-linear duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="transition-opacity ease-linear duration-300"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<div className="fixed inset-0 bg-gray-600 bg-opacity-75"/>
						</Transition.Child>
						
						<div className="fixed inset-0 z-40 flex">
							<Transition.Child
								as={Fragment}
								enter="transition ease-in-out duration-300 transform"
								enterFrom="-translate-x-full"
								enterTo="translate-x-0"
								leave="transition ease-in-out duration-300 transform"
								leaveFrom="translate-x-0"
								leaveTo="-translate-x-full"
							>
								<Dialog.Panel
									className="relative flex w-full max-w-xs flex-1 flex-col bg-primary-900 pt-5 pb-4">
									<Transition.Child
										as={Fragment}
										enter="ease-in-out duration-300"
										enterFrom="opacity-0"
										enterTo="opacity-100"
										leave="ease-in-out duration-300"
										leaveFrom="opacity-100"
										leaveTo="opacity-0"
									>
										<div className="absolute top-0 right-0 -mr-12 pt-2">
											<button
												type="button"
												className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
												onClick={() => setSidebarOpen(false)}
											>
												<span className="sr-only">Close sidebar</span>
												<XMarkIcon
													className="h-6 w-6 text-white"
													aria-hidden="true"
												/>
											</button>
										</div>
									</Transition.Child>
									<div className="flex flex-shrink-0 items-center px-4">
										<img className="h-8 w-auto" src={logo} alt="Your Company"/>
									</div>
									<div className="mt-5 h-0 flex-1 overflow-y-auto">
										<nav className="space-y-1 px-2">
											<NavLink
												key="dashboard"
												to="student/dashboard"
												className={({isActive}) =>
													isActive
													? 'bg-primary-600 text-white group flex items-center px-2 py-2 text-base font-medium rounded-md'
													: 'text-primary-200 hover:bg-primary-800 group flex items-center px-2 py-2 text-base font-medium rounded-md'
												}
											>
												<HomeIcon
													className="mr-3 h-6 w-6 flex-shrink-0 text-primary-400"
													aria-hidden="true"
												/>
												Dashboard
											</NavLink>
											<NavLink
												key="registration"
												to="student/registration"
												className={({isActive}) =>
													isActive
													? 'bg-primary-600 text-white group flex items-center px-2 py-2 text-base font-medium rounded-md'
													: 'text-primary-200 hover:bg-primary-800 group flex items-center px-2 py-2 text-base font-medium rounded-md'
												}
											>
												<ClipboardDocumentCheckIcon
													className="mr-3 h-6 w-6 flex-shrink-0 text-primary-400"
													aria-hidden="true"
												/>
												Registration
											</NavLink>
											<NavLink
												key="meetings"
												to="student/meetings"
												className={({isActive}) =>
													isActive
													? 'bg-primary-600 text-white group flex items-center px-2 py-2 text-base font-medium rounded-md'
													: 'text-primary-200 hover:bg-primary-800 group flex items-center px-2 py-2 text-base font-medium rounded-md'
												}
											>
												<TvIcon
													className="mr-3 h-6 w-6 flex-shrink-0 text-primary-400"
													aria-hidden="true"
												/>
												Meetings
											</NavLink>
											<NavLink
												key="attendance"
												to="student/attendance"
												className={({isActive}) =>
													isActive
													? 'bg-primary-600 text-white group flex items-center px-2 py-2 text-base font-medium rounded-md'
													: 'text-primary-200 hover:bg-primary-800 group flex items-center px-2 py-2 text-base font-medium rounded-md'
												}
											>
												<ChartPieIcon
													className="mr-3 h-6 w-6 flex-shrink-0 text-primary-400"
													aria-hidden="true"
												/>
												Attendance
											</NavLink>
											<NavLink
												key="learning-resources"
												to="student/learning-resources"
												className={({isActive}) =>
													isActive
													? 'bg-primary-600 text-white group flex items-center px-2 py-2 text-base font-medium rounded-md'
													: 'text-primary-200 hover:bg-primary-800 group flex items-center px-2 py-2 text-base font-medium rounded-md'
												}
											>
												<BookOpenIcon
													className="mr-3 h-6 w-6 flex-shrink-0 text-primary-400"
													aria-hidden="true"
												/>
												Learning Resources
											</NavLink>
											<NavLink
												key="alerts"
												to="student/alerts"
												className={({isActive}) =>
													isActive
													? 'bg-primary-600 text-white group flex items-center px-2 py-2 text-base font-medium rounded-md'
													: 'text-primary-200 hover:bg-primary-800 group flex items-center px-2 py-2 text-base font-medium rounded-md'
												}
											>
												<BellAlertIcon
													className="mr-3 h-6 w-6 flex-shrink-0 text-primary-400"
													aria-hidden="true"
												/>
												Alerts
											</NavLink>
											<NavLink
												key="assignments"
												to="student/assignments"
												className={({isActive}) =>
													isActive
													? 'bg-primary-600 text-white group flex items-center px-2 py-2 text-base font-medium rounded-md'
													: 'text-primary-200 hover:bg-primary-800 group flex items-center px-2 py-2 text-base font-medium rounded-md'
												}
											>
												<DocumentTextIcon
													className="mr-3 h-6 w-6 flex-shrink-0 text-primary-400"
													aria-hidden="true"
												/>
												Assignments
											</NavLink>
											<NavLink
												key="quizzes"
												to="student/quizzes"
												className={({isActive}) =>
													isActive
													? 'bg-primary-600 text-white group flex items-center px-2 py-2 text-base font-medium rounded-md'
													: 'text-primary-200 hover:bg-primary-800 group flex items-center px-2 py-2 text-base font-medium rounded-md'
												}
											>
												<CalculatorIcon
													className="mr-3 h-6 w-6 flex-shrink-0 text-primary-400"
													aria-hidden="true"
												/>
												Quizzes
											</NavLink>
											<NavLink
												key="grades"
												to="student/grades"
												className={({isActive}) =>
													isActive
													? 'bg-primary-600 text-white group flex items-center px-2 py-2 text-base font-medium rounded-md'
													: 'text-primary-200 hover:bg-primary-800 group flex items-center px-2 py-2 text-base font-medium rounded-md'
												}
											>
												<DocumentCheckIcon
													className="mr-3 h-6 w-6 flex-shrink-0 text-primary-400"
													aria-hidden="true"
												/>
												Grades
											</NavLink>
											<NavLink
												key="results"
												to="student/results"
												className={({isActive}) =>
													isActive
													? 'bg-primary-600 text-white group flex items-center px-2 py-2 text-base font-medium rounded-md'
													: 'text-primary-200 hover:bg-primary-800 group flex items-center px-2 py-2 text-base font-medium rounded-md'
												}
											>
												<TableCellsIcon
													className="mr-3 h-6 w-6 flex-shrink-0 text-primary-400"
													aria-hidden="true"
												/>
												Results
											</NavLink>
											<NavLink
												key="chats"
												to="student/chats"
												className={({isActive}) =>
													isActive
													? 'bg-primary-600 text-white group flex items-center px-2 py-2 text-base font-medium rounded-md'
													: 'text-primary-200 hover:bg-primary-800 group flex items-center px-2 py-2 text-base font-medium rounded-md'
												}
											>
												<ChatBubbleOvalLeftEllipsisIcon
													className="mr-3 h-6 w-6 flex-shrink-0 text-primary-400"
													aria-hidden="true"
												/>
												Chats
											</NavLink>
											<NavLink
												key="notices"
												to="student/notices"
												className={({isActive}) =>
													isActive
													? 'bg-primary-600 text-white group flex items-center px-2 py-2 text-base font-medium rounded-md'
													: 'text-primary-200 hover:bg-primary-800 group flex items-center px-2 py-2 text-base font-medium rounded-md'
												}
											>
												<ClipboardDocumentListIcon
													className="mr-3 h-6 w-6 flex-shrink-0 text-primary-400"
													aria-hidden="true"
												/>
												Notices
											</NavLink>
											<NavLink
												key="events"
												to="student/events"
												className={({isActive}) =>
													isActive
													? 'bg-primary-600 text-white group flex items-center px-2 py-2 text-base font-medium rounded-md'
													: 'text-primary-200 hover:bg-primary-800 group flex items-center px-2 py-2 text-base font-medium rounded-md'
												}
											>
												<CalendarDaysIcon
													className="mr-3 h-6 w-6 flex-shrink-0 text-primary-400"
													aria-hidden="true"
												/>
												Events
											</NavLink>
											<NavLink
												key="posts"
												to="student/posts"
												className={({isActive}) =>
													isActive
													? 'bg-primary-600 text-white group flex items-center px-2 py-2 text-base font-medium rounded-md'
													: 'text-primary-200 hover:bg-primary-800 group flex items-center px-2 py-2 text-base font-medium rounded-md'
												}
											>
												<ChatBubbleLeftRightIcon
													className="mr-3 h-6 w-6 flex-shrink-0 text-primary-400"
													aria-hidden="true"
												/>
												Posts
											</NavLink>
										</nav>
									</div>
								</Dialog.Panel>
							</Transition.Child>
							<div className="w-14 flex-shrink-0" aria-hidden="true">
								{/* Dummy element to force sidebar to shrink to fit close icon */}
							</div>
						</div>
					</Dialog>
				</Transition.Root>
				
				{/* Static sidebar for desktop */}
				<div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
					{/* Sidebar component, swap this element with another sidebar if you like */}
					<div className="flex flex-grow flex-col overflow-y-auto bg-primary-900 pt-5">
						<div className="flex flex-shrink-0 items-center px-4">
							<img className="h-8 w-auto" src={logo} alt="Your Company"/>
						</div>
						<div className="mt-5 flex flex-1 flex-col">
							<nav className="flex-1 space-y-1 px-2 pb-4">
								<NavLink
									key="dashboard"
									to="student/dashboard"
									className={({isActive}) =>
										isActive
										? 'bg-primary-600 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md'
										: 'text-primary-200 hover:bg-primary-800 group flex items-center px-2 py-2 text-sm font-medium rounded-md'
									}
								>
									<HomeIcon
										className="mr-3 h-6 w-6 flex-shrink-0 text-primary-400"
										aria-hidden="true"
									/>
									Dashboard
								</NavLink>
								<NavLink
									key="registration"
									to="student/registration"
									className={({isActive}) =>
										isActive
										? 'bg-primary-600 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md'
										: 'text-primary-200 hover:bg-primary-800 group flex items-center px-2 py-2 text-sm font-medium rounded-md'
									}
								>
									<ClipboardDocumentCheckIcon
										className="mr-3 h-6 w-6 flex-shrink-0 text-primary-400"
										aria-hidden="true"
									/>
									Registration
								</NavLink>
								<NavLink
									key="meetings"
									to="student/meetings"
									className={({isActive}) =>
										isActive
										? 'bg-primary-600 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md'
										: 'text-primary-200 hover:bg-primary-800 group flex items-center px-2 py-2 text-sm font-medium rounded-md'
									}
								>
									<TvIcon
										className="mr-3 h-6 w-6 flex-shrink-0 text-primary-400"
										aria-hidden="true"
									/>
									Meetings
								</NavLink>
								<NavLink
									key="attendance"
									to="student/attendance"
									className={({isActive}) =>
										isActive
										? 'bg-primary-600 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md'
										: 'text-primary-200 hover:bg-primary-800 group flex items-center px-2 py-2 text-sm font-medium rounded-md'
									}
								>
									<ChartPieIcon
										className="mr-3 h-6 w-6 flex-shrink-0 text-primary-400"
										aria-hidden="true"
									/>
									Attendance
								</NavLink>
								<NavLink
									key="learning-resources"
									to="student/learning-resources"
									className={({isActive}) =>
										isActive
										? 'bg-primary-600 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md'
										: 'text-primary-200 hover:bg-primary-800 group flex items-center px-2 py-2 text-sm font-medium rounded-md'
									}
								>
									<BookOpenIcon
										className="mr-3 h-6 w-6 flex-shrink-0 text-primary-400"
										aria-hidden="true"
									/>
									Learning Resources
								</NavLink>
								<NavLink
									key="alerts"
									to="student/alerts"
									className={({isActive}) =>
										isActive
										? 'bg-primary-600 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md'
										: 'text-primary-200 hover:bg-primary-800 group flex items-center px-2 py-2 text-sm font-medium rounded-md'
									}
								>
									<BellAlertIcon
										className="mr-3 h-6 w-6 flex-shrink-0 text-primary-400"
										aria-hidden="true"
									/>
									Alerts
								</NavLink>
								<NavLink
									key="assignments"
									to="student/assignments"
									className={({isActive}) =>
										isActive
										? 'bg-primary-600 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md'
										: 'text-primary-200 hover:bg-primary-800 group flex items-center px-2 py-2 text-sm font-medium rounded-md'
									}
								>
									<DocumentTextIcon
										className="mr-3 h-6 w-6 flex-shrink-0 text-primary-400"
										aria-hidden="true"
									/>
									Assignments
								</NavLink>
								<NavLink
									key="quizzes"
									to="student/quizzes"
									className={({isActive}) =>
										isActive
										? 'bg-primary-600 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md'
										: 'text-primary-200 hover:bg-primary-800 group flex items-center px-2 py-2 text-sm font-medium rounded-md'
									}
								>
									<CalculatorIcon
										className="mr-3 h-6 w-6 flex-shrink-0 text-primary-400"
										aria-hidden="true"
									/>
									Quizzes
								</NavLink>
								<NavLink
									key="grades"
									to="student/grades"
									className={({isActive}) =>
										isActive
										? 'bg-primary-600 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md'
										: 'text-primary-200 hover:bg-primary-800 group flex items-center px-2 py-2 text-sm font-medium rounded-md'
									}
								>
									<DocumentCheckIcon
										className="mr-3 h-6 w-6 flex-shrink-0 text-primary-400"
										aria-hidden="true"
									/>
									Grades
								</NavLink>
								<NavLink
									key="results"
									to="student/results"
									className={({isActive}) =>
										isActive
										? 'bg-primary-600 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md'
										: 'text-primary-200 hover:bg-primary-800 group flex items-center px-2 py-2 text-sm font-medium rounded-md'
									}
								>
									<TableCellsIcon
										className="mr-3 h-6 w-6 flex-shrink-0 text-primary-400"
										aria-hidden="true"
									/>
									Results
								</NavLink>
								
								<NavLink
									key="chats"
									to="student/chats"
									className={({isActive}) =>
										isActive
										? 'bg-primary-600 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md'
										: 'text-primary-200 hover:bg-primary-800 group flex items-center px-2 py-2 text-sm font-medium rounded-md'
									}
								>
									<ChatBubbleOvalLeftEllipsisIcon
										className="mr-3 h-6 w-6 flex-shrink-0 text-primary-400"
										aria-hidden="true"
									/>
									Chats
								</NavLink>
								<NavLink
									key="notices"
									to="student/notices"
									className={({isActive}) =>
										isActive
										? 'bg-primary-600 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md'
										: 'text-primary-200 hover:bg-primary-800 group flex items-center px-2 py-2 text-sm font-medium rounded-md'
									}
								>
									<ClipboardDocumentListIcon
										className="mr-3 h-6 w-6 flex-shrink-0 text-primary-400"
										aria-hidden="true"
									/>
									Notices
								</NavLink>
								
								<NavLink
									key="events"
									to="student/events"
									className={({isActive}) =>
										isActive
										? 'bg-primary-600 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md'
										: 'text-primary-200 hover:bg-primary-800 group flex items-center px-2 py-2 text-sm font-medium rounded-md'
									}
								>
									<CalendarDaysIcon
										className="mr-3 h-6 w-6 flex-shrink-0 text-primary-400"
										aria-hidden="true"
									/>
									Events
								</NavLink>
								<NavLink
									key="posts"
									to="student/posts"
									className={({isActive}) =>
										isActive
										? 'bg-primary-600 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md'
										: 'text-primary-200 hover:bg-primary-800 group flex items-center px-2 py-2 text-sm font-medium rounded-md'
									}
								>
									<ChatBubbleLeftRightIcon
										className="mr-3 h-6 w-6 flex-shrink-0 text-primary-400"
										aria-hidden="true"
									/>
									Posts
								</NavLink>
							</nav>
						</div>
					</div>
				</div>
				<div className="flex flex-1 flex-col md:pl-64">
					<div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
						<button
							type="button"
							className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 md:hidden"
							onClick={() => setSidebarOpen(true)}
						>
							<span className="sr-only">Open sidebar</span>
							<Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true"/>
						</button>
						<div className="flex flex-1 justify-between px-4">
							<div className="flex flex-1"></div>
							<div className="ml-4 flex items-center md:ml-6">
								{/* Profile dropdown */}
								<Menu as="div" className="relative ml-3">
									<div>
										<Menu.Button
											className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
											<span className="sr-only">Open user menu</span>
											<div className="flex items-center mr-4">
												<div>
													<img
														className="inline-block h-9 w-9 rounded-full"
														src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
														alt=""
													/>
												</div>
												<div className="ml-3 flex flex-row">
													<div>
														<p className="text-sm font-medium text-gray-900">
															{name}
														</p>
														<p className="text-xs font-medium text-gray-600 group-hover:text-gray-200">
															{email}
														</p>
													</div>
													<ChevronDownIcon
														className="ml-3 h-6 w-6 mt-2 text-primary-900"
														aria-hidden="true"
													/>
												</div>
											</div>
										</Menu.Button>
									</div>
									<Transition
										as={Fragment}
										enter="transition ease-out duration-100"
										enterFrom="transform opacity-0 scale-95"
										enterTo="transform opacity-100 scale-100"
										leave="transition ease-in duration-75"
										leaveFrom="transform opacity-100 scale-100"
										leaveTo="transform opacity-0 scale-95"
									>
										<Menu.Items
											className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
											<Menu.Item key="My Posts">
												<NavLink
													to="student/my-posts"
													className="hover:bg-gray-100 block px-4 py-2 text-sm text-gray-700"
												>
													My Posts
												</NavLink>
											</Menu.Item>
											
											<Menu.Item key="Profile">
												<NavLink
													to="student/profile"
													className="hover:bg-gray-100 block px-4 py-2 text-sm text-gray-700"
												>
													Profile
												</NavLink>
											</Menu.Item>
											
											<Menu.Item key="Settings">
												<NavLink
													to="student/settings"
													className="hover:bg-gray-100 block px-4 py-2 text-sm text-gray-700"
												>
													Settings
												</NavLink>
											</Menu.Item>
											
											<Menu.Item key="Logout">
												<NavLink
													to="/"
													onClick={handleLogout}
													className="hover:bg-gray-100 block px-4 py-2 text-sm text-gray-700"
												>
													Logout
												</NavLink>
											</Menu.Item>
										</Menu.Items>
									</Transition>
								</Menu>
							</div>
						</div>
					</div>
					
					<main>
						<div className="py-6">
							<div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
								{/* Replace with your content */}
								{props.children}
								{/* /End replace */}
							</div>
						</div>
					</main>
				</div>
			</div>
		</>
	);
}
