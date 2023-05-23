import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

function classNames (...classes) {
	return classes.filter(Boolean)
	              .join(' ');
}

export default function ViewNoticeSlideOver ({open, setOpen, notice}) {
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
													className="text-base font-semibold leading-6 text-gray-900">Notice</Dialog.Title>
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
											<div className="px-4 py-5 sm:px-0 sm:py-0">
												<dl className="space-y-8 sm:space-y-0 sm:divide-y sm:divide-gray-200">
													<div className="sm:flex sm:px-6 sm:py-5">
														<dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
															Title
														</dt>
														<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:ml-6 sm:mt-0">
															{notice?.title}
														</dd>
													</div>
													<div className="sm:flex sm:px-6 sm:py-5">
														<dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
															Link
														</dt>
														<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:ml-6 sm:mt-0">
															<a
																href={notice?.link}
																target={'_blank'}
																className="block text-sm font-medium leading-6 text-blue-600"
															>
																{notice?.link}
															</a>
														
														</dd>
													</div>
												</dl>
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
