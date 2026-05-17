import { baseApi } from "../../api/baseApi"

export const medicineApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMedicines: builder.query({
      query: () => "/medicines",
      providesTags: ["Medicine"],
    }),
    getMedicineById: builder.query({
      query: (id) => `/medicines/${id}`,
      providesTags: (result, error, arg) => [{ type: "Medicine", id: arg }],
    }),
    addMedicine: builder.mutation({
      query: (data) => ({
        url: "/medicines",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Medicine", "Dashboard"],
    }),
    updateMedicine: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/medicines/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Medicine", id: arg.id }, "Medicine", "Dashboard"],
    }),
    deleteMedicine: builder.mutation({
      query: (id) => ({
        url: `/medicines/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Medicine", "Dashboard"],
    }),
  }),
})

export const {
  useGetMedicinesQuery,
  useGetMedicineByIdQuery,
  useAddMedicineMutation,
  useUpdateMedicineMutation,
  useDeleteMedicineMutation,
} = medicineApi
