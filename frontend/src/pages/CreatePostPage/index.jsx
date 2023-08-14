import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import ImageUpload from '../../components/ImageUpload';
import axiosInstance from '../../utils/axios';
import petCategoryList from '../../utils/petCategoryList';
import useCategories from '../../hooks/useCategories'

const CreatePostPage = () => {
    const [post, setPost] = useState({
        title: "",
        description: ""
    });
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { categories, handleCategoriesChange } = useCategories([]);


    const navigate = useNavigate();

    const handleChange = (event) => {
        event.preventDefault();

        const name = event.target.name;

        setPost({
            ...post,
            [name]: event.target.value
        })

    };


    const handleImageChange = useCallback((images, add) => {

        if (add) {
            setImages(prevState => [...prevState, ...images]);
        } else {
            setImages(images)
        }
    }, [setImages]);

    const handleSubmit = async event => {
        event.preventDefault();

        const isFormValid = (
            post.title !== "" &&
            post.description !== "" &&
            images.length > 0 &&
            categories.length > 0
        );

        if (!isFormValid) {
            return;
        }

        setIsLoading(true);
        //prepare formData
        let formData = new FormData();

        // postData => req.body   images => req.files
        formData.append('postData', JSON.stringify({ ...post, categories }));
        images.forEach(image => {
            formData.append('images', image.file)
        })

        //Send post request to backend
        try {
            const config = {
                header: { 'content-type': 'multipart/form-data' }
            };
            const res = await axiosInstance.post('/post', formData, config);

            if (!res.error) {
                navigate(`/post/${res.data.postId}`)
            }

        } catch (e) {

            setIsLoading(false);
            toast.error(e.message);
        }
        setIsLoading(false);
    };


    const categoryCheckboxes = petCategoryList.map(category => {
        const isSelected = categories.includes(category);
        return <button
            key={category}
            name='categories'
            value={category}
            className={`border py-1 px-3 rounded-3xl ${isSelected ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            type="button"
            onClick={handleCategoriesChange}
        >
            {category}
        </button>
    })

    return (

        <div className='flex flex-col w-3/4 m-auto justify-center items-center py-10'>

            <h1 className='text-center mb-6 text-3xl'>
                Post pictures of your pet!
            </h1>


            <form className='mt-6 w-full' onSubmit={handleSubmit}>
                <ImageUpload onImageChange={handleImageChange} images={images} />

                <div className='mt-4'>
                    <label htmlFor="title">Title</label>
                    <input
                        className='w-full border py-2 px-4 rounded-md'
                        type="text"
                        id="title"
                        name="title"
                        value={post.title}
                        onChange={handleChange}
                    />
                </div>

                <div className='mt-4'>
                    <label htmlFor="description">Description</label>
                    <input
                        className='w-full border py-2 px-4 rounded-md'
                        type="text"
                        id="description"
                        name="description"
                        value={post.description}
                        onChange={handleChange}
                    />
                </div>

                <div className='my-4'>
                    <div>Pet Categories</div>
                    <div className='flex gap-3 w-[50%] mt-3'>{categoryCheckboxes}</div>
                </div>

                <button
                    className={`block px-4 py-2 mt-10 w-1/2 border rounded-md ${isLoading ? 'bg-gray-700' : 'bg-black'} hover:bg-gray-700 text-white mx-auto`}
                    disabled={isLoading}>
                    {isLoading ? 'Submitting...' : 'Submit'}
                </button>

            </form>
        </div >

    )
}

export default CreatePostPage;