import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
    FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE,
    REGISTER, persistReducer, persistStore
} from "redux-persist";
import userReducer from './userSlice';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
    user: userReducer
})

const persistConfig = {
    key: 'root',
    storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }

    })
});


export const persistor = persistStore(store);