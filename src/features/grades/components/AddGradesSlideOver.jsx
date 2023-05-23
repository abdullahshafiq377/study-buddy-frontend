import React, { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { useUpdateGradeMutation } from '../gradesApiSlice';

export default function AddGradesSlideOver ({open, setOpen, grade}) {
	const [updateGrades] = useUpdateGradeMutation();
	
	const [a1TotalMarks, setA1TotalMarks] = useState(grade?.a1_total);
	const [a2TotalMarks, setA2TotalMarks] = useState(grade?.a2_total);
	const [a3TotalMarks, setA3TotalMarks] = useState(grade?.a3_total);
	const [a4TotalMarks, setA4TotalMarks] = useState(grade?.a4_total);
	const [a1ObtMarks, setA1ObtMarks] = useState(grade?.a1_obt);
	const [a2ObtMarks, setA2ObtMarks] = useState(grade?.a2_obt);
	const [a3ObtMarks, setA3ObtMarks] = useState(grade?.a3_obt);
	const [a4ObtMarks, setA4ObtMarks] = useState(grade?.a4_obt);
	
	const [q1TotalMarks, setQ1TotalMarks] = useState(grade?.q1_total);
	const [q2TotalMarks, setQ2TotalMarks] = useState(grade?.q2_total);
	const [q3TotalMarks, setQ3TotalMarks] = useState(grade?.q3_total);
	const [q4TotalMarks, setQ4TotalMarks] = useState(grade?.q4_total);
	const [q1ObtMarks, setQ1ObtMarks] = useState(grade?.q1_obt);
	const [q2ObtMarks, setQ2ObtMarks] = useState(grade?.q2_obt);
	const [q3ObtMarks, setQ3ObtMarks] = useState(grade?.q3_obt);
	const [q4ObtMarks, setQ4ObtMarks] = useState(grade?.q4_obt);
	
	const [midTotalMarks, setMidTotalMarks] = useState(grade?.mid_total);
	const [terminalTotalMarks, setTerminalTotalMarks] = useState(grade?.terminal_total);
	const [midObtMarks, setMidObtMarks] = useState(grade?.mid_obt);
	const [terminalObtMarks, setTerminalObtMarks] = useState(grade?.terminal_obt);
	
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const grades = {
				id: grade.id,
				a1: {
					total: a1TotalMarks > 0 ? a1TotalMarks : null,
					obtained: a1TotalMarks > 0 ? a1ObtMarks : null
				},
				a2: {
					total: a2TotalMarks > 0 ? a2TotalMarks : null,
					obtained: a2TotalMarks > 0 ? a2ObtMarks : null
				},
				a3: {
					total: a3TotalMarks > 0 ? a3TotalMarks : null,
					obtained: a3TotalMarks > 0 ? a3ObtMarks : null
				},
				a4: {
					total: a4TotalMarks > 0 ? a4TotalMarks : null,
					obtained: a4TotalMarks > 0 ? a4ObtMarks : null
				},
				q1: {
					total: q1TotalMarks > 0 ? q1TotalMarks : null,
					obtained: q1TotalMarks > 0 ? q1ObtMarks : null
				},
				q2: {
					total: q2TotalMarks > 0 ? q2TotalMarks : null,
					obtained: q2TotalMarks > 0 ? q2ObtMarks : null
				},
				q3: {
					total: q3TotalMarks > 0 ? q3TotalMarks : null,
					obtained: q3TotalMarks > 0 ? q3ObtMarks : null
				},
				q4: {
					total: q4TotalMarks > 0 ? q4TotalMarks : null,
					obtained: q4TotalMarks > 0 ? q4ObtMarks : null
				},
				mid: {
					total: midTotalMarks > 0 ? midTotalMarks : null,
					obtained: midTotalMarks > 0 ? midObtMarks : null
				},
				terminal: {
					total: terminalTotalMarks > 0 ? terminalTotalMarks : null,
					obtained: terminalTotalMarks > 0 ? terminalObtMarks : null
				},
			};
			console.log(grades);
			
			await updateGrades(grades)
				.unwrap();
			
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
															{grade?.student_name}
														</Dialog.Title>
														<p className="text-sm text-gray-500">
															{grade?.session}-{grade?.program_title}-{grade?.reg_num}
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
													className="space-y-2 px-4 sm:grid sm:grid-cols-7 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
													<div className="sm:col-span-2">
														<label
															htmlFor="a1-total-marks"
															className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
														>
															Assignment 1
														</label>
													</div>
													<div className="sm:col-span-2">
														<input
															type="number"
															name="a1-total-marks"
															id="a1-total-marks"
															placeholder="Total Marks"
															value={a1TotalMarks}
															onChange={(e) => setA1TotalMarks(e.target.value)}
															className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
														/>
													</div>
													
													<div className="sm:col-span-2">
														<input
															type="number"
															name="a1-obt-marks"
															id="a1-obt-marks"
															placeholder="Marks Obtained"
															value={a1ObtMarks}
															onChange={(e) => setA1ObtMarks(e.target.value)}
															className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
														/>
													</div>
													<div>
														<button
															type="button"
															onClick={() => {
																setA1TotalMarks(0);
																setA1ObtMarks(0);
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
															htmlFor="a2-total-marks"
															className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
														>
															Assignment 2
														</label>
													</div>
													<div className="sm:col-span-2">
														<input
															type="number"
															name="a2-total-marks"
															id="a2-total-marks"
															placeholder="Total Marks"
															value={a2TotalMarks}
															onChange={(e) => setA2TotalMarks(e.target.value)}
															className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
														/>
													</div>
													
													<div className="sm:col-span-2">
														<input
															type="number"
															name="a2-obt-marks"
															id="a2-obt-marks"
															placeholder="Marks Obtained"
															value={a2ObtMarks}
															onChange={(e) => setA2ObtMarks(e.target.value)}
															className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
														/>
													</div>
													<div>
														<button
															type="button"
															onClick={() => {
																setA2TotalMarks(0);
																setA2ObtMarks(0);
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
															htmlFor="a3-total-marks"
															className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
														>
															Assignment 3
														</label>
													</div>
													<div className="sm:col-span-2">
														<input
															type="number"
															name="a3-total-marks"
															id="a3-total-marks"
															placeholder="Total Marks"
															value={a3TotalMarks}
															onChange={(e) => setA3TotalMarks(e.target.value)}
															className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
														/>
													</div>
													
													<div className="sm:col-span-2">
														<input
															type="number"
															name="a3-obt-marks"
															id="a3-obt-marks"
															placeholder="Marks Obtained"
															value={a3ObtMarks}
															onChange={(e) => setA3ObtMarks(e.target.value)}
															className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
														/>
													</div>
													<div>
														<button
															type="button"
															onClick={() => {
																setA3TotalMarks(0);
																setA3ObtMarks(0);
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
															htmlFor="a4-total-marks"
															className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
														>
															Assignment 4
														</label>
													</div>
													<div className="sm:col-span-2">
														<input
															type="number"
															name="a4-total-marks"
															id="a4-total-marks"
															placeholder="Total Marks"
															value={a4TotalMarks}
															onChange={(e) => setA4TotalMarks(e.target.value)}
															className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
														/>
													</div>
													
													<div className="sm:col-span-2">
														<input
															type="number"
															name="a4-obt-marks"
															id="a4-obt-marks"
															placeholder="Marks Obtained"
															value={a4ObtMarks}
															onChange={(e) => setA4ObtMarks(e.target.value)}
															className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
														/>
													</div>
													<div>
														<button
															type="button"
															onClick={() => {
																setA4TotalMarks(0);
																setA4ObtMarks(0);
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
															htmlFor="q1-total-marks"
															className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
														>
															Quiz 1
														</label>
													</div>
													<div className="sm:col-span-2">
														<input
															type="number"
															name="q1-total-marks"
															id="q1-total-marks"
															placeholder="Total Marks"
															value={q1TotalMarks}
															onChange={(e) => setQ1TotalMarks(e.target.value)}
															className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
														/>
													</div>
													
													<div className="sm:col-span-2">
														<input
															type="number"
															name="q1-obt-marks"
															id="q1-obt-marks"
															placeholder="Marks Obtained"
															value={q1ObtMarks}
															onChange={(e) => setQ1ObtMarks(e.target.value)}
															className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
														/>
													</div>
													<div>
														<button
															type="button"
															onClick={() => {
																setQ1TotalMarks(0);
																setQ1ObtMarks(0);
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
															htmlFor="q2-total-marks"
															className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
														>
															Quiz 2
														</label>
													</div>
													<div className="sm:col-span-2">
														<input
															type="number"
															name="q2-total-marks"
															id="q2-total-marks"
															placeholder="Total Marks"
															value={q2TotalMarks}
															onChange={(e) => setQ2TotalMarks(e.target.value)}
															className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
														/>
													</div>
													
													<div className="sm:col-span-2">
														<input
															type="number"
															name="q2-obt-marks"
															id="q2-obt-marks"
															placeholder="Marks Obtained"
															value={q2ObtMarks}
															onChange={(e) => setQ2ObtMarks(e.target.value)}
															className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
														/>
													</div>
													<div>
														<button
															type="button"
															onClick={() => {
																setQ2TotalMarks(0);
																setQ2ObtMarks(0);
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
															htmlFor="q3-total-marks"
															className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
														>
															Quiz 3
														</label>
													</div>
													<div className="sm:col-span-2">
														<input
															type="number"
															name="q3-total-marks"
															id="q3-total-marks"
															placeholder="Total Marks"
															value={q3TotalMarks}
															onChange={(e) => setQ3TotalMarks(e.target.value)}
															className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
														/>
													</div>
													
													<div className="sm:col-span-2">
														<input
															type="number"
															name="q3-obt-marks"
															id="q3-obt-marks"
															placeholder="Marks Obtained"
															value={q3ObtMarks}
															onChange={(e) => setQ3ObtMarks(e.target.value)}
															className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
														/>
													</div>
													<div>
														<button
															type="button"
															onClick={() => {
																setQ3TotalMarks(0);
																setQ3ObtMarks(0);
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
															htmlFor="q4-total-marks"
															className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
														>
															Quiz 4
														</label>
													</div>
													<div className="sm:col-span-2">
														<input
															type="number"
															name="q4-total-marks"
															id="q4-total-marks"
															placeholder="Total Marks"
															value={q4TotalMarks}
															onChange={(e) => setQ4TotalMarks(e.target.value)}
															className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
														/>
													</div>
													
													<div className="sm:col-span-2">
														<input
															type="number"
															name="q4-obt-marks"
															id="q4-obt-marks"
															placeholder="Marks Obtained"
															value={q4ObtMarks}
															onChange={(e) => setQ4ObtMarks(e.target.value)}
															className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
														/>
													</div>
													<div>
														<button
															type="button"
															onClick={() => {
																setQ4TotalMarks(0);
																setQ4ObtMarks(0);
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
															htmlFor="mid-total-marks"
															className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
														>
															Mid-Term
														</label>
													</div>
													<div className="sm:col-span-2">
														<input
															type="number"
															name="mid-total-marks"
															id="mid-total-marks"
															placeholder="Total Marks"
															value={midTotalMarks}
															onChange={(e) => setMidTotalMarks(e.target.value)}
															className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
														/>
													</div>
													
													<div className="sm:col-span-2">
														<input
															type="number"
															name="mid-obt-marks"
															id="mid-obt-marks"
															placeholder="Marks Obtained"
															value={midObtMarks}
															onChange={(e) => setMidObtMarks(e.target.value)}
															className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
														/>
													</div>
													<div>
														<button
															type="button"
															onClick={() => {
																setMidTotalMarks(0);
																setMidObtMarks(0);
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
															htmlFor="terminal-total-marks"
															className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
														>
															Terminal
														</label>
													</div>
													<div className="sm:col-span-2">
														<input
															type="number"
															name="terminal-total-marks"
															id="terminal-total-marks"
															placeholder="Total Marks"
															value={terminalTotalMarks}
															onChange={(e) => setTerminalTotalMarks(e.target.value)}
															className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
														/>
													</div>
													
													<div className="sm:col-span-2">
														<input
															type="number"
															name="terminal-obt-marks"
															id="terminal-obt-marks"
															placeholder="Marks Obtained"
															value={terminalObtMarks}
															onChange={(e) => setTerminalObtMarks(e.target.value)}
															className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
														/>
													</div>
													<div>
														<button
															type="button"
															onClick={() => {
																setTerminalTotalMarks(0);
																setTerminalObtMarks(0);
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
