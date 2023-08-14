import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import axiosInstance from '../../../../utils/axios';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const CommentItem = ({ comment, onDeleteComment, postId }) => {
    const [isLoading, setIsLoading] = useState(false);

    const { id: userId } = useSelector(state => state.user?.userData);
    const isAuth = useSelector(state => state.user?.isAuth);

    // after delte update comments state
    const handleDelete = async () => {
        try {
            setIsLoading(true);
            const res = await axiosInstance.delete(`/comment/${postId}/${comment._id}`)
            onDeleteComment(res.data.updatedComments);
        } catch (e) {
            setIsLoading(false);
            console.log(e);
            toast.error(e);
        }
        setIsLoading(false);
    };

    return (
        <div className='my-4 px-4 text-sm flex justify-between'>
            <div>
                <div>
                    <b>{comment.author.username}</b> {" "}
                    <span>{new Date(comment.createdAt).toISOString().substring(0, 10)}</span>
                </div>
                <div className='pl-5 mt-1'>{comment.body}</div>
            </div>


            <div>
                {isAuth && userId && comment.author._id === userId &&
                    <button
                        onClick={handleDelete}
                        className='text-red-500'
                        disabled={isLoading}>
                        {isLoading ? 'Deleting..' : 'Delete'}
                    </button>}
            </div>
        </div>
    )
}

export default CommentItem;