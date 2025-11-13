import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';
import authReducer from './slices/authSlice';
import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();

const persistConfig = {
    key: 'astroguid',
    version: 1,
    storage: {
        getItem: (key) => new Promise((resolve) => resolve(storage.getString(key))),
        setItem: (key, value) => new Promise((resolve) => {
            storage.set(key, value);
            resolve();
        }),
        removeItem: (key) => new Promise((resolve) => {
            storage.delete(key);
            resolve();
        }),
    },
};

const rootReducers = combineReducers({
     auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
        }),
});
