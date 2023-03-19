import React, {useState} from 'react';
import {ChevronRightIcon, PencilSquareIcon} from "@heroicons/react/24/outline";
import EditSectionSlideover from "./EditSectionSlideover";

const SectionsTableRow = ({section}) => {
    const [opedEditSectionSlideover, setOpedEditSectionSlideover] = useState(false);

    return (
        <tr key={section.id}>
            <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                {section.title}
            </td>
            <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                {section.course_title}
            </td><
            td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                {section.semester}
            </td>
            <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                {section.instructor_id ? section.instructor_name : 'N/A'}
            </td>
            <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                <button
                    type='button'
                    onClick={() => setOpedEditSectionSlideover(true)}
                    className='text-blue-600 hover:text-primary-900'

                >
                    <PencilSquareIcon className='w-7'/>
                </button>
            </td><td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                <button
                    type='button'
                    className='text-blue-600 hover:text-primary-900'

                >
                    <ChevronRightIcon className='w-7'/>
                </button>
            </td>
            <EditSectionSlideover open={opedEditSectionSlideover} setOpen={setOpedEditSectionSlideover} section={section}/>

        </tr>
    );
};

export default SectionsTableRow;
