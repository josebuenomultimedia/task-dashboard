import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';
import { setEmail } from './authSlice';

export const fetchUserInfo = createAsyncThunk(
  'auth/fetchUserInfo',
  async (_, { dispatch }) => {
    const res = await axiosInstance.get('/auth/me');
    dispatch(setEmail(res.data.email));
  }
);
