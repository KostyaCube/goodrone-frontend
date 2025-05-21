import { useSelector, type TypedUseSelectorHook } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { login } from './reducers/user';
import { baseApi } from './api/APIbase';

const reducers = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  login: login.reducer
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDM) => getDM({ serializableCheck: false }).concat(baseApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
