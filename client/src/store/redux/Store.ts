import { configureStore } from "@reduxjs/toolkit";

import authSlice from "../slices/authSlice";

import sidebarSlice from "../slices/SidebarSlice";


export const store  = configureStore({

    reducer:{

        auth:authSlice.reducer,

        sidebar:sidebarSlice.reducer

    }


})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;