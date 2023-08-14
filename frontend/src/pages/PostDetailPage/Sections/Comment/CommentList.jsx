import React from 'react'
import CommentItem from './CommentItem';


const CommentList = ({ comments, onUpdateComments, postId }) => {

    const handleDeleteComment = (newComments) => {
        onUpdateComments(newComments);
    };

    const commentList = comments.map((comment, index) =>
    (<CommentItem
        onDeleteComment={handleDeleteComment}
        key={comment._id}
        comment={comment}
        postId={postId}
    />
    ));

    return (
        <div className='border-b grow overflow-y-auto'>
            {commentList}
        </div>
    )
}

export default CommentList;