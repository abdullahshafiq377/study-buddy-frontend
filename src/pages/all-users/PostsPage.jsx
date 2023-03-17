import React, {useState} from 'react';
import Post from "../../features/posts/components/Post";
import {Link} from "react-router-dom";
import NewPostSlideover from "../../features/posts/components/NewPostSlideover";
import {selectPostIds, useGetPostsQuery} from "../../features/posts/postsApiSlice";
import {useSelector} from "react-redux";
import FeedbackAlert from "../../components/FeedbackAlert";

const PostsPage = () => {
    const [openNewPostSildeover, setOpenNewPostSildeover] = useState(false);

    const {isLoading, isSuccess, isError, error} = useGetPostsQuery();

    const postIds = useSelector(selectPostIds);

    let content;

    if (isLoading) {
        content = <p>Loading...</p>;
    } else if (isSuccess) {
        content = (
            postIds.map(id => {
                return  <Post postId={id}/>
            })
    );
    }
    else if (isError) {
        content = (
            <div className='mt-6'>
                <FeedbackAlert type='error' content={error}/>
            </div>
        );
    }
    return (
        <>
            <div className='px-4 sm:px-6 lg:px-8'>
                <div className='sm:flex sm:items-center'>
                    <div className='sm:flex-auto'>
                        <h1 className='text-2xl font-bold text-gray-900'>
                            Posts
                        </h1>
                        <p className='mt-2 text-sm text-gray-700'>
                            Community Forums Page {/*TODO: change placeholder text*/}
                        </p>
                    </div>

                    <div className='mt-4 sm:mt-0 sm:ml-16 sm:flex-none'>
                        <button
                            onClick={() => setOpenNewPostSildeover(true)}
                            className='inline-flex items-center justify-center rounded-md border border-transparent bg-primary-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 sm:w-auto'
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

export default PostsPage;
