import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import TextInput from "../../components/TextInput";

const AdminSettingsPage = () => {
    const navigate = useNavigate();
    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');

    const handleOldPassInput = (e) => setOldPass(e.target.value);
    const handleNewPassInput = (e) => setNewPass(e.target.value);


    const handleSubmit = (e) => {
        e.preventDefault();
        //TODO: Implement handleSubmit
        navigate('/admin/dashboard');
    }
    return (
        <>
            <form
                className='space-y-8 divide-y divide-gray-200'
                onSubmit={handleSubmit}
            >
                <div className='space-y-8 divide-y divide-gray-200 sm:space-y-5'>
                    <div className='space-y-6 sm:space-y-5'>
                        <div>
                            <h3 className='text-xl font-semibold leading-6 text-gray-900'>
                                Settings
                            </h3>
                            <p className='mt-1 max-w-2xl text-sm text-gray-500'>
                                Please fill all the required fields.
                            </p>
                        </div>
                        <div className='space-y-6 sm:space-y-5'>
                            <TextInput
                                name='oldPassword'
                                label='Old Password'
                                type='password'
                                value={oldPass}
                                onChange={handleOldPassInput}
                                required={true}
                            />
                            <TextInput
                                name='newPassword'
                                label='New Password'
                                type='password'
                                value={newPass}
                                onChange={handleNewPassInput}
                                required={true}
                            />
                        </div>
                    </div>
                </div>

                <div className='pt-5'>
                    <div className='flex justify-end'>
                        <Link
                            type='button'
                            to='/admin/dashboard'
                            className='rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2'
                        >
                            Cancel
                        </Link>
                        <button
                            type='submit'
                            className='ml-3 inline-flex justify-center rounded-md border border-transparent bg-primary-900 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2'
                        >
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default AdminSettingsPage;

