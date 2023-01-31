//Props:
//  name, label, onChange, options={name, label}
import React from 'react';

const RadioInput = ({name, label, value, options, onChange}) => {
    return (
        <div role='group' aria-labelledby='label-notifications'>
            <div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5'>
                <div>
                    <div
                        className='text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700'
                        id='label-notifications'
                    >
                        {label}
                    </div>
                </div>
                <div className='sm:col-span-2'>
                    <div className='max-w-lg'>
                        <div className=' space-y-4'>
                            {options.map((option) => {
                                return (
                                    <div
                                        key={option.name}
                                        className='flex items-center'
                                    >
                                        <input
                                            id={option.name}
                                            name={name}
                                            type='radio'
                                            checked={value ? value === option.name : null}
                                            onChange={onChange}
                                            className='h-4 w-4 border-gray-300 text-primary-800 focus:ring-primary-600'
                                        />
                                        <label
                                            htmlFor={option.name}
                                            className='ml-3 block text-sm font-medium text-gray-700'
                                        >
                                            {option.label}
                                        </label>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RadioInput;
