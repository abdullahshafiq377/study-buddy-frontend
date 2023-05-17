import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { selectDepartmentById, useDeleteDepartmentMutation, } from '../departmentsApiSlice';

const TableRow = ({departmentId}) => {
	const [deleteDepartment] = useDeleteDepartmentMutation();
	
	const department = useSelector((state) =>
		                               selectDepartmentById(state, departmentId),
	);
	return (
		<tr key={department.id}>
			<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
				{department.title}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{department.description.length > 100
				 ? `${department.description.slice(0, 100)}...`
				 : department.description}
			</td>
			
			<td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
				<Link
					to={`edit/${department.id}`}
					className="text-blue-600 hover:text-primary-900"
				>
					<PencilSquareIcon className="w-7"/>
				</Link>
			</td>
		</tr>
	);
};

export default TableRow;
