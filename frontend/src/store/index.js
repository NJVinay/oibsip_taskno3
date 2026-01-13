import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import accountReducer from './slices/accountSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        account: accountReducer,
    },
});

export default store;
