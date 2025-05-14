import { useSelector, type TypedUseSelectorHook } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { API } from './api/API';
import { setupListeners } from '@reduxjs/toolkit/query';
import { login } from './reducers/user';

const reducers = combineReducers({
  [API.reducerPath]: API.reducer,
  login: login.reducer
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(API.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
