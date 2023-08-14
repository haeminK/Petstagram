import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axios";

export const registerUser = createAsyncThunk(
    'users/registerUser',
    async (body, thunkAPI) => {
        try {

            const response = await axiosInstance.post('/user/register', body);
            return response.data
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data || error.message)
        }
    }
);

export const loginUser = createAsyncThunk(
    'users/loginUser',
    async (body, thunkAPI) => {
        try {
            const response = await axiosInstance.post('/user/login', body);
            return response.data
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data || error.message)
        }
    }
);

export const authUser = createAsyncThunk(
    'users/authUser',
    async (_, thunkAPI) => {
        try {
            const response = await axiosInstance.get('/user/auth');
            return response.data;

        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data || error.message)
        }
    }
);

export const logoutUser = createAsyncThunk(
    'users/logout',
    async (_, thunkAPI) => {
        try {
            const response = await axiosInstance.post('/user/logout');
            return response.data;

        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data || error.message)
        }
    }
);