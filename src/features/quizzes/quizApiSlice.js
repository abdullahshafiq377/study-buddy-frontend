import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

const quizzesAdapter = createEntityAdapter({
	                                           sortComparer: (a, b) => a.start_date.localeCompare(b.start_date),
                                           });

const initialState = quizzesAdapter.getInitialState();

export const quizzesApiSlice =
	apiSlice.injectEndpoints({
		                         endpoints: (builder) => ({
			                         getQuizzes:
				                         builder.query({
					                                       query: () => '/quizzes',
					                                       keepUnusedDataFor: 900,
					                                       transformResponse: (responseData) => {
						                                       return quizzesAdapter.setAll(
							                                       initialState,
							                                       responseData);
					                                       },
					                                       providesTags: (result,
					                                                      error,
					                                                      arg) => [
						                                       {
							                                       type: 'Quiz',
							                                       id: 'LIST'
						                                       },
						                                       ...result.ids.map(
							                                       (id) => ({
								                                       type: 'Quiz',
								                                       id
							                                       })),
					                                       ],
				                                       }),
			                         getQuizzesBySection:
				                         builder.query({
					                                       query: (sectionId) => `/quizzes/by-section/${sectionId}`,
					                                       keepUnusedDataFor: 900,
					                                       transformResponse: (responseData) => {
						                                       return quizzesAdapter.setAll(
							                                       initialState,
							                                       responseData);
					                                       },
					                                       providesTags: (result,
					                                                      error,
					                                                      arg) => [
						                                       {
							                                       type: 'Quiz',
							                                       id: 'LIST'
						                                       },
						                                       ...result.ids.map(
							                                       (id) => ({
								                                       type: 'Quiz',
								                                       id
							                                       })),
					                                       ],
				                                       }),
			                         addNewQuiz:
				                         builder.mutation({
					                                          query: (initialQuiz) => ({
						                                          url: '/quizzes',
						                                          method: 'POST',
						                                          body: initialQuiz,
					                                          }),
					                                          invalidatesTags: [{
						                                          type: 'Quiz',
						                                          id: 'LIST'
					                                          }],
				                                          }),
			                         updateQuiz:
				                         builder.mutation({
					                                          query: (initialQuiz) => ({
						                                          url: `/quizzes/${initialQuiz.get(
							                                          'id')}`,
						                                          method: 'PUT',
						                                          body: initialQuiz,
					                                          }),
					                                          invalidatesTags: (result,
					                                                            error,
					                                                            arg) => [
						                                          {
							                                          type: 'Quiz',
							                                          id: arg.id
						                                          },
					                                          ],
				                                          }),
			                         deleteQuiz:
				                         builder.mutation({
					                                          query: ({id}) => ({
						                                          url: `/quizzes/${id}`,
						                                          method: 'DELETE',
						                                          body: {id},
					                                          }),
					                                          invalidatesTags: (result,
					                                                            error,
					                                                            arg) => [
						                                          {
							                                          type: 'Quiz',
							                                          id: arg.id
						                                          },
					                                          ],
				                                          }),
		                         }),
	                         });

// Api hooks
export const {
	useGetQuizzesQuery,
	useGetQuizzesBySectionQuery,
	useAddNewQuizMutation,
	useUpdateQuizMutation,
	useDeleteQuizMutation,
} = quizzesApiSlice;

// Selectors
export const selectQuizzesResult =
	quizzesApiSlice.endpoints.getQuizzes.select();

const selectQuizzesData = createSelector(
	selectQuizzesResult,
	(subResult) => subResult.data,
);

// Get Selectors
export const {
	selectAll: selectAllQuizzes,
	selectById: selectQuizById,
	selectIds: selectQuizIds,
} = quizzesAdapter.getSelectors(
	(state) => selectQuizzesData(state) ?? initialState,
);
