import React, { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { formatISO } from 'date-fns';
import { useSelector } from 'react-redux';
import { selectCurrentUserId } from '../../auth/authSlice';
import {
	useAddNewAssignmentSubmissionMutation,
	useGetAssignmentSubmissionsQuery
} from '../assignmentSubmissionApiSlice';

function classNames (...classes) {
	return classes.filter(Boolean)
	              .join(' ');
}

export default function ViewAssignmentSlideOver ({open, setOpen, assignment, section}) {
	const userId = useSelector(selectCurrentUserId);
	
	const {isSuccess, data} = useGetAssignmentSubmissionsQuery(assignment.id);
	let mySubmission = null;
	
	const [addNewAssignmentSubmission] = useAddNewAssignmentSubmissionMutation();
	
	const [resourceFileUrl, setResourceFileUrl] = useState(
		`http://localhost:8000/api/v1/files/${assignment?.file_path}`);
	const [resourceFileName, setResourceFileName] = useState(assignment?.file_name);
	
	if (isSuccess) {
		data.ids.map(id => {
			if (data.entities[id].student_id === userId) {
				mySubmission = data.entities[id];
			}
		});
		console.log(mySubmission);
	}
	
	const fileInputRef = useRef(null);
	const [file, setFile] = useState(null);
	const [fileUrl, setFileUrl] = useState(null);
	
	const handleFileInput = () => {
		fileInputRef.current.click();
	};
	const handleFileChange = e => {
		const fileObj = e.target.files && e.target.files[0];
		if (!fileObj) {
			return null;
		}
		e.target.value = null;
		setFile(fileObj);
		setFileUrl(URL.createObjectURL(fileObj));
		
	};
	
	const handleSubmit = async () => {
		try {
			let formData = new FormData();
			formData.append('assignmentId', assignment.id,);
			formData.append('studentId', userId);
			file ? formData.append('file', file, file?.name) : formData.append('file', null);
			
			await addNewAssignmentSubmission(formData);
			
			setFile(null);
			setFileUrl(null);
			
			setOpen(false);
			
		} catch (e) {
			console.log(e);
		}
		
	};
	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog as="div" className="relative z-10" onClose={setOpen}>
				<Transition.Child
					as={Fragment}
					enter="ease-in-out duration-500"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in-out duration-500"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
				</Transition.Child>
				
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
								<Dialog.Panel className="pointer-events-auto w-screen max-w-2xl">
									<div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
										<div className="px-4 py-6 sm:px-6">
											<div className="flex items-start justify-between">
												<Dialog.Title
													className="text-base font-semibold leading-6 text-gray-900">Assignment</Dialog.Title>
												<div className="ml-3 flex h-7 items-center">
													<button
														type="button"
														className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500"
														onClick={() => setOpen(false)}
													>
														<span className="sr-only">Close panel</span>
														<XMarkIcon className="h-6 w-6" aria-hidden="true"/>
													</button>
												</div>
											</div>
										</div>
										{/* Main */}
										<div className="divide-y divide-gray-200">
											<div className="pb-6">
												<div
													className="lg:-mt-15 -mt-12 flow-root px-4 sm:-mt-8 sm:flex sm:items-end sm:px-6">
													<div className="mt-6 sm:flex-1">
														<div>
															<div className="flex items-center">
																<h3 className="text-xl font-bold text-gray-900 sm:text-2xl">
																	{assignment?.title}
																</h3>
															</div>
															<p className="text-sm text-gray-500">{section?.course_title}</p>
														</div>
													
													</div>
												</div>
											</div>
											<div className="px-4 py-5 sm:px-0 sm:py-0">
												<dl className="space-y-8 sm:space-y-0 sm:divide-y sm:divide-gray-200">
													<div className="sm:flex sm:px-6 sm:py-5">
														<dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
															Total Marks
														</dt>
														<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:ml-6 sm:mt-0">
															{assignment?.total_marks}
														</dd>
													</div>
													<div className="sm:flex sm:px-6 sm:py-5">
														<dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
															Due Date & Time
														</dt>
														<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:ml-6 sm:mt-0">
															{formatISO(new Date(assignment?.end_date),
															           {representation: 'date'})}
															{' '}at{' '}
															{assignment?.end_time.slice(0, 5)}
														</dd>
													</div>
													<div className="sm:flex sm:px-6 sm:py-5">
														<dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">Instructions</dt>
														<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:ml-6 sm:mt-0">
															<p>
																{assignment?.instructions}
															</p>
														</dd>
													</div>
													<div className="sm:flex sm:px-6 sm:py-5">
														<dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
															Reference Materials
														</dt>
														<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:ml-6 sm:mt-0">
															{
																resourceFileName
																? (
																	<a
																		href={resourceFileUrl}
																		download={resourceFileName}
																		className="block text-sm font-medium leading-6 text-blue-600"
																	>
																		{resourceFileName}
																	</a>
																)
																: (
																	<p
																		className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
																	>
																		Not Available
																	</p>
																)
															}
														</dd>
													</div>
													<div className="sm:flex sm:px-6 sm:py-5">
														<dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
															Your work
														</dt>
														<dd className="flex flex-row mt-1 text-sm text-gray-900 sm:col-span-2 sm:ml-6 sm:mt-0">
															{
																mySubmission ?
																(
																	<a
																		href={`http://localhost:8000/api/v1/files/${mySubmission?.file_path}`}
																		download={mySubmission?.file_name}
																		className="block text-sm font-medium leading-6 text-blue-600"
																	>
																		{mySubmission?.file_name}
																	</a>
																)
																             :
																(
																	file
																	? (
																		<a
																			href={fileUrl}
																			download={file.name}
																			className="block text-sm font-medium leading-6 text-blue-600"
																		>
																			{file.name}
																		</a>
																	)
																	: (
																		<p
																			className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
																		>
																			Not File Selected
																		</p>
																	))
																
															}
															{
																!mySubmission ?
																(
																	<div>
																		<input
																			style={{display: 'none'}}
																			ref={fileInputRef}
																			type="file"
																			accept=".txt, .pdf, .doc, .docx"
																			onChange={handleFileChange}
																		/>
																		
																		<button
																			type="button"
																			onClick={handleFileInput}
																			className="ml-8 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2"
																		>
																			Update
																		</button>
																	</div>
																)
																              :
																''
															}
														</dd>
													</div>
												</dl>
												
												{
													!mySubmission ?
													(
														<div
															className="flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6">
															<div className="flex justify-end space-x-3">
																<button
																	type="submit"
																	onClick={handleSubmit}
																	className="inline-flex justify-center rounded-md bg-primary-900 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
																>
																	Submit
																</button>
															</div>
														</div>
													)
													              :
													''
												}
											</div>
										</div>
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
