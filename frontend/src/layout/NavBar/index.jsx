import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { logoutUser } from '../../store/thunkFunctions';


const NavBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuth = useSelector(state => state.user?.isAuth);

    const handleLogout = async () => {
        try {
            await dispatch(logoutUser());
            navigate('/login');
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <nav className='flex justify-between items-center px-20 py-5 bg-zinc-900 text-white z-20 sticky top-0'>
            <Link to='/' className='text-2xl'>Petstagram</Link>
            <div className='flex justify-evenly w-4/12 text-2xl'>
                {!isAuth && <Link to="register">Register</Link>}
                {!isAuth && <Link to="login">login</Link>}
                {isAuth && <Link onClick={handleLogout}>logout</Link>}
                {isAuth && <Link to="post/create-post">new post</Link>}
            </div>
        </nav>
    )
}

export default NavBar