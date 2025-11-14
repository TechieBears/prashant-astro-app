import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  skip: false,
  showSplash: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      if(action.payload.token){
        state.token = action.payload.token;
        state.isAuthenticated = true;
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    setSkip: (state, action) => {
      state.skip = action.payload;
    },
    hideSplash: (state) => {
      state.showSplash = false;
    },
  },
});

export const { setUser, logout, setSkip, hideSplash } = authSlice.actions;
export default authSlice.reducer;