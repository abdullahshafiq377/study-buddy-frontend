import {Fragment, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {XMarkIcon} from '@heroicons/react/24/outline'
import {useAddNewPostMutation} from "../postsApiSlice";
import {useSelector} from "react-redux";
import {selectCurrentUserId, selectCurrentUserType} from "../../auth/authSlice";
import {format} from "date-fns";

export default function NewPostSlideover({open, setOpen}) {
    const userId = useSelector(selectCurrentUserId);
    const userType = useSelector(selectCurrentUserType);
    const [addNewPost, {isLoading}] = useAddNewPostMutation();

    const [title, setTitle] = useState('');
    const [isQuestion, setIsQuestion] = useState(false);
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');

    const handleTitleInput = (e) => setTitle(e.target.value);
    const handleIsQuestionInput = (e) => setIsQuestion(e.target.checked);
    const handleDescriptionInput = (e) => setDescription(e.target.value);
    const handleTagsInput = (e) => setTags(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newPost = {
            title,
            description,
            isQuestion,
            tags,
            dateTime: format(new Date(),'yyyy-MM-dd HH:mm:ss'),
            authorId: userId,
            authorType: userType
        }
        console.log(newPost)

        try {
            await addNewPost(newPost).unwrap();

            setTitle('');
            setDescription('');
            setIsQuestion(false);
            setTags('');
            setOpen(false);
        }
        catch (e) {
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
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-2xl">
                                    <form onSubmit={handleSubmit} className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                        <div className="flex-1">
                                            {/* Header */}
                                            <div className="bg-gray-50 px-4 py-6 sm:px-6">
                                                <div className="flex items-start justify-between space-x-3">
                                                    <div className="space-y-1">
                                                        <Dialog.Title
                                                            className="text-base font-semibold leading-6 text-gray-900">
                                                            New post
                                                        </Dialog.Title>
                                                        <p className="text-sm text-gray-500">
                                                            Create a new post by filling in the information below.
                                                        </p>
                                                    </div>
                                                    <div className="flex h-7 items-center">
                                                        <button
                                                            type="button"
                                                            className="text-gray-400 hover:text-gray-500"
                                                            onClick={() => setOpen(false)}
                                                        >
                                                            <span className="sr-only">Close panel</span>
                                                            <XMarkIcon className="h-6 w-6" aria-hidden="true"/>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Divider container */}
                                            <div
                                                className="space-y-6 py-6 sm:space-y-0 sm:divide-y sm:divide-gray-200 sm:py-0">
                                                {/* Project name */}
                                                <div
                                                    className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                                    <div>
                                                        <label
                                                            htmlFor="project-name"
                                                            className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                                                        >
                                                            Title
                                                        </label>
                                                    </div>
                                                    <div className="sm:col-span-2">
                                                        <input
                                                            type="text"
                                                            name="title"
                                                            id="title"
                                                            value={title}
                                                            onChange={handleTitleInput}
                                                            required={true}
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>

                                                {/* Project description */}
                                                <div
                                                    className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                                    <div>
                                                        <label
                                                            htmlFor="project-description"
                                                            className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                                                        >
                                                            Description
                                                        </label>
                                                    </div>
                                                    <div className="sm:col-span-2">
                            <textarea
                                id="project-description"
                                name="project-description"
                                rows={3}
                                value={description}
                                onChange={handleDescriptionInput}
                                className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:py-1.5 sm:text-sm sm:leading-6"
                                defaultValue={''}
                            />
                                                    </div>
                                                </div>

                                                {/* Privacy */}
                                                <fieldset
                                                    className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                                    <legend className="sr-only">Is Question</legend>
                                                    <div className="text-sm font-medium leading-6 text-gray-900"
                                                         aria-hidden="true">
                                                        Is Question
                                                    </div>
                                                    <div className="space-y-5 sm:col-span-2">
                                                        <div className="space-y-5 sm:mt-0">
                                                            <div className="relative flex items-start">
                                                                <div className="absolute flex h-6 items-center">
                                                                    <input
                                                                        id="isQuestion"
                                                                        aria-describedby="IsQuestion"
                                                                        name="IsQuestion"
                                                                        type="checkbox"
                                                                        checked={isQuestion}
                                                                        onChange={handleIsQuestionInput}
                                                                        className="h-4 w-4 rounded border-gray-300 text-primary-900 focus:ring-primary-600"
                                                                    />
                                                                </div>
                                                                <div className="pl-7 text-sm leading-6">
                                                                    <label htmlFor="isQuestion"
                                                                           className="font-medium text-gray-900">
                                                                        Mark as Question
                                                                    </label>
                                                                    <p id="isQuestion"
                                                                       className="text-gray-500">
                                                                        This post will be marked as a question
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </fieldset>

                                                <div
                                                    className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                                    <div>
                                                        <label
                                                            htmlFor="project-description"
                                                            className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                                                        >
                                                            Tags
                                                        </label>
                                                    </div>
                                                    <div className="sm:col-span-2">
                            <textarea
                                id="project-description"
                                name="project-description"
                                placeholder='Enter relevant tags separated by a ","'
                                rows={3}
                                value={tags}
                                onChange={handleTagsInput}
                                className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:py-1.5 sm:text-sm sm:leading-6"
                            />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action buttons */}
                                        <div className="flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6">
                                            <div className="flex justify-end space-x-3">
                                                <button
                                                    type="button"
                                                    className="rounded-md bg-white py-2 px-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                                    onClick={() => setOpen(false)}
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    onClick={handleSubmit}
                                                    className="inline-flex justify-center rounded-md bg-primary-900 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                                                >
                                                    Create
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
