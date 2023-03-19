import React, {Fragment, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {TrashIcon, XMarkIcon} from '@heroicons/react/24/outline'
import ComboBox from "../../../components/ComboBox";
import {useSelector} from "react-redux";
import {selectCurrentUserDepartmentId} from "../../auth/authSlice";
import {useGetCoursesByDepartmentQuery} from "../../courses/coursesApiSlice";
import {useGetInstructorsByDepartmentQuery} from "../../instructors/instructorsApiSlice";
import {useDeleteSectionMutation, useUpdateSectionMutation} from "../sectionsApiSlice";
import ConfirmDeletionModal from "../../../components/ConfirmDeletionModal";
import FeedbackAlert from "../../../components/FeedbackAlert";

export default function EditSectionSlideover({section, open, setOpen}) {
    const [openConfirmDeletionModal, setOpenConfirmDeletionModal] = useState(false);
    const [showErorElement, setShowErrorElement] = useState(false);


    const [course, setCourse] = useState({id: section.course_id, name: section.course_title});
    const [instructor, setInstructor] = useState({id: section.instructor_id, name: section.instructor_name});
    const [title, setTitle] = useState(section.title);
    const [semester, setSemester] = useState(section.semester);


    const [updateSection] = useUpdateSectionMutation();
    const [deleteSection] = useDeleteSectionMutation();

    const handleTitleInput = (e) => setTitle(e.target.value);
    const handleSemesterInput = (e) => setSemester(e.target.value);


    const departmentId = useSelector(selectCurrentUserDepartmentId);
    const {data: courseData, isSuccess: isSuccessCourse} = useGetCoursesByDepartmentQuery(departmentId);
    const {data: instructorData, isSuccess: isSuccessInstructor} = useGetInstructorsByDepartmentQuery(departmentId);
    let courses, instructors;

    if (isSuccessCourse) {
        let {ids, entities} = courseData;
        courses = ids.map(id => entities[id]);
    }
    if (isSuccessInstructor) {
        let {ids, entities} = instructorData;
        instructors = ids.map(id => entities[id]);
    }

    const isFilled = Boolean(title) && Boolean(semester) && Boolean(course);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedSection = {
            id: section.id,
            title,
            semester,
            courseId: course.id,
            instructorId: instructor.id,
            departmentId,
        }
        console.log(updatedSection);

        try {
            if (isFilled) {
                await updateSection(updatedSection).unwrap();
                setShowErrorElement(false);
                setOpen(false);
            }else {
                setShowErrorElement(true);
            }
        } catch (e) {
            console.log(e)
        }
    }

    const handleDelete = async () => {
        try {
            await deleteSection(section.id).unwrap();
            setOpenConfirmDeletionModal(false);
            setOpen(false)
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >

                                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                    <form onSubmit={handleSubmit}
                                          className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
                                        <div className="h-0 flex-1 overflow-y-auto">
                                            <div className="bg-gray-50 py-6 px-4 sm:px-6">
                                                <div className="flex items-center justify-between">
                                                    <Dialog.Title
                                                        className="text-base font-semibold leading-6 text-gray-900">
                                                        Edit Section
                                                    </Dialog.Title>
                                                    <div className="ml-3 flex h-7 items-center">
                                                        <button
                                                            type="button"
                                                            className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                                                            onClick={() => setOpen(false)}
                                                        >
                                                            <span className="sr-only">Close panel</span>
                                                            <XMarkIcon className="h-6 w-6" aria-hidden="true"/>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="mt-1">
                                                    <p className="text-sm text-gray-500">
                                                        Get started by filling in the information below to create a new
                                                        section.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex flex-1 flex-col justify-between">
                                                <div className="divide-y divide-gray-200 px-4 sm:px-6">
                                                    <div className="space-y-6 pt-6 pb-5">
                                                        {showErorElement ? (<div className='mt-2'>
                                                            <FeedbackAlert type='error'
                                                                           content={"Please fill all the required fields"}/>
                                                        </div>) : ''}
                                                        <div>
                                                            <label
                                                                htmlFor="section-title"
                                                                className="block text-sm font-medium leading-6 text-gray-900"
                                                            >
                                                                Section title {' '}
                                                                <span className='text-gray-600 font-light'>*</span>
                                                            </label>
                                                            <div className="mt-2">
                                                                <input
                                                                    type="text"
                                                                    name="section-title"
                                                                    id="section-title"
                                                                    required={true}
                                                                    value={title}
                                                                    onChange={handleTitleInput}
                                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <label
                                                                htmlFor="semester"
                                                                className="block text-sm font-medium leading-6 text-gray-900"
                                                            >
                                                                Semester {' '}
                                                                <span className='text-gray-600 font-light'>*</span>
                                                            </label>
                                                            <div className="mt-2">
                                                                <input
                                                                    type="number"
                                                                    name="semester"
                                                                    id="semester"
                                                                    required={true}
                                                                    value={semester}
                                                                    onChange={handleSemesterInput}
                                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <label
                                                                className="block text-sm font-medium leading-6 text-gray-900"
                                                            >
                                                                Course {' '}
                                                                <span className='text-gray-600 font-light'>*</span>
                                                            </label>
                                                            <div className="mt-2">
                                                                <ComboBox data={courses} selectedData={course}
                                                                          setSelectedData={setCourse}/>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <label
                                                                className="block text-sm font-medium leading-6 text-gray-900"
                                                            >
                                                                Instructor
                                                            </label>
                                                            <div className="mt-2">
                                                                <ComboBox data={instructors} selectedData={instructor}
                                                                          setSelectedData={setInstructor}/>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-shrink-0 justify-end px-4 py-4">
                                            <button
                                                type="button"
                                                onClick={() => setOpenConfirmDeletionModal(true)}
                                                className="inline-flex justify-center gap-x-1.5 rounded-md bg-red-100 px-3 py-2 text-sm font-semibold text-red-700 shadow-sm hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                            >
                                                <TrashIcon className="-ml-0.5 h-5 w-5 text-red-700" aria-hidden="true"/>

                                            </button>
                                            <button
                                                type="button"
                                                className="ml-4 rounded-md bg-white py-2 px-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                                onClick={() => setOpen(false)}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="ml-4 inline-flex justify-center rounded-md bg-primary-900 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                                            >
                                                Save
                                            </button>
                                        </div>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                    <ConfirmDeletionModal open={openConfirmDeletionModal}
                                          setOpen={setOpenConfirmDeletionModal}
                                          title={section.title}
                                          onDelete={handleDelete}
                    />
                </div>
            </Dialog>
        </Transition.Root>
    )
}
