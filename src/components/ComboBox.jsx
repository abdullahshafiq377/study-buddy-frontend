import React, { useState } from 'react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Combobox } from '@headlessui/react';


function classNames (...classes) {
	return classes.filter(Boolean)
	              .join(' ');
}

export default function ComboBox ({data, selectedData, setSelectedData, label}) {
	let items = [{id: '', name: ''}];
	if (data) {
		if (data[0]?.title) {
			items = data.map(d => ({id: d.id, name: d.title}));
		}
		else if (data[0]?.name) {
			items = data.map(d => ({id: d.id, name: d.name}));
		}
	}
	const [query, setQuery] = useState('');
	
	const filteredData =
		query === ''
		? items
		: items.filter((d) => {
			return d.name.toLowerCase()
			        .includes(query.toLowerCase());
		});
	
	const labelElement = (<label
		className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
	>
		{label}
	</label>);
	
	return (
		<div className={label ? 'sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5'
		                      : ''}>
			{label ? labelElement : ''}
			<Combobox as="div" value={selectedData} onChange={setSelectedData}>
				<div className="relative mt-2">
					<Combobox.Input
						className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
						onChange={(event) => setQuery(event.target.value)}
						displayValue={(d) => d?.name}
					/>
					<Combobox.Button
						className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
						<ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
					</Combobox.Button>
					
					{filteredData.length > 0 && (
						<Combobox.Options
							className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
							{filteredData.map((d) => (
								<Combobox.Option
									key={d.id}
									value={d}
									className={({active}) =>
										classNames(
											'relative cursor-default select-none py-2 pl-8 pr-4',
											active ? 'bg-primary-900 text-white' : 'text-gray-900'
										)
									}
								>
									{({active, selected}) => (
										<>
                                            <span
	                                            className={classNames('block truncate',
	                                                                  selected && 'font-semibold')}>{d.name}</span>
											
											{selected && (
												<span
													className={classNames(
														'absolute inset-y-0 left-0 flex items-center pl-1.5',
														active ? 'text-white' : 'text-primary-900'
													)}
												>
                        <CheckIcon className="h-5 w-5" aria-hidden="true"/>
                      </span>
											)}
										</>
									)}
								</Combobox.Option>
							))}
						</Combobox.Options>
					)}
				</div>
			</Combobox>
		</div>
	);
}
