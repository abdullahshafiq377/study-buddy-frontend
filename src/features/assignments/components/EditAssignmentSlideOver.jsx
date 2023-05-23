import React, { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';
import { selectCurrentUserId } from '../../auth/authSlice';
import { useGetSectionsByInstructorQuery } from '../../sections/sectionsApiSlice';
import ComboBox from '../../../components/ComboBox';
import { useDeleteAssignmentMutation, useUpdateAssignmentMutation } from '../assignmentApiSlice';
import { formatISO } from 'date-fns';
import ConfirmDeletionModal from '../../../components/ConfirmDeletionModal';

export default function EditAssignmentSlideOver ({open, setOpen, assignment}) {
	const userId = useSelector(selectCurrentUserId);
	console.log(formatISO(new Date(assignment?.end_date), {representation: 'date'}));
	
	const {data: sectionData, isSuccess: isSuccessSection} = useGetSectionsByInstructorQuery(userId);
	const [updateAssignment] = useUpdateAssignmentMutation();
	const [deleteAssignment] = useDeleteAssignmentMutation();
	
	const fileInputRef = useRef(null);
	
	
	const [title, setTitle] = useState(assignment?.title);
	const [startTime, setStartTime] = useState(assignment?.start_time);
	const [startDate, setStartDate] = useState(formatISO(new Date(assignment?.start_date), {representation: 'date'}));
	const [endTime, setEndTime] = useState(assignment?.end_time);
	const [endDate, setEndDate] = useState(formatISO(new Date(assignment?.end_date), {representation: 'date'}));
	const [instructions, setInstructions] = useState(assignment?.instructions);
	const [totalMarks, setTotalMarks] = useState(assignment?.total_marks);
	const [section, setSection] = useState(
		{id: assignment?.section_id, name: sectionData?.entities[assignment?.section_id]?.title});
	const [file, setFile] = useState(null);
	const [fileUrl, setFileUrl] = useState(`http://localhost:8000/api/v1/files/${assignment?.file_path}`);
	const [fileName, setFileName] = useState(assignment?.file_name);
	const [openConfirmDeletionModal, setOpenConfirmDeletionModal] = useState(false);
	
	let sections = [];
	
	if (isSuccessSection) {
		let {ids, entities} = sectionData;
		sections = ids.map(id => entities[id]);
	}
	
	const handleTitleInput = (e) => setTitle(e.target.value);
	const handleStartTimeInput = (e) => setStartTime(e.target.value);
	const handleStartDateInput = (e) => setStartDate(e.target.value);
	const handleEndTimeInput = (e) => setEndTime(e.target.value);
	const handleEndDateInput = (e) => setEndDate(e.target.value);
	const handleInstructionsInput = (e) => setInstructions(e.target.value);
	const handleTotalMarksInput = (e) => setTotalMarks(e.target.value);
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
			let formData = new FormData();
			formData.append('id', assignment.id);
			formData.append('title', title);
			formData.append('sectionId', section.id);
			formData.append('startTime', startTime);
			formData.append('startDate', startDate);
			formData.append('endTime', endTime);
			formData.append('endDate', endDate);
			formData.append('instructions', instructions);
			formData.append('totalMarks', totalMarks);
			file ? formData.append('file', file, file?.name) : formData.append('file', null);
			
			await updateAssignment(formData)
				.unwrap();
			setOpen(false);
			
		} catch (e) {
			console.log(e);
		}
	};
	
	const handleDelete = async () => {
		await deleteAssignment(assignment)
			.unwrap();
		setOpenConfirmDeletionModal(false);
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
															New Assignment
														</Dialog.Title>
														<p className="text-sm text-gray-500">
															Create a new post by filling in the information below.
														</p>
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
													className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
													<div>
														<label
															htmlFor="project-name"
															className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
														>
															Title
														</label>
													</div>
													<div className="sm:col-span-2">
														<input
															type="text"
															name="title"
															id="title"
															value={title}
															onChange={handleTitleInput}
															required={true}
															className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
														/>
													</div>
												</div>
												<div
													className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
													<div>
														<label
															htmlFor="section"
															className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
														>
															Section
														</label>
													</div>
													<div className="sm:col-span-2">
														<ComboBox data={sections} selectedData={section}
														          setSelectedData={setSection}/>
													</div>
												</div>
												<div
													className="space-y-2 px-4 sm:grid sm:grid-cols-7 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
													<div>
														<label
															htmlFor="start-time"
															className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
														>
															Start Time
														</label>
													</div>
													<div className="sm:col-span-2">
														<input
															type="time"
															name="start-time"
															id="start-time"
															value={startTime}
															onChange={handleStartTimeInput}
															required={true}
															className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
														/>
													</div>
													<div></div>
													<div>
														<label
															htmlFor="start-date"
															className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
														>
															Start Date
														</label>
													</div>
													<div className="sm:col-span-2">
														<input
															type="date"
															name="start-date"
															id="start-date"
															value={startDate}
															onChange={handleStartDateInput}
															required={true}
															className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
														/>
													</div>
												</div>
												<div
													className="space-y-2 px-4 sm:grid sm:grid-cols-7 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
													<div>
														<label
															htmlFor="end-time"
															className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
														>
															End Time
														</label>
													</div>
													<div className="sm:col-span-2">
														<input
															type="time"
															name="end-time"
															id="end-time"
															value={endTime}
															onChange={handleEndTimeInput}
															required={true}
															className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
														/>
													</div>
													<div></div>
													<div>
														<label
															htmlFor="end-date"
															className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
														>
															End Date
														</label>
													</div>
													<div className="sm:col-span-2">
														<input
															type="date"
															name="end-date"
															id="end-date"
															value={endDate}
															onChange={handleEndDateInput}
															required={true}
															className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
														/>
													</div>
												</div>
												
												{/* Project description */}
												<div
													className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
													<div>
														<label
															htmlFor="instructions"
															className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
														>
															Instructions
														</label>
													</div>
													<div className="sm:col-span-2">
                            <textarea
	                            id="instructions"
	                            name="instructions"
	                            rows={3}
	                            value={instructions}
	                            required
	                            onChange={handleInstructionsInput}
	                            className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:py-1.5 sm:text-sm sm:leading-6"
                            />
													</div>
												</div>
												
												<div
													className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
													<div>
														<label
															htmlFor="total-marks"
															className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
														>
															Total Marks
														</label>
													</div>
													<div className="sm:col-span-2">
														<input
															type="text"
															name="total-marks"
															id="total-marks"
															value={totalMarks}
															onChange={handleTotalMarksInput}
															required={true}
															className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
														/>
													</div>
												</div>
												
												<div
													className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
													<div>
														<label
															htmlFor="project-name"
															className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
														>
															Reference Materials
														</label>
													</div>
													
													{
														fileUrl
														? (
															<a
																href={fileUrl}
																download={fileName}
																className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
															>
																{fileName}</a>
														)
														: (
															<p
																className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
															>
																No File Selected
															</p>
														)
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
															className="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2"
														>
															Update
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
													onClick={() => setOpenConfirmDeletionModal(true)}
													className="inline-flex justify-center gap-x-1.5 rounded-md bg-red-100 px-3 py-2 text-sm font-semibold text-red-700 shadow-sm hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
												>
													<TrashIcon className="-ml-0.5 h-5 w-5 text-red-700"
													           aria-hidden="true"/>
												
												</button>
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
													Create
												</button>
											</div>
										</div>
									</form>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
					<ConfirmDeletionModal open={openConfirmDeletionModal}
					                      setOpen={setOpenConfirmDeletionModal}
					                      title={assignment.title}
					                      onDelete={handleDelete}
					/>
				</div>
			</Dialog>
		</Transition.Root>
	);
}
