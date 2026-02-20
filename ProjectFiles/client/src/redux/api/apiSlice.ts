import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const apiSlice = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth?.user?.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      // Don't set Content-Type for FormData - browser will set it automatically with boundary
      if (!headers.has('Content-Type')) {
        // Only set if not already set (FormData will be handled by browser)
      }
      return headers;
    },
  }),
  tagTypes: ["Doctors"],
  endpoints: (builder) => ({}),
});
