// props:
// type, name, lable, required, onChange

import React from 'react';
import {QuestionMarkCircleIcon} from "@heroicons/react/20/solid";

const TextInput = ({name, type, label, value, required, maxLength, onChange}) => {
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
                    maxLength={maxLength}
                    autoComplete="false"
                    className='block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-primary-600 focus:ring-primary-600 sm:max-w-xs sm:text-sm'
                />
            </div>
        </div>
    );
};

export default TextInput;
