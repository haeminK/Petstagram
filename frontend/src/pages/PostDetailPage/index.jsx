import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import axiosInstance from '../../utils/axios';
import PostImages from './Sections/PostImages';
import Comment from './Sections/Comment/index';


const PostDetailPage = () => {

    const [post, setPost] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { postId } = useParams();
    const navigate = useNavigate();
    const { id: userId } = useSelector(state => state.user?.userData);


    const handleDelete = async () => {
        try {
            setIsLoading(true);
            await axiosInstance.delete(`/post/${postId}`);
            navigate('/');
        } catch (e) {
            setIsLoading(false);
            console.log(e);
            toast.error(e.message);
        }
    };



    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axiosInstance.get(`/post/${postId}`);
                setPost(response.data);
            } catch (e) {
                console.log(e);
                toast.error(e.message);
            }
        };
        fetchPost();

    }, [postId]);

    const date = post ? new Date(post.createdAt).toISOString().substring(0, 10) : "";

    return (

        post &&
        <div className='flex my-[50px] w-3/4 m-auto'>
            {/* images */}
            <PostImages
                className='w-full'
                images={post.images} />


            <div className='border grow min-w-[350px] flex flex-col max-h-[600px] w-full'>
                {/* post body */}
                <div className='pb-3'>
                    <div className='flex justify-between px-[15px] py-[15px]'>
                        <div>
                            <span>{post.author?.username}</span>
                            <span className='ml-[10px] text-gray-500'>{date}</span>
                        </div>
                        <div>
                            <div className='text-center mb-3 rounded-xl bg-gray-500 text-white px-5'>
                                {post.views} views
                            </div>
                            {userId === post.author._id && <div>
                                <Link to={'edit'}>Edit</Link>
                                <button
                                    className='ml-5 text-red-500'
                                    onClick={handleDelete}
                                    disabled={isLoading}
                                >{isLoading ? 'Deleting..' : 'Delete'}</button>
                            </div>}

                        </div>

                    </div>

                    <div className='px-[15px]'>
                        <h1 className='ml-[10px] text-lg'><b>{post.title}</b></h1>
                        <p className='ml-[20px] mt-[5px] text-sm'>{post.description}</p>
                    </div>
                </div>

                {/* categories */}
                <div className='flex gap-3 overflow-x-auto py-4 horizontal-scroll pl-3 border-b'>
                    {post.categories.map(category => {
                        return <div className='bg-gray-300 rounded-xl px-3' key={category}>{category}</div>
                    })}

                </div>
                <Comment
                    initialComments={post.comments}
                    postId={postId}
                />

            </div>
        </div>

    )
}

export default PostDetailPage;