import React, {useState} from 'react';
import TimeAgo from "./TimeAgo";
import {useSelector} from "react-redux";
import {selectCurrentUserId} from "../../auth/authSlice";
import {TrashIcon} from "@heroicons/react/24/outline";
import ConfirmDeletionModal from "../../../components/ConfirmDeletionModal";
import {useDeleteCommentMutation} from "../postsApiSlice";

const Comment = ({comment, refetch}) => {
    const userId = useSelector(selectCurrentUserId);
    const [deleteComment] = useDeleteCommentMutation();

    const [openConfirmDeletionModal, setOpenConfirmDeletionModal] = useState(false);

    const isSameUser = userId === comment.author_id
    const deleteButton = (<div>
        <button onClick={() => setOpenConfirmDeletionModal(true)} className="mt-1 text-sm text-red-600 hover:underline">
            <TrashIcon
                className='mr-3 h-6 w-6 flex-shrink-0 text-red-400'
                aria-hidden='true'
            />
        </button>
    </div>);

    const handleDelete = () => {
        deleteComment(comment.id);
        refetch();
        setOpenConfirmDeletionModal(false);
    }

    return (
        <li>
            <div className="sm:flex sm:items-baseline sm:justify-between">
                <div className="flex space-x-3">
                    <div className="flex-shrink-0">
                        <img
                            className="h-10 w-10 rounded-full"
                            src={`https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`}
                            alt=""
                        />
                    </div>
                    <div>
                        <div className="sm:flex sm:items-baseline sm:justify-between">
                            <p className="text-sm font-medium text-gray-900">
                                {isSameUser ? 'You' : comment.author_name}
                            </p>
                            <p className="mt-1 whitespace-nowrap text-xs text-gray-600 sm:mt-0 sm:ml-3">
                                <TimeAgo timestamp={comment.date_time}/>
                            </p>
                        </div>
                        <div className="mt-1 text-sm text-gray-700">
                            <p>{comment.text}</p>
                        </div>

                    </div>
                </div>
                {isSameUser ? deleteButton : '' }
            </div>
            <ConfirmDeletionModal open={openConfirmDeletionModal}
                                  setOpen={setOpenConfirmDeletionModal}
                                  title={comment.text}
                                  onDelete={handleDelete}
            />
        </li>
    );
};

export default Comment;
