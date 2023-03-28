import React from 'react';

const TextInputLong = ({name, type, label, value, required, onChange}) => {
    return (
        <div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5'>
            <label
                htmlFor={name}
                className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
            >
                {label} {required ? (<span className='text-gray-600 font-light'>*</span>) : ''}
            </label>
            <div className='mt-1 sm:col-span-2 sm:mt-0'>
                <input
                    type={type}
                    name={name}
                    id={name}
                    value={value}
                    required={required}
                    onChange={onChange}
                    className='block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-primary-600 focus:ring-primary-600 sm:text-sm'
                />
            </div>
        </div>
    );
};

export default TextInputLong;
