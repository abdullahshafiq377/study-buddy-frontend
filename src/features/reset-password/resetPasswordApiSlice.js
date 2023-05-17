import { createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

const resetPasswordAdapter = createEntityAdapter({
	                                                 sortComparer: (a, b) => b.date_time.localeCompare(a.date_time),
                                                 });

const initialState = resetPasswordAdapter.getInitialState();

export const resetPasswordApiSlice = apiSlice.injectEndpoints({
	                                                              endpoints: (builder) => ({
		                                                              resetSubAdminPassword: builder.mutation({
			                                                                                                      query: (email) => ({
				                                                                                                      url: `/sub-admins/reset-password/${email}`,
				                                                                                                      method: 'PATCH',
				                                                                                                      body: {email},
			                                                                                                      }),
		                                                                                                      }),
		                                                              resetInstructorPassword: builder.mutation({
			                                                                                                        query: (email) => ({
				                                                                                                        url: `/instructors/reset-password/${email}`,
				                                                                                                        method: 'PATCH',
				                                                                                                        body: {email},
			                                                                                                        }),
		                                                                                                        }),
		                                                              resetStudentPassword: builder.mutation({
			                                                                                                     query: (email) => ({
				                                                                                                     url: `/students/reset-password/${email}`,
				                                                                                                     method: 'PATCH',
				                                                                                                     body: {email},
			                                                                                                     }),
		                                                                                                     }),
	                                                              })
                                                              });

export const {
	useResetSubAdminPasswordMutation,
	useResetInstructorPasswordMutation,
	useResetStudentPasswordMutation,
} = resetPasswordApiSlice;
