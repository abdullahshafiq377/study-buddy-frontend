import React from 'react';
import FeedbackAlert from "../../../components/FeedbackAlert";
import AssignedStudentsTableRow from "./AssignedStudentsTableRow";

const AssignedStudentsTable = ({section, assignedStudents, refetchAssigned, refetchUnassigned}) => {

    return (
        <div className='mt-4 flex flex-col'>
            <div className='-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
                    <div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg'>
                        {assignedStudents.length > 0 ?
                            (<>
                                    <table className='min-w-full divide-y divide-gray-300'>
                                        <thead className='bg-gray-50'>
                                        <tr>
                                            <th
                                                scope='col'
                                                className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6'
                                            >
                                                Name
                                            </th>
                                            <th
                                                scope='col'
                                                className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                                            >
                                                Registration Number
                                            </th>
                                            <th
                                                scope='col'
                                                className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                                            >
                                                Email
                                            </th>
                                            <th
                                                scope='col'
                                                className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                                            >
                                                Remove
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody className='bg-white'>
                                        {assignedStudents.map(student => <AssignedStudentsTableRow student={student} refetchAssigned={refetchAssigned} refetchUnassigned={refetchUnassigned}/>)}
                                        </tbody>
                                    </table>
                                </>
                            )
                            :
                            (<p className='py-4 pl-4 pr-3 text-sm font-medium text-red-600'>No Students Found</p>)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssignedStudentsTable;
