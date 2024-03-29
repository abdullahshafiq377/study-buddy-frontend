export default function DeleteActionPanel({onClick}) {
    return (
        <div className='bg-white shadow sm:rounded-lg'>
            <div className='px-4 py-5 sm:p-6'>
                <h3 className='text-lg font-medium leading-6 text-gray-900'>
                    Delete Sub Admin
                </h3>
                <div className='mt-2 max-w-xl text-sm text-gray-500'>
                    <p>
                        Once you delete the entity, you will lose all data
                        associated with it.
                    </p>
                </div>
                <div className='mt-5'>
                    <button
                        type='button'
                        onClick={onClick}
                        className='inline-flex items-center justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 font-medium text-red-700 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:text-sm'
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
