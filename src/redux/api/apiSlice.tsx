import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://reactjr.coderslab.online/api",
  }),
  tagTypes: ["products", "orders"],
  endpoints: () => ({}),
})
