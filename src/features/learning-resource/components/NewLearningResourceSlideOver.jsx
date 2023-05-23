import React, { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import ComboBox from '../../../components/ComboBox';
import FeedbackAlert from '../../../components/FeedbackAlert';
import { useGetSectionsByInstructorQuery } from '../../sections/sectionsApiSlice';
import { useSelector } from 'react-redux';
import { selectCurrentUserId } from '../../auth/authSlice';
import { useAddNewLearningResourceMutation } from '../learningResourcesApiSlice';

export default function NewLearningResourceSlideOver ({open, setOpen}) {
	const userId = useSelector(selectCurrentUserId);
	
	const [addNewLearningResource] = useAddNewLearningResourceMutation();
	
	const {data: sectionData, isSuccess: isSuccessSection} = useGetSectionsByInstructorQuery(userId);
	
	const [title, setTitle] = useState('');
	const [showErrorElement, setShowErrorElement] = useState(false);
	const [section, setSection] = useState(null);
	let sections = [];
	
	const fileInputRef = useRef(null);
	const [file, setFile] = useState(null);
	const [fileUrl, setFileUrl] = useState(null);
	
	if (isSuccessSection) {
		let {ids, entities} = sectionData;
		sections = ids.map(id => entities[id]);
	}
	
	
	const handleTitleInput = (e) => setTitle(e.target.value);
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
	
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const formData = new FormData();
			formData.append('title', title);
			formData.append('sectionId', section.id);
			file ? formData.append('file', file, file?.name) : formData.append('file', null);
			
			await addNewLearningResource(formData)
				.unwrap();
			setTitle('');
			setSection(null);
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
								
								<Dialog.Panel className="pointer-events-auto w-screen max-w-md">
									<form onSubmit={handleSubmit}
									      className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
										<div className="h-0 flex-1 overflow-y-auto">
											<div className="bg-gray-50 py-6 px-4 sm:px-6">
												<div className="flex items-center justify-between">
													<Dialog.Title
														className="text-base font-semibold leading-6 text-gray-900">
														New Learning Resource
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
												<div className="mt-1">
													<p className="text-sm text-gray-500">
														Get started by filling in the information below to add
														new Learning Resource.
													</p>
												</div>
											</div>
											<div className="flex flex-1 flex-col justify-between">
												<div className="divide-y divide-gray-200 px-4 sm:px-6">
													<div className="space-y-6 pt-6 pb-5">
														{showErrorElement ? (<div className="mt-2">
															<FeedbackAlert type="error"
															               content={'Please fill all the required fields'}/>
														</div>) : ''}
														<div>
															<label
																htmlFor="section-title"
																className="block text-sm font-medium leading-6 text-gray-900"
															>
																Title {' '}
																<span className="text-gray-600 font-light">*</span>
															</label>
															<div className="mt-2">
																<input
																	type="text"
																	name="section-title"
																	id="section-title"
																	required={true}
																	value={title}
																	onChange={handleTitleInput}
																	className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
																/>
															</div>
														</div>
														<div>
															<label
																className="block text-sm font-medium leading-6 text-gray-900"
															>
																Section {' '}
																<span className="text-gray-600 font-light">*</span>
															</label>
															<div className="mt-2">
																<ComboBox data={sections} selectedData={section}
																          setSelectedData={setSection}/>
															</div>
														</div>
														<div>
															<label
																className="block text-sm font-medium leading-6 text-gray-900"
															>
																Resource File {' '}
																<span className="text-gray-600 font-light">*</span>
															</label>
															<div className="mt-2 grid grid-cols-4 gap-4">
																{
																	file
																	? (<a
																		href={fileUrl}
																		download={file.name}
																		className="col-span-3 block text-sm font-medium leading-6 text-blue-600 sm:mt-1.5">
																		{file.name}</a>)
																	: (<p
																		className="col-span-3 block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5">No
																		File Selected</p>)
																}
																
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
																		className=" rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2"
																	>
																		Change
																	</button>
																</div>
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
												Add
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
