import { baseApi } from "../../api/baseApi"

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // ─── Step 1: Register ───────────────────────────────────
    register: builder.mutation({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
    }),

    // ─── Step 1b: Verify Register OTP ───────────────────────
    verifyRegisterOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/verify-register-otp",
        method: "POST",
        body: data, // { email, otp }
      }),
    }),

    // ─── Step 2: Login ──────────────────────────────────────
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data, // { email, password }
      }),
    }),

    // ─── Step 3: Role-based Login ───────────────────────────
    loginAsRole: builder.mutation({
      query: (data) => ({
        url: "/auth/login-as-role",
        method: "POST",
        body: data, // { email, password, role }
      }),
    }),

    // ─── Step 4: Forgot Password ────────────────────────────
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data, // { email }
      }),
    }),

    // ─── Step 5: Verify Reset OTP ───────────────────────────
    verifyResetOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/verify-reset-otp",
        method: "POST",
        body: data, // { email, otp }
      }),
    }),

    // ─── Step 6: Reset Password ─────────────────────────────
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data, // { email, newPassword, confirmPassword }
      }),
    }),

    // ─── Refresh Token ──────────────────────────────────────
    refreshToken: builder.mutation({
      query: () => ({
        url: "/auth/refresh",
        method: "POST",
      }),
    }),

    // ─── Logout ─────────────────────────────────────────────
    logoutUser: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),

    // ─── Get Current User ───────────────────────────────────
    getMe: builder.query({
      query: () => "/auth/me",
      providesTags: ["Auth"],
    }),

    // ─── Resend OTP ─────────────────────────────────────────
    resendOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/resend-otp",
        method: "POST",
        body: data, // { email, purpose }
      }),
    }),

    // ─── Change Password ────────────────────────────────────
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
})

export const {
  useRegisterMutation,
  useVerifyRegisterOtpMutation,
  useLoginMutation,
  useLoginAsRoleMutation,
  useForgotPasswordMutation,
  useVerifyResetOtpMutation,
  useResetPasswordMutation,
  useRefreshTokenMutation,
  useLogoutUserMutation,
  useGetMeQuery,
  useResendOtpMutation,
  useChangePasswordMutation,
} = authApi
