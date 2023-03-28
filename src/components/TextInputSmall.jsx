import React from 'react';

const TextInputSmall = ({name, type, label, value, required, onChange}) => {
    return (
        <div className='sm:col-span-1 pt-4'>
            <label
                htmlFor={name}
                className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
            >
                {label} {required ? (<span className='text-gray-600 font-light'>*</span>) : ''}
            </label>
            <div className='mt-1'>
                <input
                    type={type}
                    name={name}
                    id={name}
                    value={value}
                    required={required}
                    onChange={onChange}
                    className='block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-600 focus:ring-primary-600  sm:text-sm'
                />
            </div>
        </div>
    );
};

export default TextInputSmall;
