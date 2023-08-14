import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axios'
import CardItem from './Sections/CardItem';
import Filter from './Sections/Filter';
import useCategories from '../../hooks/useCategories';

const LandingPage = () => {
    const [posts, setPosts] = useState([]);
    const { categories, handleCategoriesChange } = useCategories([]);

    // fetch posts based on categories filter
    useEffect(() => {
        const params = {
            filters: { categories }
        };

        const fetchPost = async () => {
            try {
                const response = await axiosInstance.get('/post', { params });
                setPosts(response.data);
            } catch (e) {
                console.log(e)
            }
        };
        fetchPost();
    }, [categories]);


    const cardItems = posts.map(post => (
        <CardItem post={post} key={post._id} />
    ));

    return (
        <div className='flex py-20'>
            <Filter categories={categories} handleCategoriesChange={handleCategoriesChange} />
            <div>
                {cardItems}
            </div>



        </div>
    )
}

export default LandingPage