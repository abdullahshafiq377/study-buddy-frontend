import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

const subAdminsAdapter = createEntityAdapter({
	                                             sortComparer: (a, b) => a.name.localeCompare(b.name),
                                             });

const initialState = subAdminsAdapter.getInitialState();

export const subAdminsApiSlice = apiSlice.injectEndpoints({
	                                                          endpoints: (builder) => ({
		                                                          getSubAdmins: builder.query({
			                                                                                      query: () => '/sub-admins',
			                                                                                      keepUnusedDataFor: 900,
			                                                                                      transformResponse: (responseData) => {
				                                                                                      return subAdminsAdapter.setAll(
					                                                                                      initialState,
					                                                                                      responseData);
			                                                                                      },
			                                                                                      providesTags: (result,
			                                                                                                     error,
			                                                                                                     arg) => [
				                                                                                      {
					                                                                                      type: 'SubAdmin',
					                                                                                      id: 'LIST'
				                                                                                      },
				                                                                                      ...result.ids.map(
					                                                                                      (id) => ({
						                                                                                      type: 'SubAdmin',
						                                                                                      id
					                                                                                      })),
			                                                                                      ],
		                                                                                      }),
		                                                          getSubAdminById: builder.query({
			                                                                                         query: (id) => `/sub-admins/${id}`,
			                                                                                         keepUnusedDataFor: 900,
			                                                                                         transformResponse: (responseData) => {
				                                                                                         return subAdminsAdapter.setAll(
					                                                                                         initialState,
					                                                                                         responseData);
			                                                                                         },
			                                                                                         providesTags: (result,
			                                                                                                        error,
			                                                                                                        arg) => [
				                                                                                         {
					                                                                                         type: 'SubAdmin',
					                                                                                         id: 'LIST'
				                                                                                         },
				                                                                                         ...result.ids.map(
					                                                                                         (id) => ({
						                                                                                         type: 'SubAdmin',
						                                                                                         id
					                                                                                         })),
			                                                                                         ],
		                                                                                         }),
		                                                          addNewSubAdmin: builder.mutation({
			                                                                                           query: (initialSubAdmin) => ({
				                                                                                           url: '/sub-admins',
				                                                                                           method: 'POST',
				                                                                                           body: initialSubAdmin,
			                                                                                           }),
			                                                                                           invalidatesTags: [{
				                                                                                           type: 'SubAdmin',
				                                                                                           id: 'LIST'
			                                                                                           }],
		                                                                                           }),
		                                                          updateSubAdmin: builder.mutation({
			                                                                                           query: (initialSubAdmin) => ({
				                                                                                           url: `/sub-admins/${initialSubAdmin.get(
					                                                                                           'id')}`,
				                                                                                           method: 'PUT',
				                                                                                           body: initialSubAdmin,
			                                                                                           }),
			                                                                                           invalidatesTags: (result,
			                                                                                                             error,
			                                                                                                             arg) => [
				                                                                                           {
					                                                                                           type: 'SubAdmin',
					                                                                                           id: arg.id
				                                                                                           },
			                                                                                           ],
		                                                                                           }),
		                                                          deleteSubAdmin: builder.mutation({
			                                                                                           query: ({id}) => ({
				                                                                                           url: `/sub-admins/${id}`,
				                                                                                           method: 'DELETE',
				                                                                                           body: {id},
			                                                                                           }),
			                                                                                           invalidatesTags: (result,
			                                                                                                             error,
			                                                                                                             arg) => [
				                                                                                           {
					                                                                                           type: 'SubAdmin',
					                                                                                           id: arg.id
				                                                                                           },
			                                                                                           ],
		                                                                                           }),
	                                                          }),
                                                          });

// Api hooks
export const {
	useGetSubAdminsQuery,
	useGetSubAdminByIdQuery,
	useAddNewSubAdminMutation,
	useUpdateSubAdminMutation,
	useDeleteSubAdminMutation,
} = subAdminsApiSlice;

// Selectors
export const selectSubAdminsResult =
	subAdminsApiSlice.endpoints.getSubAdmins.select();

const selectSubAdminsData = createSelector(
	selectSubAdminsResult,
	(subResult) => subResult.data,
);

// Get Selectors
export const {
	selectAll: selectAllSubAdmins,
	selectById: selectSubAdminById,
	selectIds: selectSubAdminIds,
} = subAdminsAdapter.getSelectors(
	(state) => selectSubAdminsData(state) ?? initialState,
);
