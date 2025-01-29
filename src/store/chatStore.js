import {configureStore} from "@reduxjs/toolkit";
import chatReducer from "./chatReducer";


export const chatStore = configureStore({
    reducer: {
        chat: chatReducer,
    }
})
