import React from 'react';
import UserProfileCard from '../../features/reset-password/components/UserProfileCard';

const ResetPasswordPage = () => {
    return (
        <div>
            <form>
                <div className='sm:flex sm:items-center'>
                    <div className='sm:flex-auto'>
                        <div
                            className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5'>

                            <label
                                htmlFor='search'
                                className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
                            >
                                Email
                            </label>
                            <div className='mt-1 sm:col-span-2 sm:mt-0'>
                                <input
                                    type='text'
                                    name='search'
                                    id='search'
                                    className='block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-primary-600 focus:ring-primary-600 sm:text-sm'
                                />
                            </div>
                        </div>
                    </div>

                    <div className='mt-4 sm:mt-0 sm:ml-16 sm:flex-none'>
                        <button
                            type='submit'
                            className='ml-3 inline-flex justify-center rounded-md border border-transparent bg-primary-900 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2'
                        >
                            Search
                        </button>
                    </div>
                </div>
            </form>
            <UserProfileCard/>
        </div>
    );
};

export default ResetPasswordPage;
