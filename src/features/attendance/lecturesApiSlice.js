import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

const lecturesAdapter = createEntityAdapter({
	                                            sortComparer: (a, b) => a.date.localeCompare(b.date),
                                            });

const initialState = lecturesAdapter.getInitialState();

export const lecturesApiSlice =
	apiSlice.injectEndpoints({
		                         endpoints: (builder) => ({
			                         getLectures:
				                         builder.query({
					                                       query: () => '/attendance/lectures',
					                                       keepUnusedDataFor: 900,
					                                       transformResponse: (responseData) => {
						                                       return lecturesAdapter.setAll(
							                                       initialState,
							                                       responseData);
					                                       },
					                                       providesTags: (result,
					                                                      error,
					                                                      arg) => [
						                                       {
							                                       type: 'Lecture',
							                                       id: 'LIST'
						                                       },
						                                       ...result.ids.map(
							                                       (id) => ({
								                                       type: 'Lecture',
								                                       id
							                                       })),
					                                       ],
				                                       }),
			                         getLectureById:
				                         builder.query({
					                                       query: (id) => `/attendance/lectures/${id}`,
					                                       keepUnusedDataFor: 900,
					                                       transformResponse: (responseData) => {
						                                       return lecturesAdapter.setAll(
							                                       initialState,
							                                       responseData);
					                                       },
					                                       providesTags: (result,
					                                                      error,
					                                                      arg) => [
						                                       {
							                                       type: 'Lecture',
							                                       id: 'LIST'
						                                       },
						                                       ...result.ids.map(
							                                       (id) => ({
								                                       type: 'Lecture',
								                                       id
							                                       })),
					                                       ],
				                                       }),
			                         getLectureBySection:
				                         builder.query({
					                                       query: (sectionId) => `/attendance/lectures/by-section/${sectionId}`,
					                                       keepUnusedDataFor: 900,
					                                       transformResponse: (responseData) => {
						                                       return lecturesAdapter.setAll(
							                                       initialState,
							                                       responseData);
					                                       },
					                                       providesTags: (result,
					                                                      error,
					                                                      arg) => [
						                                       {
							                                       type: 'Lecture',
							                                       id: 'LIST'
						                                       },
						                                       ...result.ids.map(
							                                       (id) => ({
								                                       type: 'Lecture',
								                                       id
							                                       })),
					                                       ],
				                                       }),
			                         addNewLecture:
				                         builder.mutation({
					                                          query: (initialLecture) => ({
						                                          url: '/attendance/lectures',
						                                          method: 'POST',
						                                          body: initialLecture,
					                                          }),
					                                          invalidatesTags: [{
						                                          type: 'Lecture',
						                                          id: 'LIST'
					                                          }],
				                                          }),
			                         
			                         deleteLecture:
				                         builder.mutation({
					                                          query: (id) => ({
						                                          url: `/attendance/lectures/${id}`,
						                                          method: 'DELETE',
						                                          body: {id},
					                                          }),
					                                          invalidatesTags: (result,
					                                                            error,
					                                                            arg) => [
						                                          {
							                                          type: 'Lecture',
							                                          id: arg.id
						                                          },
					                                          ],
				                                          }),
		                         }),
	                         });

// Api hooks
export const {
	useGetLecturesQuery,
	useGetLectureByIdQuery,
	useGetLectureBySectionQuery,
	useAddNewLectureMutation,
	useDeleteLectureMutation,
} = lecturesApiSlice;

// Selectors
export const selectLecturesResult =
	lecturesApiSlice.endpoints.getLectures.select();

const selectLecturesData = createSelector(
	selectLecturesResult,
	(subResult) => subResult.data,
);

// Get Selectors
export const {
	selectAll: selectAllLectures,
	selectById: selectLectureById,
	selectIds: selectLectureIds,
} = lecturesAdapter.getSelectors(
	(state) => selectLecturesData(state) ?? initialState,
);
