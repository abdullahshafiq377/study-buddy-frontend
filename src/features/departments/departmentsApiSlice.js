import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

const departmentsAdapter = createEntityAdapter({
	                                               sortComparer: (a, b) => a.title.localeCompare(b.title),
                                               });

const initialState = departmentsAdapter.getInitialState();

export const departmentsApiSlice = apiSlice.injectEndpoints({
	                                                            endpoints: (builder) => ({
		                                                            getDepartments: builder.query({
			                                                                                          query: () => '/departments',
			                                                                                          keepUnusedDataFor: 900,
			                                                                                          transformResponse: (responseData) => {
				                                                                                          return departmentsAdapter.setAll(
					                                                                                          initialState,
					                                                                                          responseData);
			                                                                                          },
			                                                                                          providesTags: (result,
			                                                                                                         error,
			                                                                                                         arg) => [
				                                                                                          {
					                                                                                          type: 'Department',
					                                                                                          id: 'LIST'
				                                                                                          },
				                                                                                          ...result.ids.map(
					                                                                                          (id) => ({
						                                                                                          type: 'Department',
						                                                                                          id
					                                                                                          })),
			                                                                                          ],
		                                                                                          }),
		                                                            addNewDepartment: builder.mutation({
			                                                                                               query: (initialDepartment) => ({
				                                                                                               url: '/departments',
				                                                                                               method: 'POST',
				                                                                                               body: {...initialDepartment},
			                                                                                               }),
			                                                                                               invalidatesTags: [{
				                                                                                               type: 'Department',
				                                                                                               id: 'LIST'
			                                                                                               }],
		                                                                                               }),
		                                                            updateDepartment: builder.mutation({
			                                                                                               query: (initialDepartment) => ({
				                                                                                               url: `/departments/${initialDepartment.id}`,
				                                                                                               method: 'PUT',
				                                                                                               body: {...initialDepartment},
			                                                                                               }),
			                                                                                               invalidatesTags: (result,
			                                                                                                                 error,
			                                                                                                                 arg) => [
				                                                                                               {
					                                                                                               type: 'Department',
					                                                                                               id: arg.id
				                                                                                               },
			                                                                                               ],
		                                                                                               }),
		                                                            deleteDepartment: builder.mutation({
			                                                                                               query: ({id}) => ({
				                                                                                               url: `/departments/${id}`,
				                                                                                               method: 'DELETE',
				                                                                                               body: {id},
			                                                                                               }),
			                                                                                               invalidatesTags: (result,
			                                                                                                                 error,
			                                                                                                                 arg) => [
				                                                                                               {
					                                                                                               type: 'Department',
					                                                                                               id: arg.id
				                                                                                               },
			                                                                                               ],
		                                                                                               }),
	                                                            }),
                                                            });

// Api hooks
export const {
	useGetDepartmentsQuery,
	useAddNewDepartmentMutation,
	useUpdateDepartmentMutation,
	useDeleteDepartmentMutation,
} = departmentsApiSlice;

// Selectors
export const selectDepartmentsResult =
	departmentsApiSlice.endpoints.getDepartments.select();

const selectDepartmentsData = createSelector(
	selectDepartmentsResult,
	(subResult) => subResult.data,
);

// Get Selectors
export const {
	selectAll: selectAllDepartments,
	selectById: selectDepartmentById,
	selectIds: selectDepartmentIds,
} = departmentsAdapter.getSelectors(
	(state) => selectDepartmentsData(state) ?? initialState,
);
