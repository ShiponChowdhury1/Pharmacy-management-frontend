import { baseApi } from "../../api/baseApi"

export const salesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSales: builder.query({
      query: () => "/sales",
      providesTags: ["Sale"],
    }),
    getSaleById: builder.query({
      query: (id) => `/sales/${id}`,
      providesTags: (result, error, id) => [{ type: "Sale", id }],
    }),
    addSale: builder.mutation({
      query: (data) => ({
        url: "/sales",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Sale", "Dashboard", "Medicine", "Customer"], 
    }),
  }),
})

export const {
  useGetSalesQuery,
  useGetSaleByIdQuery,
  useAddSaleMutation,
} = salesApi
