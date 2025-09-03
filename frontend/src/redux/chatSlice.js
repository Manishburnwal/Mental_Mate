import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chats: [],
    activeChat: null,
    loading: false,
    error: null,
  },
  reducers: {
    setChats: (state, action) => { state.chats = action.payload; },
    setActiveChat: (state, action) => { state.activeChat = action.payload; },
    addMessageToChat: (state, action) => {
      if (state.activeChat) {
        state.activeChat.messages.push(action.payload);
      }
    },
    setLoading: (state, action) => { state.loading = action.payload; },
    setError: (state, action) => { state.error = action.payload; },
  }
});

export const { setChats, setActiveChat, addMessageToChat, setLoading, setError } = chatSlice.actions;
export default chatSlice.reducer;
