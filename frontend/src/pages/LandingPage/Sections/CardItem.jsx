import React from 'react'
import { Link } from 'react-router-dom';
import './CardItem.css'

const CardItem = ({ post }) => {

    const date = new Date(post.createdAt).toISOString().substring(0, 10);

    return (
        <section className='w-[468px] mb-[30px] mx-auto border-b'>
            <div className='flex gap-[10px] py-[7px]'>
                <div>{post.author?.username}</div>
                <div className='text-gray-500'>{date}</div>
            </div>

            <div className='mb-[5px]'>
                <img className='h-[468px] w-full' src={post.images[0].url} />
            </div>

            <div className='flex gap-3 overflow-x-auto py-3 horizontal-scroll'>
                {post.categories.map(category => {
                    return <div className='bg-gray-300 rounded-xl px-3' key={category}>{category}</div>
                })}
            </div>

            <Link
                to={`post/${post._id}`}

            >

                {/* <div className='flex justify-between mb-[5px]'>
                    <div><FcLikePlaceholder className='text-3xl' /></div>
                    <div>
                        <span className='mr-[10px]'>15 Likes</span>
                        <span>200 views</span>
                    </div>
                </div> */}

                <div className='flex justify-between text-lg mb-[5px] p-1'>
                    <div className='max-w-[80%]'>{post.title}</div>
                    <div>{post.views} views</div>
                </div>
            </Link>
        </section>
    )
};

export default CardItem