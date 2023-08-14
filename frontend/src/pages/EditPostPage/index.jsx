import React, { useCallback, useEffect, useState } from 'react'
import ImageUpload from '../../components/ImageUpload'
import axiosInstance from '../../utils/axios'
import useCategories from '../../hooks/useCategories'
import petCategoryList from '../../utils/petCategoryList'

import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const EditPostPage = () => {
    const [post, setPost] = useState({
        title: "",
        description: "",
    });
    const [images, setImages] = useState([]);
    const [deletedOriginalImgs, setDeletedOrginalImgs] = useState([]);
    const [authorId, setAuthorId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { categories, setCategories, handleCategoriesChange } = useCategories([]);

    const navigate = useNavigate();
    const { id: userId } = useSelector(state => state.user?.userData);
    const { postId } = useParams();


    // bring saved post data from backend and set input states based on fetched data 
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axiosInstance.get(`/post/${postId}`);
                const { images, title, description, author, categories } = response.data;
                const imagesList = images.map(images => ({
                    url: images.url,
                    file: null,
                    filename: images.filename
                }));

                setImages(imagesList);
                setPost({
                    title,
                    description
                });
                setAuthorId(author._id);
                setCategories(categories);
            } catch (e) {
                console.log(e);
                toast.error(e.message);
            }
        };

        fetchPost();
    }, [postId, setCategories]);


    // redirect unauthorized user to post detail page, when unauthenticated user tries to access Editpage
    useEffect(() => {

        if (authorId && userId && authorId !== userId) {
            navigate(`/post/${postId}`);
            toast.error("You don't have an access to edit the post");
        }

    }, [authorId, userId, postId, navigate]);



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


    const handleDeleteOriginalImgs = useCallback((deletedImages) => {
        setDeletedOrginalImgs(prevState => [...prevState, ...deletedImages]);
    }, [setDeletedOrginalImgs]);


    const handleSubmit = async event => {
        event.preventDefault();

        const isFormValid = (
            post.title !== "" &&
            post.description !== "" &&
            images.length > 0);

        if (!isFormValid) {
            return;
        }
        setIsLoading(true);
        //prepare formData
        let formData = new FormData();
        let originalImages = [];


        images.forEach(image => {
            // image.file === null  =>  originalImages
            if (image.file === null) {
                originalImages.push({ url: image.url, filename: image.filename })
            } else {
                formData.append('images', image.file)
            }
        });

        const stringData = {
            ...post,
            categories,
            originalImages,
            deletedOriginalImgs
        };
        formData.append('postData', JSON.stringify(stringData));


        //Send put request to backend
        try {
            const config = {
                header: { 'content-type': 'multipart/form-data' }
            };
            await axiosInstance.put(`/post/${postId}`, formData, config);
            return navigate(`/post/${postId}`);


        } catch (e) {
            setIsLoading(false);
            console.log(e);
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
        authorId && userId && authorId === userId &&
        <div className='flex flex-col justify-center items-center py-10 w-3/4 m-auto'>

            <h1 className='text-center mb-6 text-3xl'>
                Post pictures of your pet!
            </h1>


            <form className='mt-6 w-full' onSubmit={handleSubmit}>

                <ImageUpload
                    onImageChange={handleImageChange}
                    images={images}
                    onDeleteOriginalImgs={handleDeleteOriginalImgs} />

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
        </div>

    )
};


export default EditPostPage;