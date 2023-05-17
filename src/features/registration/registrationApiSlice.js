import { createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

const registrationsAdapter = createEntityAdapter({
	                                                 sortComparer: (a, b) => a.title.localeCompare(b.title),
                                                 });

const initialState = registrationsAdapter.getInitialState();

export const registrationsApiSlice = apiSlice.injectEndpoints({
	                                                              endpoints: (builder) => ({
		                                                              getUnregisteredCourses: builder.query({
			                                                                                                    query: (stdId) => `/registrations/unregistered/${stdId}`,
			                                                                                                    keepUnusedDataFor: 900,
			                                                                                                    transformResponse: (responseData) => {
				                                                                                                    return registrationsAdapter.setAll(
					                                                                                                    initialState,
					                                                                                                    responseData);
			                                                                                                    },
			                                                                                                    providesTags: (result,
			                                                                                                                   error,
			                                                                                                                   arg) => [
				                                                                                                    {
					                                                                                                    type: 'UnregisteredCourse',
					                                                                                                    id: 'LIST'
				                                                                                                    },
				                                                                                                    ...result.ids.map(
					                                                                                                    (id) => ({
						                                                                                                    type: 'UnregisteredCourse',
						                                                                                                    id
					                                                                                                    })),
			                                                                                                    ],
		                                                                                                    }),
		                                                              getRegisteredCourses: builder.query({
			                                                                                                  query: (stdId) => `/registrations/registered/${stdId}`,
			                                                                                                  keepUnusedDataFor: 900,
			                                                                                                  transformResponse: (responseData) => {
				                                                                                                  return registrationsAdapter.setAll(
					                                                                                                  initialState,
					                                                                                                  responseData);
			                                                                                                  },
			                                                                                                  providesTags: (result,
			                                                                                                                 error,
			                                                                                                                 arg) => [
				                                                                                                  {
					                                                                                                  type: 'RegisteredCourse',
					                                                                                                  id: 'LIST'
				                                                                                                  },
				                                                                                                  ...result.ids.map(
					                                                                                                  (id) => ({
						                                                                                                  type: 'RegisteredCourse',
						                                                                                                  id
					                                                                                                  })),
			                                                                                                  ],
		                                                                                                  }),
		                                                              registerCourse: builder.mutation({
			                                                                                               query: (initialRegistration) => ({
				                                                                                               url: `/registrations`,
				                                                                                               method: 'POST',
				                                                                                               body: {...initialRegistration},
			                                                                                               }),
			                                                                                               invalidatesTags: [{
				                                                                                               type: 'RegisteredCourse',
				                                                                                               id: 'LIST'
			                                                                                               }, {
				                                                                                               type: 'UnregisteredCourse',
				                                                                                               id: 'LIST'
			                                                                                               }],
		                                                                                               }),
		                                                              unregisterCourse: builder.mutation({
			                                                                                                 query: (registration) => ({
				                                                                                                 url: `/registrations`,
				                                                                                                 method: 'DELETE',
				                                                                                                 body: {...registration},
			                                                                                                 }),
			                                                                                                 invalidatesTags: (result,
			                                                                                                                   error,
			                                                                                                                   arg) => [
				                                                                                                 {
					                                                                                                 type: 'RegisteredCourse',
					                                                                                                 id: 'LIST'
				                                                                                                 }, {
					                                                                                                 type: 'UnregisteredCourse',
					                                                                                                 id: 'LIST'
				                                                                                                 }
			                                                                                                 ],
		                                                                                                 }),
		                                                              
	                                                              })
	                                                              
                                                              });

export const {
	useGetUnregisteredCoursesQuery,
	useGetRegisteredCoursesQuery,
	useRegisterCourseMutation,
	useUnregisterCourseMutation,
} = registrationsApiSlice;

