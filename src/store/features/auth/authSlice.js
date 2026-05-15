import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  user: null,
  token: null,
  refreshToken: null,
  isLoggedIn: false,
  // Temp state for auth flows (OTP verification, password reset)
  tempEmail: null,
  otpPurpose: null, // "register" | "forgot-password"
  registerData: null, // store register form data temporarily until OTP verified
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.refreshToken = action.payload.refreshToken || null
      state.isLoggedIn = true
      // Clear temp data after successful auth
      state.tempEmail = null
      state.otpPurpose = null
      state.registerData = null
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.refreshToken = null
      state.isLoggedIn = false
      state.tempEmail = null
      state.otpPurpose = null
      state.registerData = null
    },
    // Store email & purpose for OTP flow
    setTempEmail: (state, action) => {
      state.tempEmail = action.payload.email
      state.otpPurpose = action.payload.purpose
    },
    // Store register data temporarily (until OTP is verified)
    setRegisterData: (state, action) => {
      state.registerData = action.payload
    },
    clearTempData: (state) => {
      state.tempEmail = null
      state.otpPurpose = null
      state.registerData = null
    },
    updateToken: (state, action) => {
      state.token = action.payload.token
      if (action.payload.refreshToken) {
        state.refreshToken = action.payload.refreshToken
      }
    },
  },
})

export const {
  setCredentials,
  logout,
  setTempEmail,
  setRegisterData,
  clearTempData,
  updateToken,
} = authSlice.actions

export default authSlice.reducer