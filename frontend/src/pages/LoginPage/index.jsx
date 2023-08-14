import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { loginUser } from '../../store/thunkFunctions';
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data) => {
        const { password, username } = data;
        const body = {
            password,
            username
        };
        try {
            setIsLoading(true);
            const res = await dispatch(loginUser(body))

            if (!res.error) {
                navigate('/');
            }
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
        setIsLoading(false);
    };

    return (

        <div className='flex flex-col justify-center items-center h-full w-3/4 m-auto'>
            <h1 className='text-center mb-6 text-3xl'>
                Login
            </h1>

            <form className='mt-6 w-4/5' onSubmit={handleSubmit(onSubmit)}>

                <div className='mt-4'>
                    <label htmlFor="username">Username</label>
                    <input
                        className='w-full border py-2 px-4 rounded-md'
                        id="username"
                        type="text"
                        {...register('username', { required: 'Username is required' })}
                    />
                    {errors?.username &&
                        <div className='text-red-500'>
                            {errors.username.message}
                        </div>
                    }
                </div>
                <div className='mt-4'>
                    <label htmlFor="password">Password</label>
                    <input
                        className='w-full border py-2 px-4 rounded-md'
                        id="password"
                        type="password"
                        {...register('password', {
                            required: 'Password is required',
                            minLength: { value: 8, message: "Should be equal or longer than 8 characters" }
                        })}
                    />
                    {errors?.password &&
                        <div className='text-red-500'>
                            {errors.password.message}
                        </div>
                    }
                </div>

                <button
                    className={`block  ${isLoading ? 'bg-gray-700' : 'bg-black'} px-4 py-2 mt-6 w-1/2 border rounded-md bg-black hover:bg-gray-700 text-white mx-auto`}
                    disabled={isLoading}>
                    {isLoading ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>

    )
}

export default LoginPage