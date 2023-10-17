import { configureStore } from '@reduxjs/toolkit';

import persistConfig from './configPersist/authConfig';
import { persistReducer, persistStore } from 'redux-persist';
import userReducer from './slice/userSlice';
import postReducer from './slice/postSlice';
import appReducer from './slice/appSlice';

import authReducer from './slice/authSlice';
const rootReducer = {
    user: userReducer,
    auth: persistReducer(persistConfig, authReducer),
    post: postReducer,
    category: appReducer,
};

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);

export default store;
