import { Fragment, useState } from 'react';
import { Combobox, Dialog, Transition } from '@headlessui/react';
import { ChevronRightIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { UsersIcon } from '@heroicons/react/24/outline';
import { useDispatch } from 'react-redux';
import { setChosenChatDetails } from '../chatsApiSlice';

function classNames (...classes) {
	return classes.filter(Boolean)
	              .join(' ');
}

export default function SearchUsers ({open, setOpen, data, setCurrentUser}) {
	const [query, setQuery] = useState('');
	const people = data;
	const recent = [];
	
	const dispatch = useDispatch();
	const filteredPeople =
		query === ''
		? []
		: people.filter((person) => {
			return person.name.toLowerCase()
			             .includes(query.toLowerCase());
		});
	
	return (
		<Transition.Root show={open} as={Fragment} afterLeave={() => setQuery('')} appear>
			<Dialog as="div" className="relative z-10" onClose={setOpen}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity"/>
				</Transition.Child>
				
				<div className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0 scale-95"
						enterTo="opacity-100 scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-95"
					>
						<Dialog.Panel
							className="mx-auto max-w-3xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
							<Combobox onChange={(person) => (window.location = person.profileUrl)}>
								{({activeOption}) => (
									<>
										<div className="relative">
											<MagnifyingGlassIcon
												className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400"
												aria-hidden="true"
											/>
											<Combobox.Input
												className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
												placeholder="Search..."
												onChange={(event) => setQuery(event.target.value)}
											/>
										</div>
										
										{(query === '' || filteredPeople.length > 0) && (
											<Combobox.Options as="div" static hold
											                  className="flex divide-x divide-gray-100">
												<div
													className={classNames(
														'max-h-96 min-w-0 flex-auto scroll-py-4 overflow-y-auto px-6 py-4',
														activeOption && 'sm:h-96'
													)}
												>
													
													<div className="-mx-2 text-sm text-gray-700">
														{(query === '' ? recent : filteredPeople).map((person) => (
															<Combobox.Option
																as="div"
																key={person?.id}
																value={person}
																onClick={(e) => {
																	e.preventDefault();
																}}
																className={({active}) =>
																	classNames(
																		'flex cursor-default select-none items-center rounded-md p-2',
																		active && 'bg-gray-100 text-gray-900'
																	)
																}
															>
																{({active}) => (
																	<>
																		<img
																			src={`http://localhost:8000/api/v1/files/${person.image}`}
																			alt=""
																			className="h-6 w-6 flex-none rounded-full"/>
																		<span
																			className="ml-3 flex-auto truncate">{person.name}</span>
																		{active && (
																			<ChevronRightIcon
																				className="ml-3 h-5 w-5 flex-none text-gray-400"
																				aria-hidden="true"
																			/>
																		)}
																	</>
																)}
															</Combobox.Option>
														))}
													</div>
												</div>
												
												{activeOption && (
													<div
														className="hidden h-96 w-1/2 flex-none flex-col divide-y divide-gray-100 overflow-y-auto sm:flex">
														<div className="flex-none p-6 text-center">
															<img
																src={`http://localhost:8000/api/v1/files/${activeOption.image}`}
																alt=""
																className="mx-auto h-16 w-16 rounded-full"/>
															<h2 className="mt-3 font-semibold text-gray-900">{activeOption.name}</h2>
															<p className="text-sm leading-6 text-gray-500">{activeOption.role}</p>
														</div>
														<div className="flex flex-auto flex-col justify-between p-6">
															<dl className="grid grid-cols-1 gap-x-6 gap-y-3 text-sm text-gray-700">
																<dt className="col-end-1 font-semibold text-gray-900">Gender</dt>
																<dd>{activeOption.gender.charAt(0)
																                 .toUpperCase() + activeOption.gender.slice(
																	1)}</dd>
																<dt className="col-end-1 font-semibold text-gray-900">Email</dt>
																<dd className="truncate">
																	<a href={`mailto:${activeOption.email}`}
																	   className="text-primary-900 underline">
																		{activeOption.email}
																	</a>
																</dd>
																<dt className="col-end-1 font-semibold text-gray-900">Contact</dt>
																<dd>{activeOption.contact}</dd>
															
															</dl>
															<button
																type="button"
																onClick={() => {
																	dispatch(
																		setChosenChatDetails({
																			                     chatDetails: {
																				                     id: activeOption.id,
																				                     name: activeOption.name,
																				                     image: activeOption.image
																			                     },
																			                     chatType: 'direct'
																		                     }));
																	setOpen(false);
																}}
																className="mt-6 w-full rounded-md bg-primary-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
															>
																Send message
															</button>
														</div>
													</div>
												)}
											</Combobox.Options>
										)}
										
										{query !== '' && filteredPeople.length === 0 && (
											<div className="px-6 py-14 text-center text-sm sm:px-14">
												<UsersIcon className="mx-auto h-6 w-6 text-gray-400"
												           aria-hidden="true"/>
												<p className="mt-4 font-semibold text-gray-900">No people found</p>
												<p className="mt-2 text-gray-500">
													We couldn’t find anything with that term. Please try again.
												</p>
											</div>
										)}
									</>
								)}
							</Combobox>
						</Dialog.Panel>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	);
}
