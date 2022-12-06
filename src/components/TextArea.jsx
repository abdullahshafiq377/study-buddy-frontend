import React from 'react';

const TextArea = ({ name, rows, label, value, required, onChange }) => {
	return (
		<div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5'>
			<label
				htmlFor={name}
				className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
			>
				{label}
			</label>
			<div className='mt-1 sm:col-span-2 sm:mt-0'>
				<textarea
					id={name}
					name={name}
					rows={rows}
					onChange={onChange}
					required={required}
					className='block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-primary-600 focus:ring-primary-600 sm:text-sm'
					defaultValue={value}
				/>
			</div>
		</div>
	);
};

export default TextArea;
