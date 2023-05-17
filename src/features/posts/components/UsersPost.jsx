import React, { useState } from 'react';
import Badge from '../../../components/Badge';
import Comment from './Comment';
import { PencilIcon } from '@heroicons/react/20/solid';
import { TrashIcon } from '@heroicons/react/24/outline';
import {
    useAddNewCommentMutation,
    useDeleteCommentByPostMutation,
    useDeletePostMutation,
    useGetCommentsByPostQuery
} from '../postsApiSlice';
import TimeAgo from './TimeAgo';
import ConfirmDeletionModal from '../../../components/ConfirmDeletionModal';
import EditPostSlideover from './EditPostSlideover';
import { useSelector } from 'react-redux';
import { selectCurrentUserId } from '../../auth/authSlice';
import { format } from 'date-fns';

const UsersPost = ({post, onEdit, onDelete}) => {
    const [openEditPostSildeover, setOpenEditPostSildeover] = useState(false);
    const [openConfirmDeletionModal, setOpenConfirmDeletionModal] = useState(false);
    const [deletePost] = useDeletePostMutation();
    const [deleteCommentByPost] = useDeleteCommentByPostMutation();

    const userId = useSelector(selectCurrentUserId);
    const [addNewComment] = useAddNewCommentMutation();
    const {isSuccess, data, refetch} = useGetCommentsByPostQuery(post.id);
    const isSameUser = userId === post.author_id;

    const [commentInput, setCommentInput] = useState('');
    const handleCommentInput = (e) => setCommentInput(e.target.value);


    let tags;
    let comments = [];

    if (isSuccess) {
        comments = data;
    }

    if (post.tags) {
        tags = post.tags.split(',');
        tags = tags.filter(e => e);
    }

    const handleDelete = async () => {
        try {
            await deletePost(post.id);
            await deleteCommentByPost(post.id);

        } catch (e) {
            console.log(e);
        }
    }

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        let postId = post.id;
        const newComment = {
            postId, authorId: userId, text: commentInput, dateTime: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        }
        console.log(newComment);

        try {
            await addNewComment(newComment).unwrap();
            setCommentInput('');
            refetch();

        } catch (e) {
            console.log(e);
        }
    }

    return (
        <li key={post.id} className="bg-white px-4 py-6 shadow sm:rounded-lg sm:px-6">
            <div className="sm:flex sm:items-baseline sm:justify-between">
                <h1 className="text-xl font-bold text-gray-900">
                    {post.title}
                </h1>
                <div className="mt-4 flex space-x-3 md:mt-0">
                    <button
                        type="button"
                        onClick={() => setOpenEditPostSildeover(true)}
                        className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                        <PencilIcon className="-ml-0.5 h-5 w-5 text-gray-400" aria-hidden="true"/>
                        Edit
                    </button>
                    <button
                        type="button"
                        onClick={() => setOpenConfirmDeletionModal(true)}
                        className="inline-flex justify-center gap-x-1.5 rounded-md bg-red-100 px-3 py-2 text-sm font-semibold text-red-700 shadow-sm hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                        <TrashIcon className="-ml-0.5 h-5 w-5 text-red-700" aria-hidden="true"/>

                    </button>
                </div>
            </div>
            <div>
                <p className="text-xs font-normal mt-1 border-b-2 border-b-gray-100 pb-4">
                    <TimeAgo timestamp={post.date_time}/>
                </p>
            </div>
            <div className='mt-4'>
                {post.is_question ? <Badge isQuestion={true}/> : ''}
                {tags ? tags.map(tag => <Badge text={tag}/>) : ''}
            </div>
            <div
                className="mt-4 space-y-6 text-sm text-gray-800 border-b-2 border-b-gray-100 pb-4"
                dangerouslySetInnerHTML={{__html: post.description}}
            />
            <div className="sm:flex sm:items-baseline mt-4">
                <p className="mt-1 whitespace-nowrap text-sm text-gray-600 sm:mt-0">
                    likes: {post.likes}
                </p>
                <p className="mt-1 whitespace-nowrap text-sm text-gray-600 sm:mt-0 sm:ml-3">
                    dislikes: {post.dislikes}
                </p>
            </div>
            <div className='mt-4'>
                <h4 className="text-sm font-medium text-gray-900 mb-1">
                    Comments:
                </h4>

                <div className='my-3'>
                    <ul role="list" className="space-y-8">
                        {comments.map(comment => <Comment key={comment.id} comment={comment} refetch={refetch}/>)}
                    </ul>
                </div>


                <form onSubmit={handleCommentSubmit}>
                    <div>
                        <label htmlFor="comment" className="sr-only">
                            Comment
                        </label>
                        <textarea
                            id="comment"
                            name="comment"
                            rows={2}
                            value={commentInput}
                            onChange={handleCommentInput}
                            className="block w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:py-1.5 sm:text-sm sm:leading-6"
                            placeholder="Add a comment"
                        />
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                        <div></div>
                        <button
                            type="submit"
                            className="inline-flex items-center justify-center rounded-md bg-primary-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                        >
                            Comment
                        </button>
                    </div>
                </form>
            </div>
            <EditPostSlideover open={openEditPostSildeover} setOpen={setOpenEditPostSildeover} post={post}/>

            <ConfirmDeletionModal open={openConfirmDeletionModal}
                                  setOpen={setOpenConfirmDeletionModal}
                                  title={post.title}
                                  onDelete={handleDelete}
            />
        </li>
    );
};

export default UsersPost;
