// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { UniVersalType } from "../../../components/types/globalTypes"
import { api } from "../../api/apiSlice"

const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/products",
    }),
    getSingleProduct: builder.query({
      query: (id: number) => `/products/${id}`,
    }),
    createProduct: builder.mutation({
      query: (newProduct: UniVersalType) => ({
        url: "/products",
        method: "POST",
        body: newProduct,
      }),
    }),
    updateProduct: builder.mutation({
      query: ({
        id,
        updatedProduct,
      }: {
        id: number
        updatedProduct: UniVersalType
      }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: updatedProduct,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id: number) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
    }),
  }),
})

// Export hooks for usage in functional components
export const {
  useGetProductsQuery,
  useGetSingleProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi
