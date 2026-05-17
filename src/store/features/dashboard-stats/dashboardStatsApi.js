import { baseApi } from "../../api/baseApi"

export const dashboardStatsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query({
      query: () => "/dashboard/stats",
      providesTags: ["Dashboard"],
    }),
  }),
})

export const { useGetDashboardStatsQuery } = dashboardStatsApi
