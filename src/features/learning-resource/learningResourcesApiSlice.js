import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

const learningResourcesAdapter = createEntityAdapter({
	                                                     sortComparer: (a, b) => a.start_date.localeCompare(
		                                                     b.start_date),
                                                     });

const initialState = learningResourcesAdapter.getInitialState();

export const learningResourcesApiSlice =
	apiSlice.injectEndpoints({
		                         endpoints: (builder) => ({
			                         getLearningResources:
				                         builder.query({
					                                       query: () => '/learning-resources',
					                                       keepUnusedDataFor: 900,
					                                       transformResponse: (responseData) => {
						                                       return learningResourcesAdapter.setAll(
							                                       initialState,
							                                       responseData);
					                                       },
					                                       providesTags: (result,
					                                                      error,
					                                                      arg) => [
						                                       {
							                                       type: 'LearningResource',
							                                       id: 'LIST'
						                                       },
						                                       ...result.ids.map(
							                                       (id) => ({
								                                       type: 'LearningResource',
								                                       id
							                                       })),
					                                       ],
				                                       }),
			                         getLearningResourcesBySection:
				                         builder.query({
					                                       query: (sectionId) => `/learning-resources/by-section/${sectionId}`,
					                                       keepUnusedDataFor: 900,
					                                       transformResponse: (responseData) => {
						                                       return learningResourcesAdapter.setAll(
							                                       initialState,
							                                       responseData);
					                                       },
					                                       providesTags: (result,
					                                                      error,
					                                                      arg) => [
						                                       {
							                                       type: 'LearningResource',
							                                       id: 'LIST'
						                                       },
						                                       ...result.ids.map(
							                                       (id) => ({
								                                       type: 'LearningResource',
								                                       id
							                                       })),
					                                       ],
				                                       }),
			                         addNewLearningResource:
				                         builder.mutation({
					                                          query: (initialLearningResource) => ({
						                                          url: '/learning-resources',
						                                          method: 'POST',
						                                          body: initialLearningResource,
					                                          }),
					                                          invalidatesTags: [{
						                                          type: 'LearningResource',
						                                          id: 'LIST'
					                                          }],
				                                          }),
			                         
			                         deleteLearningResource:
				                         builder.mutation({
					                                          query: (id) => ({
						                                          url: `/learning-resources/${id}`,
						                                          method: 'DELETE',
						                                          body: {id},
					                                          }),
					                                          invalidatesTags: (result,
					                                                            error,
					                                                            arg) => [
						                                          {
							                                          type: 'LearningResource',
							                                          id: arg.id
						                                          },
					                                          ],
				                                          }),
		                         }),
	                         });

// Api hooks
export const {
	useGetLearningResourcesQuery,
	useGetLearningResourcesBySectionQuery,
	useAddNewLearningResourceMutation,
	useDeleteLearningResourceMutation,
} = learningResourcesApiSlice;

// Selectors
export const selectLearningResourcesResult =
	learningResourcesApiSlice.endpoints.getLearningResources.select();

const selectLearningResourcesData = createSelector(
	selectLearningResourcesResult,
	(subResult) => subResult.data,
);

// Get Selectors
export const {
	selectAll: selectAllLearningResources,
	selectById: selectLearningResourceById,
	selectIds: selectLearningResourceIds,
} = learningResourcesAdapter.getSelectors(
	(state) => selectLearningResourcesData(state) ?? initialState,
);
