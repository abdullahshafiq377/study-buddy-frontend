import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

const attendancesAdapter = createEntityAdapter({
	                                               sortComparer: (a, b) => a.reg_num.localeCompare(b.reg_num),
                                               });

const initialState = attendancesAdapter.getInitialState();

export const attendancesApiSlice =
	apiSlice.injectEndpoints({
		                         endpoints: (builder) => ({
			                         getAttendances:
				                         builder.query({
					                                       query: () => '/attendance',
					                                       keepUnusedDataFor: 900,
					                                       transformResponse: (responseData) => {
						                                       return attendancesAdapter.setAll(
							                                       initialState,
							                                       responseData);
					                                       },
					                                       providesTags: (result,
					                                                      error,
					                                                      arg) => [
						                                       {
							                                       type: 'Attendance',
							                                       id: 'LIST'
						                                       },
						                                       ...result.ids.map(
							                                       (id) => ({
								                                       type: 'Attendance',
								                                       id
							                                       })),
					                                       ],
				                                       }),
			                         getAttendanceByLecture:
				                         builder.query({
					                                       query: (id) => `/attendance/by-lecture/${id}`,
					                                       keepUnusedDataFor: 900,
					                                       transformResponse: (responseData) => {
						                                       return attendancesAdapter.setAll(
							                                       initialState,
							                                       responseData);
					                                       },
					                                       providesTags: (result,
					                                                      error,
					                                                      arg) => [
						                                       {
							                                       type: 'Attendance',
							                                       id: 'LIST'
						                                       },
						                                       ...result.ids.map(
							                                       (id) => ({
								                                       type: 'Attendance',
								                                       id
							                                       })),
					                                       ],
				                                       }),
			                         getAttendanceByStudent:
				                         builder.query({
					                                       query: (id) => `/attendance/by-student/${id}`,
					                                       keepUnusedDataFor: 900,
					                                       transformResponse: (responseData) => {
						                                       return attendancesAdapter.setAll(
							                                       initialState,
							                                       responseData);
					                                       },
					                                       providesTags: (result,
					                                                      error,
					                                                      arg) => [
						                                       {
							                                       type: 'Attendance',
							                                       id: 'LIST'
						                                       },
						                                       ...result.ids.map(
							                                       (id) => ({
								                                       type: 'Attendance',
								                                       id
							                                       })),
					                                       ],
				                                       }),
			                         markAttendance:
				                         builder.mutation({
					                                          query: ({attendanceId, isPresent}) => ({
						                                          url: `attendance/${attendanceId}`,
						                                          method: 'PATCH',
						                                          // In a real app, we'd probably need to base this on
						                                          // user ID somehow so that a user can't do the same
						                                          // reaction more than once
						                                          body: {isPresent},
					                                          }),
					                                          async onQueryStarted (
						                                          {attendanceId, isPresent},
						                                          {dispatch, queryFulfilled},
					                                          ) {
						                                          // `updateQueryData` requires the endpoint name and
						                                          // cache key arguments, so it knows which piece of
						                                          // cache state to update
						                                          const patchResult = dispatch(
							                                          attendancesApiSlice.util.updateQueryData(
								                                          'getAttendances',
								                                          undefined,
								                                          (draft) => {
									                                          // The `draft` is Immer-wrapped and can
									                                          // be "mutated" like in createSlice
									                                          const attendance = draft.entities[attendanceId];
									                                          if (attendance) {
										                                          attendance.is_present = isPresent;
									                                          }
								                                          },
							                                          ),
						                                          );
						                                          try {
							                                          await queryFulfilled;
						                                          } catch {
							                                          patchResult.undo();
						                                          }
					                                          },
				                                          }),
			                         
			                         
		                         }),
	                         });

// Api hooks
export const {
	useGetAttendancesQuery,
	useGetAttendanceByLectureQuery,
	useGetAttendanceByStudentQuery,
	useMarkAttendanceMutation,
} = attendancesApiSlice;

// Selectors
export const selectAttendancesResult =
	attendancesApiSlice.endpoints.getAttendances.select();

const selectAttendancesData = createSelector(
	selectAttendancesResult,
	(subResult) => subResult.data,
);

// Get Selectors
export const {
	selectAll: selectAllAttendances,
	selectById: selectAttendanceById,
	selectIds: selectAttendanceIds,
} = attendancesAdapter.getSelectors(
	(state) => selectAttendancesData(state) ?? initialState,
);
