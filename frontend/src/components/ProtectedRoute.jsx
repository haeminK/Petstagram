import React from 'react'
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoute = () => {
    const isAuth = useSelector(state => state.user?.isAuth);

    //block unsigned user. Redirect them to login
    return (
        isAuth ? <Outlet /> : <Navigate to={'/login'} />
    )
}

export default ProtectedRoute