import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    data: {
      _id:'',
      username: '',
    }
  }, reducers: {
    addAuth: (state, action ) => {
      state.data = action.payload
    },
    removeAuth: (state, action ) => {
      state.data = { _id:'',
        username: '',}
    }
  }
})

export const authReducer = authSlice.reducer
export const {
  addAuth,
  removeAuth
} = authSlice.actions

export const authSelector = (state) => state.authReducer.data