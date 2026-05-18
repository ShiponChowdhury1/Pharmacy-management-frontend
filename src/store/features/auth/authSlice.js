import { createSlice } from "@reduxjs/toolkit"

const getUserFromStorage = () => {
  try {
    const userStr = localStorage.getItem("user")
    return userStr ? JSON.parse(userStr) : null
  } catch (e) {
    return null
  }
}

const initialState = {
  user: getUserFromStorage(),
  token: localStorage.getItem("token") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
  isLoggedIn: !!localStorage.getItem("token"),
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

      localStorage.setItem("user", JSON.stringify(action.payload.user))
      localStorage.setItem("token", action.payload.token)
      if (action.payload.refreshToken) {
        localStorage.setItem("refreshToken", action.payload.refreshToken)
      }

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

      localStorage.removeItem("user")
      localStorage.removeItem("token")
      localStorage.removeItem("refreshToken")
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
      localStorage.setItem("token", action.payload.token)
      if (action.payload.refreshToken) {
        state.refreshToken = action.payload.refreshToken
        localStorage.setItem("refreshToken", action.payload.refreshToken)
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