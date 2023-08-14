import React, { useState } from 'react'
import CommentList from './CommentList';
import CommentInput from './CommentInput';


const Comment = ({ initialComments, postId }) => {
    //Get inital comments from DetailPage component
    const [comments, setComments] = useState([...initialComments]);

    const handleComments = updatedComment => {
        setComments(updatedComment);
    };

    return (
        <>

            <CommentList
                comments={comments}
                onUpdateComments={handleComments}
                postId={postId}
            />
            <CommentInput
                onCommentSubmit={handleComments}
                postId={postId} />
        </>
    )
}

export default Comment