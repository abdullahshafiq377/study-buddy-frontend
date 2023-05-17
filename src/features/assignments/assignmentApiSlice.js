import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

const assignmentsAdapter = createEntityAdapter({
	                                               sortComparer: (a, b) => a.start_date.localeCompare(b.start_date),
                                               });

const initialState = assignmentsAdapter.getInitialState();

export const assignmentsApiSlice =
	apiSlice.injectEndpoints({
		                         endpoints: (builder) => ({
			                         getAssignments:
				                         builder.query({
					                                       query: () => '/assignments',
					                                       keepUnusedDataFor: 900,
					                                       transformResponse: (responseData) => {
						                                       return assignmentsAdapter.setAll(
							                                       initialState,
							                                       responseData);
					                                       },
					                                       providesTags: (result,
					                                                      error,
					                                                      arg) => [
						                                       {
							                                       type: 'Assignment',
							                                       id: 'LIST'
						                                       },
						                                       ...result.ids.map(
							                                       (id) => ({
								                                       type: 'Assignment',
								                                       id
							                                       })),
					                                       ],
				                                       }),
			                         getAssignmentsBySection:
				                         builder.query({
					                                       query: (sectionId) => `/assignments/by-section/${sectionId}`,
					                                       keepUnusedDataFor: 900,
					                                       transformResponse: (responseData) => {
						                                       return assignmentsAdapter.setAll(
							                                       initialState,
							                                       responseData);
					                                       },
					                                       providesTags: (result,
					                                                      error,
					                                                      arg) => [
						                                       {
							                                       type: 'Assignment',
							                                       id: 'LIST'
						                                       },
						                                       ...result.ids.map(
							                                       (id) => ({
								                                       type: 'Assignment',
								                                       id
							                                       })),
					                                       ],
				                                       }),
			                         addNewAssignment:
				                         builder.mutation({
					                                          query: (initialAssignment) => ({
						                                          url: '/assignments',
						                                          method: 'POST',
						                                          body: initialAssignment,
					                                          }),
					                                          invalidatesTags: [{
						                                          type: 'Assignment',
						                                          id: 'LIST'
					                                          }],
				                                          }),
			                         updateAssignment:
				                         builder.mutation({
					                                          query: (initialAssignment) => ({
						                                          url: `/assignments/${initialAssignment.get(
							                                          'id')}`,
						                                          method: 'PUT',
						                                          body: initialAssignment,
					                                          }),
					                                          invalidatesTags: (result,
					                                                            error,
					                                                            arg) => [
						                                          {
							                                          type: 'Assignment',
							                                          id: arg.id
						                                          },
					                                          ],
				                                          }),
			                         deleteAssignment:
				                         builder.mutation({
					                                          query: ({id}) => ({
						                                          url: `/assignments/${id}`,
						                                          method: 'DELETE',
						                                          body: {id},
					                                          }),
					                                          invalidatesTags: (result,
					                                                            error,
					                                                            arg) => [
						                                          {
							                                          type: 'Assignment',
							                                          id: arg.id
						                                          },
					                                          ],
				                                          }),
		                         }),
	                         });

// Api hooks
export const {
	useGetAssignmentsQuery,
	useGetAssignmentsBySectionQuery,
	useAddNewAssignmentMutation,
	useUpdateAssignmentMutation,
	useDeleteAssignmentMutation,
} = assignmentsApiSlice;

// Selectors
export const selectAssignmentsResult =
	assignmentsApiSlice.endpoints.getAssignments.select();

const selectAssignmentsData = createSelector(
	selectAssignmentsResult,
	(subResult) => subResult.data,
);

// Get Selectors
export const {
	selectAll: selectAllAssignments,
	selectById: selectAssignmentById,
	selectIds: selectAssignmentIds,
} = assignmentsAdapter.getSelectors(
	(state) => selectAssignmentsData(state) ?? initialState,
);
