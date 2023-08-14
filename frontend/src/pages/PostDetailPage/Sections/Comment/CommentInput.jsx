import React, { useState } from 'react'
import axiosInstance from '../../../../utils/axios';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from 'react-redux';

const CommentInput = ({ onCommentSubmit, postId }) => {
    const [comment, setComment] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { id: userId } = useSelector(state => state.user?.userData);
    const isAuth = useSelector(state => state.user?.isAuth);

    const handleChange = event => {
        setComment(event.target.value);
    };

    //post new comment and retreive updated comments from backend.
    // Then change commments state in Comment/index.jsx
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (comment.trim() === "") return;

        if (!isAuth) {
            toast.error('Please log in');
            return;
        }
        setIsLoading(true);
        setComment("");
        try {
            //get new comments and update comments state
            const res = await axiosInstance.post('/comment', { commentBody: comment, userId, postId });
            const { newComments } = res.data;
            setIsLoading(false);
            onCommentSubmit(newComments);

        }
        catch (e) {
            console.log(e);
            setIsLoading(false);
            toast.error(e.message);
        }
    };

    return (

        <div className='h-[50px] w-full border-t py-2 box-content'>

            <form className='flex' onSubmit={handleSubmit}>
                <textarea
                    onChange={handleChange}
                    value={comment}
                    style={{ resize: 'none', outline: 'none', overflow: 'hidden' }}
                    className='px-2 h-3/4 w-[90%] rounded-md' />
                <button
                    className={`${comment.trim() === "" || isLoading ? 'text-gray-400' : 'text-blue-500'} w-[10%] border-none focus:outline-none h-[50px] mr-2`}
                    disabled={isLoading}>
                    post
                </button>
            </form>
        </div >

    )
}

export default CommentInput