import {useState} from 'react';
import {selectEventById, useDeleteEventMutation, useUpdateEventMutation,} from '../eventsApiSlice';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import TextInputLong from './../../../components/TextInputLong';
import TextArea from './../../../components/TextArea';
import ConfirmDeletionModal from './../../../components/ConfirmDeletionModal';

export default function EditEventForm() {
    const {eventId} = useParams();
    const navigate = useNavigate();

    const [updateEvent, {isLoading}] = useUpdateEventMutation();
    const [deleteEvent] = useDeleteEventMutation();

    const event = useSelector((state) => selectEventById(state, eventId));

    const [title, setTitle] = useState(event?.title);
    const [venue, setVenue] = useState(event?.venue);
    const [description, setDescription] = useState(event?.description);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    if (!event) {
        return <h2>Event Not Found</h2>;
    }

    const handleTitleInput = (e) => setTitle(e.target.value);
    const handleVenueInput = (e) => setVenue(e.target.value);
    const handleDescriptionInput = (e) => setDescription(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedEvent = {
            id: eventId,
            title,
            venue,
            date_time: null,
            description,
        };
        console.log(updatedEvent);
        try {
            await updateEvent(updatedEvent).unwrap();
            setTitle('');
            setVenue('');
            setDescription('');
            navigate('/admin/events');
        } catch (err) {
            console.log(err);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteEvent({id: eventId});
            setTitle('');
            setVenue('');
            setDescription('');
            setOpenDeleteModal(false);
            navigate('/admin/events');
        } catch (err) {
            console.log(err);
        }
    };

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
                                Edit Event
                            </h3>
                            <p className='mt-1 max-w-2xl text-sm text-gray-500'>
                                Please fill all the required fields.
                            </p>
                        </div>
                        <div className='space-y-6 sm:space-y-5'>
                            <TextInputLong
                                name='title'
                                label='Title'
                                type='text'
                                value={title}
                                onChange={handleTitleInput}
                                required={true}
                            />
                            <TextInputLong
                                name='venue'
                                label='Venue'
                                type='text'
                                value={venue}
                                onChange={handleVenueInput}
                                required={true}
                            />

                            <TextArea
                                name='description'
                                label='Description'
                                rows={10}
                                value={description}
                                onChange={handleDescriptionInput}
                                required={true}
                            />
                        </div>
                    </div>
                </div>

                <div className='pt-5'>
                    <div className='flex justify-end'>
                        <Link
                            type='button'
                            to='/admin/events'
                            className='rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2'
                        >
                            Cancel
                        </Link>
                        <button
                            type='button'
                            onClick={() => setOpenDeleteModal(true)}
                            className='ml-3 inline-flex items-center justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 font-medium text-red-700 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:text-sm'
                        >
                            Delete
                        </button>
                        <button
                            type='submit'
                            className='ml-3 inline-flex justify-center rounded-md border border-transparent bg-primary-900 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2'
                        >
                            Save
                        </button>
                    </div>
                </div>
            </form>
            <ConfirmDeletionModal
                open={openDeleteModal}
                setOpen={setOpenDeleteModal}
                onDelete={handleDelete}
                title={title}
            />
        </>
    );
}
