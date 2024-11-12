import {configureStore} from '@reduxjs/toolkit';
import authReducer from  '@/modules/Auth/features/slices';
import toastReducer from '@/ui/toastSlice'
export const store = configureStore({
    reducer:{
    auth:authReducer,
    toast:toastReducer
    }
})
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch