import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserState } from '@src/shared/types';

const initialState: UserState = {
  token: localStorage.getItem('token') || sessionStorage.getItem('token') || '',
  user: null
};

export const login = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.token = '';
      state.user = null;
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
    }
  }
});

export const { setUser, setToken } = login.actions;
export default login.reducer;
