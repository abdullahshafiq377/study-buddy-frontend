import { useState } from 'react';
import { useAddNewNoticeMutation } from '../noticesApiSlice';
import { useNavigate, Link } from 'react-router-dom';
import TextInputLong from './../../../components/TextInputLong';
import TextArea from './../../../components/TextArea';

export default function AddNoticeForm() {
	const [addNewNotice, { isLoading }] = useAddNewNoticeMutation();

	const navigate = useNavigate();

	const [title, setTitle] = useState('');
	const [link, setLink] = useState('');

	const handleTitleInput = (e) => setTitle(e.target.value);
	const handleLinkInput = (e) => setLink(e.target.value);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const newNotice = {
			title,
			link,
		};
		console.log(newNotice);

		try {
			await addNewNotice(newNotice).unwrap();
			setTitle('');
			setLink('');
			navigate('/admin/notices');
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<form
			className='space-y-8 divide-y divide-gray-200'
			onSubmit={handleSubmit}
		>
			<div className='space-y-8 divide-y divide-gray-200 sm:space-y-5'>
				<div className='space-y-6 sm:space-y-5'>
					<div>
						<h3 className='text-xl font-semibold leading-6 text-gray-900'>
							Add Notice
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
							onChange={handleTitleInput}
							required={true}
						/>

						<TextArea
							name='link'
							label='Link'
							rows={10}
							onChange={handleLinkInput}
							required={true}
						/>
					</div>
				</div>
			</div>

			<div className='pt-5'>
				<div className='flex justify-end'>
					<Link
						type='button'
						to='/admin/notices'
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
	);
}
