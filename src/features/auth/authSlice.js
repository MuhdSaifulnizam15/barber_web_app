import { createSlice } from '@reduxjs/toolkit'
import { registerUser, userLogin, getUserDetails } from './authActions'

// initialize userToken and userInfo from local storage
const userToken = JSON.parse(localStorage.getItem('userToken'));

const userInfo = JSON.parse(localStorage.getItem('userInfo'));

const initialState = {
  loading: false,
  userInfo, // for user object
  userToken, // for storing the JWT
  error: null,
  success: false, // for monitoring the registration process.
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('userToken') // deletes token from storage
      localStorage.removeItem('userInfo') // deletes token from storage
      state.loading = false
      state.userInfo = null
      state.userToken = null
      state.error = null
    },
    setUserProfileInfo: (state, { payload }) => {
      state.userInfo = payload
    },
  },
  extraReducers: {
    // register user
    [registerUser.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.success = true // registration successful
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },

    // login user
    [userLogin.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.userInfo = payload.user
      state.userToken = payload.tokens
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
  },
})

export const { logout, setUserProfileInfo } = authSlice.actions
export default authSlice.reducer