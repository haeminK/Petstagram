import React from 'react'
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

const NotAuthRoute = () => {
    const isAuth = useSelector(state => state.user?.isAuth);
    //Block logged in users and redirect them to landing page
    return (
        !isAuth ? <Outlet /> : <Navigate to={'/'} />
    )
}

export default NotAuthRoute