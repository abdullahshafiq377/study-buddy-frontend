import React from 'react';
import { useAssignSectionMutation } from '../sectionsApiSlice';

const UnassignedStudentsTableRow = ({sectionId, student, refetchAssigned, refetchUnassigned}) => {
    const [assignSection] = useAssignSectionMutation();
    const handleAssign = async () => {
        try {
            await assignSection({
                sectionId,
                registrationId: student.registration_id,
            });
            refetchAssigned();
            refetchUnassigned();
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <tr key={student.id}>
            <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6'>
                {student.name}
            </td>
            <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                {student.session}-{student.program_title}-{student.reg_num}
            </td>
            <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                {student.email}
            </td>
            <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                <button
                    type='button'
                    className='inline-flex items-center justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 font-medium text-green-700 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:text-sm'
                    onClick={handleAssign}
                >
                    Assign
                </button>
            </td>
        </tr>
    );
};

export default UnassignedStudentsTableRow;
