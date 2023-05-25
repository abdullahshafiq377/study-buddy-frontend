import React from 'react';
import { useParams } from 'react-router-dom';
import SectionDetails from '../../features/sections/components/SectionDetails';
import { useGetAssignedStudentsQuery, useGetSectionByIdQuery } from '../../features/sections/sectionsApiSlice';

const SectionPage = () => {
	const {sectionId} = useParams();
	console.log(sectionId);
	
	const {isSuccess: assignedStudentsIsSuccess, data: assignedStudentsData} = useGetAssignedStudentsQuery(sectionId);
	
	const {isSuccess, data} = useGetSectionByIdQuery(sectionId);
	console.log(data);
	let section = {
		title: '',
		course_title: '',
		semester: '',
		instructor_name: '',
		strength: '',
	};
	
	if (isSuccess) {
		section = {...data.entities[sectionId]};
		section.strength = assignedStudentsIsSuccess?.length;
	}
	
	
	return (
		<SectionDetails section={section}/>
	);
};

export default SectionPage;
