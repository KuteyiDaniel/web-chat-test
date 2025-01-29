import {createSlice} from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: "chat",
    initialState: {
        messages: [],
        users: []
    },
    reducers: {
        loadDataFromStorage: (state, action) => {
            state.messages = [ ...action.payload.messages ];
            state.users = [...action.payload.users];

            console.log({ action })
        },
        addUser: (state, action) => {
            state.users = [
                ...state.users,
                action.payload
            ]
        },
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        }
    }
})


export const { loadDataFromStorage, addUser, addMessage } = chatSlice.actions;
export default chatSlice.reducer;
