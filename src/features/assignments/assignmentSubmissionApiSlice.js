import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

const assignmentSubmissionsAdapter = createEntityAdapter({
	                                                         sortComparer: (a, b) => a.start_date.localeCompare(
		                                                         b.start_date),
                                                         });

const initialState = assignmentSubmissionsAdapter.getInitialState();

export const assignmentSubmissionsApiSlice =
	apiSlice.injectEndpoints({
		                         endpoints: (builder) => ({
			                         getAssignmentSubmissions:
				                         builder.query({
					                                       query: (assignmentId) => `/assignments/submissions/${assignmentId}`,
					                                       keepUnusedDataFor: 900,
					                                       transformResponse: (responseData) => {
						                                       return assignmentSubmissionsAdapter.setAll(
							                                       initialState,
							                                       responseData);
					                                       },
					                                       providesTags: (result,
					                                                      error,
					                                                      arg) => [
						                                       {
							                                       type: 'AssignmentSubmission',
							                                       id: 'LIST'
						                                       },
						                                       ...result.ids.map(
							                                       (id) => ({
								                                       type: 'AssignmentSubmission',
								                                       id
							                                       })),
					                                       ],
				                                       }),
			                         addNewAssignmentSubmission:
				                         builder.mutation({
					                                          query: (initialAssignment) => ({
						                                          url: '/assignments/submissions',
						                                          method: 'POST',
						                                          body: initialAssignment,
					                                          }),
					                                          invalidatesTags: [{
						                                          type: 'AssignmentSubmissions',
						                                          id: 'LIST'
					                                          }],
				                                          }),
		                         }),
	                         });

// Api hooks
export const {
	useGetAssignmentSubmissionsQuery,
	useAddNewAssignmentSubmissionMutation
} = assignmentSubmissionsApiSlice;

// Selectors
export const selectAssignmentSubmissionsResult =
	assignmentSubmissionsApiSlice.endpoints.getAssignmentSubmissions.select();

const selectAssignmentSubmissionsData = createSelector(
	selectAssignmentSubmissionsResult,
	(subResult) => subResult.data,
);

// Get Selectors
export const {
	selectAll: selectAllAssignmentSubmissions,
	selectById: selectAssignmentSubmissionById,
	selectIds: selectAssignmentSubmissionIds,
} = assignmentSubmissionsAdapter.getSelectors(
	(state) => selectAssignmentSubmissionsData(state) ?? initialState,
);
