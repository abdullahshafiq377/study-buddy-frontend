import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

const quizSubmissionsAdapter = createEntityAdapter({
	                                                   sortComparer: (a, b) => a.start_date.localeCompare(
		                                                   b.start_date),
                                                   });

const initialState = quizSubmissionsAdapter.getInitialState();

export const quizSubmissionsApiSlice =
	apiSlice.injectEndpoints({
		                         endpoints: (builder) => ({
			                         getQuizSubmissions:
				                         builder.query({
					                                       query: (quizId) => `/quizzes/submissions/${quizId}`,
					                                       keepUnusedDataFor: 900,
					                                       transformResponse: (responseData) => {
						                                       return quizSubmissionsAdapter.setAll(
							                                       initialState,
							                                       responseData);
					                                       },
					                                       providesTags: (result,
					                                                      error,
					                                                      arg) => [
						                                       {
							                                       type: 'QuizSubmission',
							                                       id: 'LIST'
						                                       },
						                                       ...result.ids.map(
							                                       (id) => ({
								                                       type: 'QuizSubmission',
								                                       id
							                                       })),
					                                       ],
				                                       }),
			                         addNewQuizSubmission:
				                         builder.mutation({
					                                          query: (initialQuiz) => ({
						                                          url: '/quizzes/submissions',
						                                          method: 'POST',
						                                          body: initialQuiz,
					                                          }),
					                                          invalidatesTags: [{
						                                          type: 'QuizSubmissions',
						                                          id: 'LIST'
					                                          }],
				                                          }),
		                         }),
	                         });

// Api hooks
export const {
	useGetQuizSubmissionsQuery,
	useAddNewQuizSubmissionMutation
} = quizSubmissionsApiSlice;

// Selectors
export const selectQuizSubmissionsResult =
	quizSubmissionsApiSlice.endpoints.getQuizSubmissions.select();

const selectQuizSubmissionsData = createSelector(
	selectQuizSubmissionsResult,
	(subResult) => subResult.data,
);

// Get Selectors
export const {
	selectAll: selectAllQuizSubmissions,
	selectById: selectQuizSubmissionById,
	selectIds: selectQuizSubmissionIds,
} = quizSubmissionsAdapter.getSelectors(
	(state) => selectQuizSubmissionsData(state) ?? initialState,
);
