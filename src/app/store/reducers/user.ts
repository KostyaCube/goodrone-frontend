import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserState } from '@src/shared/types';

function loadUserState(): UserState {
  try {
    const token = sessionStorage.getItem('token') || localStorage.getItem('token') || '';
    const userJson = sessionStorage.getItem('user') || localStorage.getItem('user');
    const user = userJson ? JSON.parse(userJson) : null;
    return { token, user };
  } catch (e) {
    return { token: '', user: null };
  }
}

const initialState: UserState = loadUserState();

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
      localStorage.clear();
      sessionStorage.clear();
    }
  }
});

export const { setUser, setToken, logout } = login.actions;
export default login.reducer;
