import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

const studentsAdapter = createEntityAdapter({
	                                            sortComparer: (a, b) => a.name.localeCompare(b.name),
                                            });

const initialState = studentsAdapter.getInitialState();

export const studentsApiSlice = apiSlice.injectEndpoints({
	                                                         endpoints: (builder) => ({
		                                                         getStudents: builder.query({
			                                                                                    query: () => '/students',
			                                                                                    keepUnusedDataFor: 900,
			                                                                                    transformResponse: (responseData) => {
				                                                                                    return studentsAdapter.setAll(
					                                                                                    initialState,
					                                                                                    responseData);
			                                                                                    },
			                                                                                    providesTags: (result,
			                                                                                                   error,
			                                                                                                   arg) => [
				                                                                                    {
					                                                                                    type: 'Student',
					                                                                                    id: 'LIST'
				                                                                                    },
				                                                                                    ...result.ids.map(
					                                                                                    (id) => ({
						                                                                                    type: 'Student',
						                                                                                    id
					                                                                                    })),
			                                                                                    ],
		                                                                                    }),
		                                                         getStudentById: builder.query({
			                                                                                       query: (id) => `/students/${id}`,
			                                                                                       keepUnusedDataFor: 900,
			                                                                                       transformResponse: (responseData) => {
				                                                                                       return studentsAdapter.setAll(
					                                                                                       initialState,
					                                                                                       responseData);
			                                                                                       },
			                                                                                       providesTags: (result,
			                                                                                                      error,
			                                                                                                      arg) => [
				                                                                                       {
					                                                                                       type: 'Student',
					                                                                                       id: 'LIST'
				                                                                                       },
				                                                                                       ...result.ids.map(
					                                                                                       (id) => ({
						                                                                                       type: 'Student',
						                                                                                       id
					                                                                                       })),
			                                                                                       ],
		                                                                                       }),
		                                                         addNewStudent: builder.mutation({
			                                                                                         query: (initialStudent) => ({
				                                                                                         url: '/students',
				                                                                                         method: 'POST',
				                                                                                         body: {...initialStudent},
			                                                                                         }),
			                                                                                         invalidatesTags: [{
				                                                                                         type: 'Student',
				                                                                                         id: 'LIST'
			                                                                                         }],
		                                                                                         }),
		                                                         updateStudent: builder.mutation({
			                                                                                         query: (initialStudent) => ({
				                                                                                         url: `/students/${initialStudent.get(
					                                                                                         'id')}`,
				                                                                                         method: 'PUT',
				                                                                                         body: initialStudent,
			                                                                                         }),
			                                                                                         invalidatesTags: (result,
			                                                                                                           error,
			                                                                                                           arg) => [
				                                                                                         {
					                                                                                         type: 'Student',
					                                                                                         id: arg.id
				                                                                                         },
			                                                                                         ],
		                                                                                         }),
		                                                         deleteStudent: builder.mutation({
			                                                                                         query: ({id}) => ({
				                                                                                         url: `/students/${id}`,
				                                                                                         method: 'DELETE',
				                                                                                         body: {id},
			                                                                                         }),
			                                                                                         invalidatesTags: (result,
			                                                                                                           error,
			                                                                                                           arg) => [
				                                                                                         {
					                                                                                         type: 'Student',
					                                                                                         id: arg.id
				                                                                                         },
			                                                                                         ],
		                                                                                         }),
		                                                         changeStudentPassword:
			                                                         builder.mutation({
				                                                                          query: (details) => ({
					                                                                          url: `/students/${details.id}`,
					                                                                          method: 'PATCH',
					                                                                          body: {...details},
				                                                                          }),
			                                                                          }),
	                                                         }),
                                                         });

// Api hooks
export const {
	useGetStudentsQuery,
	useGetStudentByIdQuery,
	useAddNewStudentMutation,
	useUpdateStudentMutation,
	useDeleteStudentMutation,
	useChangeStudentPasswordMutation,
} = studentsApiSlice;

// Selectors
export const selectStudentsResult =
	studentsApiSlice.endpoints.getStudents.select();

const selectStudentsData = createSelector(
	selectStudentsResult,
	(subResult) => subResult.data,
);

// Get Selectors
export const {
	selectAll: selectAllStudents,
	selectById: selectStudentById,
	selectIds: selectStudentIds,
} = studentsAdapter.getSelectors(
	(state) => selectStudentsData(state) ?? initialState,
);
