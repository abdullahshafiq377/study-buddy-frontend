import React, {useState} from 'react';
import Badge from "../../../components/Badge";
import Comment from "./Comment";
import {useSelector} from "react-redux";
import {
    selectPostById,
    useAddNewCommentMutation,
    useAddReactionMutation,
    useGetCommentsByPostQuery
} from "../postsApiSlice";
import TimeAgo from "./TimeAgo";
import {selectCurrentUserId} from "../../auth/authSlice";
import {format} from "date-fns";
import {HandThumbDownIcon, HandThumbUpIcon} from "@heroicons/react/24/solid";

const Post = ({postId}) => {
    const userId = useSelector(selectCurrentUserId);
    const post = useSelector(state => selectPostById(state, postId));
    const [addNewComment] = useAddNewCommentMutation();
    const {isSuccess, data, refetch} = useGetCommentsByPostQuery(postId);
    const [addReaction] = useAddReactionMutation();

    const isSameUser = userId === post.author_id

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

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
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

    const handleReaction = async (type) => {
        let {likes, dislikes} = post
        if (type === 'like') likes++;
        if (type === 'dislike') dislikes++;
        try {
            const newReactions = {
                postId,
                reactions: {
                    likes,
                    dislikes
                }
            }
            await addReaction(newReactions);

        } catch (e) {
            console.log(e);
        }
    }

    const reactionButtons = (<div className="sm:flex sm:items-baseline mt-4">
        <button key='likeBtn' onClick={() => handleReaction('like')} className="mt-1">
            <HandThumbUpIcon className='mr-3 h-6 w-6 flex-shrink-0 text-green-500'
                             aria-hidden='true'/>
        </button>
        <button id='dislikeBtn' onClick={() => handleReaction('dislike')} className="mt-1">
            <HandThumbDownIcon className='mr-3 h-6 w-6 flex-shrink-0 text-red-500'
                               aria-hidden='true'/>
        </button>
    </div>);

    return (<li key={postId} className="bg-white px-4 py-6 shadow sm:rounded-lg sm:px-6">
        <div className="sm:flex sm:items-baseline sm:justify-between">
            <h1 className="text-xl font-bold text-gray-900">
                {post.title}
            </h1>
            <p className="mt-1 whitespace-nowrap text-sm text-gray-600 sm:mt-0 sm:ml-3">
                <TimeAgo timestamp={post.date_time}/>
            </p>
        </div>
        <div>
            <p className="text-xs font-normal mt-1 border-b-2 border-b-gray-100 pb-4">
                <span className="text-gray-400">by</span>{' '}
                <span className="text-primary-900">
                    {isSameUser ? 'You' : post.author_name}
                </span>
            </p>
        </div>
        <div className='mt-4'>
            {post.is_question ? <Badge isQuestion={true}/> : ''}
            {tags ? tags.map(tag => <Badge text={tag}/>) : ''}
        </div>
        <div
            className="mt-4 space-y-6 text-sm text-gray-800  border-b-2 border-b-gray-100 pb-4"
            dangerouslySetInnerHTML={{__html: post.description}}
        />
        {isSameUser ? '' : reactionButtons}
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
                        className="block w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:py-1.5 sm:text-sm sm:leading-6"
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
    </li>);
};

export default Post;
