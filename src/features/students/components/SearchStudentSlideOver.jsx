import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import ComboBox from '../../../components/ComboBox';
import { useGetStudentsQuery } from '../studentsApiSlice';
import { useNavigate } from 'react-router-dom';

export default function SearchStudentSlideOver ({open, setOpen}) {
	const {data: studentData, isSuccess: isSuccessStudent} = useGetStudentsQuery();
	
	const navigate = useNavigate();
	
	const [student, setStudent] = useState(null);
	let students = [];
	
	if (isSuccessStudent) {
		let {ids, entities} = studentData;
		students = ids.map(id => entities[id]);
	}
	
	const handleSubmit = (e) => {
		e.preventDefault();
		navigate(`/sub-admin/registration/${student?.id}`);
		setOpen(!open);
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
								
								<Dialog.Panel className="pointer-events-auto w-screen max-w-md">
									<form
										className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
										<div className="h-0 flex-1 overflow-y-auto">
											<div className="bg-gray-50 py-6 px-4 sm:px-6">
												<div className="flex items-center justify-between">
													<Dialog.Title
														className="text-base font-semibold leading-6 text-gray-900">
														Search Student
													</Dialog.Title>
													<div className="ml-3 flex h-7 items-center">
														<button
															type="button"
															className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
															onClick={() => setOpen(false)}
														>
															<span className="sr-only">Close panel</span>
															<XMarkIcon className="h-6 w-6" aria-hidden="true"/>
														</button>
													</div>
												</div>
											</div>
											<div className="flex flex-1 flex-col justify-between">
												<div className="divide-y divide-gray-200 px-4 sm:px-6">
													<div className="space-y-6 pt-6 pb-5">
														
														<div>
															<label
																className="block text-sm font-medium leading-6 text-gray-900"
															>
																Students {' '}
																<span className="text-gray-600 font-light">*</span>
															</label>
															<div className="mt-2">
																<ComboBox data={students} selectedData={student}
																          setSelectedData={setStudent}/>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="flex flex-shrink-0 justify-end px-4 py-4">
											<button
												type="button"
												className="rounded-md bg-white py-2 px-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
												onClick={() => setOpen(false)}
											>
												Cancel
											</button>
											<button
												onClick={handleSubmit}
												className="ml-4 inline-flex justify-center rounded-md bg-primary-900 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
											>
												Proceed
											</button>
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
