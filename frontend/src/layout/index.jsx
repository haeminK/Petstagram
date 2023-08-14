import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import NavBar from './NavBar/index'
import Footer from './Footer'
import { useDispatch, useSelector } from 'react-redux'
import { authUser } from '../store/thunkFunctions'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.user?.isAuth);

    const { pathname } = useLocation();
    //Every url changes and when an user is being logged in, dispatch authuser to update userdata in redux store
    useEffect(() => {
        if (isAuth) {
            dispatch(authUser());
        }
    }, [isAuth, pathname, dispatch])

    return (

        <div className='h-screen flex flex-col justify-between'>
            <ToastContainer
                position='bottom-right'
                theme='light'
                pauseOnHover
                autoClose={1500}
            />
            <NavBar />
            <main className='w-full mx-auto flex-grow'>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default Layout