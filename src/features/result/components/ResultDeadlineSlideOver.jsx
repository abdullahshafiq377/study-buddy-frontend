import React, { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { format, formatISO, parse, parseISO } from 'date-fns';
import axios from 'axios';

export default function ResultDeadlineSlideOver ({open, setOpen}) {
	
	const [deadlines, setDeadlines] = useState(null);
	
	useEffect(() => {
		axios.get('http://localhost:8000/api/v1/results/deadline')
		     .then((r) => {
			     setDeadlines(r.data[0]);
			     setAssignmentDeadline(r.data[0].assignment_deadline ?
			                           formatISO(new Date(
				                                     r.data[0].assignment_deadline ? r.data[0].assignment_deadline : null),
			                                     {representation: 'complete'})
				                           .slice(0, 16) : null);
			     
			     setQuizDeadline(r.data[0].quiz_deadline ?
			                     formatISO(new Date(
				                               r.data[0].quiz_deadline ? r.data[0].quiz_deadline : null),
			                               {representation: 'complete'})
				                     .slice(0, 16) : null);
			     
			     setMidDeadline(r.data[0].mid_deadline ?
			                    formatISO(new Date(
				                              r.data[0].mid_deadline ? r.data[0].mid_deadline : null),
			                              {representation: 'complete'})
				                    .slice(0, 16) : null);
			     
			     setTerminalDeadline(r.data[0].terminal_deadline ?
			                         formatISO(new Date(
				                                   r.data[0].terminal_deadline ? r.data[0].terminal_deadline : null),
			                                   {representation: 'complete'})
				                         .slice(0, 16) : null);
		     });
	}, []);
	
	// console.log(new Date(deadlines?.assignment_deadline).toISOString());
	
	const today = new Date().toISOString()
	                        .slice(0, 16);
	
	const [assignmentDeadline, setAssignmentDeadline] = useState('');
	const [quizDeadline, setQuizDeadline] = useState('');
	const [midDeadline, setMidDeadline] = useState('');
	const [terminalDeadline, setTerminalDeadline] = useState('');
	
	
	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(today);
		try {
			const deadlines = {
				assignmentDeadline: assignmentDeadline ? assignmentDeadline : null,
				quizDeadline: quizDeadline ? quizDeadline : null,
				midDeadline: midDeadline ? midDeadline : null,
				terminalDeadline: terminalDeadline ? terminalDeadline : null,
			};
			
			console.log(deadlines);
			
			await axios.put('http://localhost:8000/api/v1/results/deadline', deadlines);
			
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
									<form onSubmit={handleSubmit}
									      className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
										<div className="flex-1">
											{/* Header */}
											<div className="bg-gray-50 px-4 py-6 sm:px-6">
												<div className="flex items-start justify-between space-x-3">
													<div className="space-y-1">
														<Dialog.Title
															className="text-base font-semibold leading-6 text-gray-900">
															Result Deadlines
														</Dialog.Title>
													</div>
													<div className="flex h-7 items-center">
														<button
															type="button"
															className="text-gray-400 hover:text-gray-500"
															onClick={() => setOpen(false)}
														>
															<span className="sr-only">Close panel</span>
															<XMarkIcon className="h-6 w-6" aria-hidden="true"/>
														</button>
													</div>
												</div>
											</div>
											
											{/* Divider container */}
											<div
												className="space-y-6 py-6 sm:space-y-0 sm:divide-y sm:divide-gray-200 sm:py-0">
												
												<div
													className="space-y-2 px-4 sm:grid sm:grid-cols-7 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
													<div className="sm:col-span-2">
														<label
															htmlFor="a1-total-marks"
															className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
														>
															Assignments
														</label>
													</div>
													<div className="sm:col-span-4">
														<input
															type="datetime-local"
															name="a1-total-marks"
															id="a1-total-marks"
															placeholder="Total Marks"
															min={today}
															value={assignmentDeadline}
															onChange={(e) => setAssignmentDeadline(e.target.value)}
															className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
														/>
													</div>
													<div>
														<button
															type="button"
															onClick={() => {
																setAssignmentDeadline('');
															}}
															className="text-blue-600 hover:text-primary-900 text-sm font-medium"
														>
															Reset
														</button>
													</div>
												</div>
												<div
													className="space-y-2 px-4 sm:grid sm:grid-cols-7 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
													<div className="sm:col-span-2">
														<label
															htmlFor="a1-total-marks"
															className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
														>
															Quizzes
														</label>
													</div>
													<div className="sm:col-span-4">
														<input
															type="datetime-local"
															name="a1-total-marks"
															id="a1-total-marks"
															placeholder="Total Marks"
															min={today}
															value={quizDeadline}
															onChange={(e) => setQuizDeadline(e.target.value)}
															className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
														/>
													</div>
													<div>
														<button
															type="button"
															onClick={() => {
																setQuizDeadline('');
															}}
															className="text-blue-600 hover:text-primary-900 text-sm font-medium"
														>
															Reset
														</button>
													</div>
												</div>
												<div
													className="space-y-2 px-4 sm:grid sm:grid-cols-7 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
													<div className="sm:col-span-2">
														<label
															htmlFor="a1-total-marks"
															className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
														>
															Mid-Term
														</label>
													</div>
													<div className="sm:col-span-4">
														<input
															type="datetime-local"
															name="a1-total-marks"
															id="a1-total-marks"
															placeholder="Total Marks"
															min={today}
															value={midDeadline}
															onChange={(e) => setMidDeadline(e.target.value)}
															className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
														/>
													</div>
													<div>
														<button
															type="button"
															onClick={() => {
																setMidDeadline('');
															}}
															className="text-blue-600 hover:text-primary-900 text-sm font-medium"
														>
															Reset
														</button>
													</div>
												</div>
												<div
													className="space-y-2 px-4 sm:grid sm:grid-cols-7 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
													<div className="sm:col-span-2">
														<label
															htmlFor="a1-total-marks"
															className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
														>
															Terminal
														</label>
													</div>
													<div className="sm:col-span-4">
														<input
															type="datetime-local"
															name="a1-total-marks"
															id="a1-total-marks"
															placeholder="Total Marks"
															min={today}
															value={terminalDeadline}
															onChange={(e) => setTerminalDeadline(e.target.value)}
															className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
														/>
													</div>
													<div>
														<button
															type="button"
															onClick={() => {
																setTerminalDeadline('');
															}}
															className="text-blue-600 hover:text-primary-900 text-sm font-medium"
														>
															Reset
														</button>
													</div>
												</div>
											
											</div>
										</div>
										
										{/* Action buttons */}
										<div className="flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6">
											<div className="flex justify-end space-x-3">
												<button
													type="button"
													className="rounded-md bg-white py-2 px-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
													onClick={() => setOpen(false)}
												>
													Cancel
												</button>
												<button
													type="submit"
													className="inline-flex justify-center rounded-md bg-primary-900 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
												>
													Update
												</button>
											</div>
										</div>
									</form>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
}
