// Props:
// name, lable, onChange, data

import React from 'react';

const DropdownMenu = ({name, label, data, value, required, onChange}) => {
    let options = <option value=''></option>;
    if (data) {
        options = data.map((d) => (
            <option key={d.id} value={d.id}>
                {d.title}
            </option>
        ));
    }

    return (
        <div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5'>
            <label
                htmlFor={name}
                className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
            >
                {label}
            </label>
            <div className='mt-1 sm:col-span-2 sm:mt-0'>
                <select
                    id={name}
                    name={name}
                    onChange={onChange}
                    required={required}
                    value={value}
                    className='block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-primary-600 focus:ring-primary-600 sm:max-w-xs sm:text-sm'
                >
                    <option key='null' value={null}></option>
                    {options}
                </select>
            </div>
        </div>
    );
};

export default DropdownMenu;
