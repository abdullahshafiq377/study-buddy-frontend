import React, { useState } from 'react';
import NewPostSlideover from '../../features/posts/components/NewPostSlideover';
import UsersPost from '../../features/posts/components/UsersPost';
import { useGetPostsByUserQuery } from '../../features/posts/postsApiSlice';
import { useSelector } from 'react-redux';
import { selectCurrentUserId } from '../../features/auth/authSlice';
import FeedbackAlert from '../../components/FeedbackAlert';
import Loader from '../../components/Loader';

const UsersPostsPage = () => {
	const userId = useSelector(selectCurrentUserId);
	const [openNewPostSildeover, setOpenNewPostSildeover] = useState(false);
	
	const {isLoading, isSuccess, isError, error, data: postsForUser} = useGetPostsByUserQuery(userId);
	
	
	let content;
	
	if (isLoading) {
		content = <Loader/>;
	}
	else if (isSuccess) {
		console.log(postsForUser);
		const {ids, entities} = postsForUser;
		content = (
			ids.map(id => {
				return <UsersPost key={id}
				                  post={entities[id]}/>;
			})
		);
	}
	else if (isError) {
		content = (
			<div className="mt-6">
				<FeedbackAlert type="error" content={error}/>
			</div>
		);
	}
	
	return (
		<>
			<div className="px-4 sm:px-6 lg:px-8">
				<div className="sm:flex sm:items-center">
					<div className="sm:flex-auto">
						<h1 className="text-2xl font-bold text-gray-900">
							My Posts
						</h1>
						<p className="mt-2 text-sm text-gray-700">
							Community Forums Page {/*TODO: change placeholder text*/}
						</p>
					</div>
					
					<div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
						<button
							onClick={() => setOpenNewPostSildeover(true)}
							className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 sm:w-auto"
						>
							New Post
						</button>
					</div>
				
				</div>
				<ul role="list" className="space-y-2 py-4 sm:space-y-4 sm:px-6 lg:px-8">
					{content}
				</ul>
			</div>
			<NewPostSlideover open={openNewPostSildeover} setOpen={setOpenNewPostSildeover}/>
		</>
	);
};

export default UsersPostsPage;
