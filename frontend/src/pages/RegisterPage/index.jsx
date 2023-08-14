import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { registerUser } from '../../store/thunkFunctions';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data) => {
        const { email, password, username } = data;
        const body = {
            email,
            password,
            username
        };
        try {
            setIsLoading(true);
            const res = await dispatch(registerUser(body))

            if (!res.error) {
                navigate('/');
            }
        } catch (e) {
            setIsLoading(false);
            console.log(e);
        }
        setIsLoading(false);
    };

    return (
        <div className='flex flex-col justify-center items-center h-full w-3/4 m-auto'>
            <h1 className='text-center mb-6 text-3xl'>
                Register
            </h1>

            <form className='mt-6 w-4/5' onSubmit={handleSubmit(onSubmit)}>
                <div className='mt-4'>
                    <label htmlFor="email">Email</label>
                    <input
                        className='w-full border py-2 px-4 rounded-md'
                        id="email"
                        type="text"
                        {...register('email', {
                            required: 'email is required',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "invalid email address"
                            }
                        })}
                    />
                    {errors?.email &&
                        <div className='text-red-500'>
                            {errors.email.message}
                        </div>
                    }
                </div>
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

export default RegisterPage;