import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {ITodo} from "./todoTypes";


// Define a service using a base URL and expected endpoints
export const todoApi = createApi({
    reducerPath: 'todoApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://62f53aa6ac59075124ce14b4.mockapi.io' }),
    tagTypes: ['todos'],
    endpoints: (builder) => ({
        fetchAllTodos: builder.query<ITodo[], string>({
            query: (name) => ({
                url: `/todos`
            }),
            providesTags: result => ['todos']
        }),
        postTodo: builder.mutation<ITodo, string>({
            query: (body:string) => {
                return {
                    url: `/todos1`,
                    method: 'POST',
                    body: {
                        id: '',
                        body,
                        status: true,
                        steps: []
                    }
                }
            },
            invalidatesTags: ['todos']
        }),
    }),
})