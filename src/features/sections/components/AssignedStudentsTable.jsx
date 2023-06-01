import { useLayoutEffect, useRef, useState } from 'react';
import { useUnassignSectionMutation } from '../sectionsApiSlice';

function classNames (...classes) {
	return classes.filter(Boolean)
	              .join(' ');
}

export default function AssignedStudentsTable ({section, assignedStudents, refetchAssigned, refetchUnassigned}) {
	const [unAssignSection] = useUnassignSectionMutation();
	const people = assignedStudents;
	const checkbox = useRef();
	const [checked, setChecked] = useState(false);
	const [indeterminate, setIndeterminate] = useState(false);
	const [selectedPeople, setSelectedPeople] = useState([]);
	
	useLayoutEffect(() => {
		const isIndeterminate = selectedPeople.length > 0 && selectedPeople.length < people.length;
		setChecked(selectedPeople.length === people.length);
		setIndeterminate(isIndeterminate);
		checkbox.current.indeterminate = isIndeterminate;
	}, [selectedPeople]);
	
	function toggleAll () {
		setSelectedPeople(checked || indeterminate ? [] : people);
		setChecked(!checked && !indeterminate);
		setIndeterminate(false);
	}
	
	const handleUnAssign = async () => {
		try {
			const sectionDetails = {
				students: [...selectedPeople],
				sectionId: section
			};
			console.log(sectionDetails);
			await unAssignSection(sectionDetails)
				.unwrap();
			setSelectedPeople([]);
			refetchAssigned();
			refetchUnassigned();
		} catch (e) {
			console.log(e);
		}
	};
	
	return (
		<div className="px-4 sm:px-6 lg:px-8">
			<div className="mt-8 flow-root">
				<div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
						<div className="relative">
							{selectedPeople.length > 0 && (
								<div
									className="absolute left-14 top-0 flex h-12 items-center space-x-3 bg-white sm:left-12">
									<button
										type="button"
										onClick={handleUnAssign}
										className="inline-flex items-center rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
									>
										Un-Assign
									</button>
								</div>
							)}
							<table className="min-w-full table-fixed divide-y divide-gray-300">
								<thead>
								<tr>
									<th scope="col" className="relative px-7 sm:w-12 sm:px-6">
										<input
											type="checkbox"
											className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-primary-900 focus:ring-primary-900"
											ref={checkbox}
											checked={checked}
											onChange={toggleAll}
										/>
									</th>
									<th scope="col"
									    className="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900">
										Reg #
									</th>
									<th scope="col"
									    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
										Name
									</th>
									<th scope="col"
									    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
										Email
									</th>
								</tr>
								</thead>
								<tbody className="divide-y divide-gray-200 bg-white">
								{
									people.length ?
									(people.map((person) => (
										<tr key={person.id}
										    className={selectedPeople.includes(person) ? 'bg-gray-50' : undefined}>
											<td className="relative px-7 sm:w-12 sm:px-6">
												{selectedPeople.includes(person) && (
													<div className="absolute inset-y-0 left-0 w-0.5 bg-primary-900"/>
												)}
												<input
													type="checkbox"
													className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-primary-900 focus:ring-primary-900"
													value={person.id}
													checked={selectedPeople.includes(person)}
													onChange={(e) =>
														setSelectedPeople(
															e.target.checked
															? [...selectedPeople, person]
															: selectedPeople.filter((p) => p !== person)
														)
													}
												/>
											</td>
											<td
												className={classNames(
													'whitespace-nowrap py-4 pr-3 text-sm font-medium',
													selectedPeople.includes(person) ? 'text-primary-900'
													                                : 'text-gray-900'
												)}
											>
												{person.session}-{person.program_title}-{person.reg_num}
											</td>
											<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.name}</td>
											<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.email}</td>
										
										</tr>
									)))
									              :
									(<tr>
										<td></td>
										
										<td className="text-sm font-medium text-red-600">No students are assigned to
											this section
										</td>
									</tr>)
								}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
