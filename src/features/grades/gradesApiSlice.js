import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

const gradesAdapter = createEntityAdapter({
	                                          sortComparer: (a, b) => a.reg_num.localeCompare(b.reg_num),
                                          });

const initialState = gradesAdapter.getInitialState();

export const gradesApiSlice =
	apiSlice.injectEndpoints({
		                         endpoints: (builder) => ({
			                         getGrades:
				                         builder.query({
					                                       query: () => '/grades',
					                                       keepUnusedDataFor: 900,
					                                       transformResponse: (responseData) => {
						                                       return gradesAdapter.setAll(
							                                       initialState,
							                                       responseData);
					                                       },
					                                       providesTags: (result,
					                                                      error,
					                                                      arg) => [
						                                       {
							                                       type: 'Grade',
							                                       id: 'LIST'
						                                       },
						                                       ...result.ids.map(
							                                       (id) => ({
								                                       type: 'Grade',
								                                       id
							                                       })),
					                                       ],
				                                       }),
			                         getGradesBySection:
				                         builder.query({
					                                       query: (sectionId) => `/grades/by-section/${sectionId}`,
					                                       keepUnusedDataFor: 900,
					                                       transformResponse: (responseData) => {
						                                       return gradesAdapter.setAll(
							                                       initialState,
							                                       responseData);
					                                       },
					                                       providesTags: (result,
					                                                      error,
					                                                      arg) => [
						                                       {
							                                       type: 'Grade',
							                                       id: 'LIST'
						                                       },
						                                       ...result.ids.map(
							                                       (id) => ({
								                                       type: 'Grade',
								                                       id
							                                       })),
					                                       ],
				                                       }),
			                         getGradesByStudent:
				                         builder.query({
					                                       query: (studentId) => `/grades/by-student/${studentId}`,
					                                       keepUnusedDataFor: 900,
					                                       transformResponse: (responseData) => {
						                                       return gradesAdapter.setAll(
							                                       initialState,
							                                       responseData);
					                                       },
					                                       providesTags: (result,
					                                                      error,
					                                                      arg) => [
						                                       {
							                                       type: 'Grade',
							                                       id: 'LIST'
						                                       },
						                                       ...result.ids.map(
							                                       (id) => ({
								                                       type: 'Grade',
								                                       id
							                                       })),
					                                       ],
				                                       }),
			                         updateGrade:
				                         builder.mutation({
					                                          query: (initialGrade) => ({
						                                          url: `/grades/${initialGrade.id}`,
						                                          method: 'PUT',
						                                          body: initialGrade,
					                                          }),
					                                          invalidatesTags: (result,
					                                                            error,
					                                                            arg) => [
						                                          {
							                                          type: 'Grade',
							                                          id: arg.id
						                                          },
					                                          ],
				                                          }),
			                         
		                         }),
	                         });

// Api hooks
export const {
	useGetGradesQuery,
	useGetGradesBySectionQuery,
	useGetGradesByStudentQuery,
	useUpdateGradeMutation,
} = gradesApiSlice;

// Selectors
export const selectGradesResult =
	gradesApiSlice.endpoints.getGrades.select();

const selectGradesData = createSelector(
	selectGradesResult,
	(subResult) => subResult.data,
);

// Get Selectors
export const {
	selectAll: selectAllGrades,
	selectById: selectGradeById,
	selectIds: selectGradeIds,
} = gradesAdapter.getSelectors(
	(state) => selectGradesData(state) ?? initialState,
);
