import React, {useState} from 'react';
import SectionsTable from "../../features/sections/components/SectionsTable";
import CreateSectionSlideover from "../../features/sections/components/CreateSectionSlideover";

const SectionsPage = () => {
    const [openCreateSectionSlideover, setOpenCreateSectionSlideover] = useState(false);

    return (
        <>
            <div className='px-4 sm:px-6 lg:px-8'>
                <div className='sm:flex sm:items-center'>
                    <div className='sm:flex-auto'>
                        <h1 className='text-2xl font-bold text-gray-900'>
                            Sections
                        </h1>
                        <p className='mt-2 text-sm text-gray-700'>
                            A list of all the sections in the system.
                        </p>
                    </div>
                    <div className='mt-4 sm:mt-0 sm:ml-16 sm:flex-none'>
                        <button
                            onClick={() => setOpenCreateSectionSlideover(true)}
                            className='inline-flex items-center justify-center rounded-md border border-transparent bg-primary-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 sm:w-auto'
                        >
                            Create Section
                        </button>
                    </div>
                </div>
                <div>
                    <SectionsTable/>
                </div>
            </div>

            <CreateSectionSlideover open={openCreateSectionSlideover} setOpen={setOpenCreateSectionSlideover}/>

        </>
    );
};

export default SectionsPage;
