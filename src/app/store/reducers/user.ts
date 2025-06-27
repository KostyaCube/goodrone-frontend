import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from '@src/shared/types';

function loadUserState(): UserState {
  try {
    const token = sessionStorage.getItem('token') || localStorage.getItem('token') || '';
    return { token };
  } catch (e) {
    return { token: '' };
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
    logout: (state) => {
      state.token = '';
      localStorage.clear();
      sessionStorage.clear();
    }
  }
});

export const { setToken, logout } = login.actions;
export default login.reducer;
