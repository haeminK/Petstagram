import { createSlice } from '@reduxjs/toolkit'
import { registerUser, loginUser, authUser, logoutUser } from './thunkFunctions'
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const initialState = {
    userData: {
        id: '',
        username: '',
        email: '',
        image: ''
    },
    isAuth: false,
    isLoading: false,
    error: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(authUser.pending, state => {
                state.isLoading = true;
            })
            .addCase(authUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuth = true;
                state.userData = action.payload;
                state.error = false;
            })
            .addCase(authUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.isAuth = false;
                state.userData = initialState.userData;
                Cookies.remove('accessToken');
            })

            .addCase(registerUser.pending, state => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                Cookies.set('accessToken', action.payload.token);
                state.isAuth = true;
                state.userData = action.payload.user;
                state.error = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                toast.error(action.payload);
            })

            .addCase(loginUser.pending, state => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                Cookies.set('accessToken', action.payload.token);
                state.isAuth = true;
                state.userData = action.payload.user;
                state.error = false;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                toast.error(action.payload);
            })

            .addCase(logoutUser.pending, state => {
                state.isLoading = true;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.isLoading = false;
                Cookies.remove('accessToken');
                state.isAuth = false;
                state.userData = initialState.userData;
                state.error = false;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                toast.error(action.payload);
            })
    }

});

export default userSlice.reducer;