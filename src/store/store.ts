import {configureStore} from "@reduxjs/toolkit";
import {todoReducer} from "./redusers/todoSlice";
import {todoApi} from "./redusers/todoService";


export const store = configureStore({
    reducer: {
        todo: todoReducer,
        [todoApi.reducerPath]: todoApi.reducer

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(todoApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof configureStore>
export type AppDispatch = typeof store.dispatch;