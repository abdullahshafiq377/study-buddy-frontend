import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

const resultsAdapter = createEntityAdapter();

const initialState = resultsAdapter.getInitialState();

export const resultsApiSlice =
	apiSlice.injectEndpoints({
		                         endpoints: (builder) => ({
			                         getResults:
				                         builder.query({
					                                       query: () => '/results',
					                                       keepUnusedDataFor: 900,
					                                       transformResponse: (responseData) => {
						                                       return resultsAdapter.setAll(
							                                       initialState,
							                                       responseData);
					                                       },
					                                       providesTags: (result,
					                                                      error,
					                                                      arg) => [
						                                       {
							                                       type: 'Result',
							                                       id: 'LIST'
						                                       },
						                                       ...result.ids.map(
							                                       (id) => ({
								                                       type: 'Result',
								                                       id
							                                       })),
					                                       ],
				                                       }),
			                         getResultsByStudent:
				                         builder.query({
					                                       query: (studentId) => `/results/by-student/${studentId}`,
					                                       keepUnusedDataFor: 900,
					                                       transformResponse: (responseData) => {
						                                       return resultsAdapter.setAll(
							                                       initialState,
							                                       responseData);
					                                       },
					                                       providesTags: (result,
					                                                      error,
					                                                      arg) => [
						                                       {
							                                       type: 'Result',
							                                       id: 'LIST'
						                                       },
						                                       ...result.ids.map(
							                                       (id) => ({
								                                       type: 'Result',
								                                       id
							                                       })),
					                                       ],
				                                       }),
			                         generateResults:
				                         builder.mutation({
					                                          query: () => ({
						                                          url: '/results',
						                                          method: 'POST',
						                                          body: {},
					                                          }),
				                                          }),
			                         
		                         }),
	                         });

// Api hooks
export const {
	useGetResultsQuery,
	useGetResultsByStudentQuery,
	useGenerateResultsMutation
} = resultsApiSlice;

// Selectors
export const selectResultsResult =
	resultsApiSlice.endpoints.getResults.select();

const selectResultsData = createSelector(
	selectResultsResult,
	(subResult) => subResult.data,
);

// Get Selectors
export const {
	selectAll: selectAllResults,
	selectById: selectResultById,
	selectIds: selectResultIds,
} = resultsAdapter.getSelectors(
	(state) => selectResultsData(state) ?? initialState,
);
