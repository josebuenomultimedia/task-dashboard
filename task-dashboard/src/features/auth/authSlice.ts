import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  email: string | null;
  guestMode: boolean;
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  email: null,
  guestMode: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.guestMode = false;
      localStorage.setItem('token', action.payload);
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    enableGuestMode: (state) => {
      state.token = null;
      state.email = null;
      state.guestMode = true;
    },
    clearCredentials: (state) => {
      state.token = null;
      state.email = null;
      state.guestMode = false;
      localStorage.removeItem('token');
    },
  },
});

export const { setToken, setEmail, enableGuestMode, clearCredentials } =
  authSlice.actions;
export default authSlice.reducer;
