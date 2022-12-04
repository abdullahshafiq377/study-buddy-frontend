import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

const programsAdapter = createEntityAdapter({
	sortComparer: (a, b) => a.title.localeCompare(b.title),
});

const initialState = programsAdapter.getInitialState();

export const programsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getPrograms: builder.query({
			query: () => '/programs',
			keepUnusedDataFor: 900,
			transformResponse: (responseData) => {
				return programsAdapter.setAll(initialState, responseData);
			},
			providesTags: (result, error, arg) => [
				{ type: 'Program', id: 'LIST' },
				...result.ids.map((id) => ({ type: 'Program', id })),
			],
		}),
		addNewProgram: builder.mutation({
			query: (initialProgram) => ({
				url: '/programs',
				method: 'POST',
				body: { ...initialProgram },
			}),
			invalidatesTags: [{ type: 'Program', id: 'LIST' }],
		}),
		updateProgram: builder.mutation({
			query: (initialProgram) => ({
				url: `/programs/${initialProgram.id}`,
				method: 'PUT',
				body: { ...initialProgram },
			}),
			invalidatesTags: (result, error, arg) => [
				{ type: 'Program', id: arg.id },
			],
		}),
		deleteProgram: builder.mutation({
			query: ({ id }) => ({
				url: `/programs/${id}`,
				method: 'DELETE',
				body: { id },
			}),
			invalidatesTags: (result, error, arg) => [
				{ type: 'Program', id: arg.id },
			],
		}),
	}),
});

// Api hooks
export const {
	useGetProgramsQuery,
	useAddNewProgramMutation,
	useUpdateProgramMutation,
	useDeleteProgramMutation,
} = programsApiSlice;

// Selectors
export const selectProgramsResult =
	programsApiSlice.endpoints.getPrograms.select();

const selectProgramsData = createSelector(
	selectProgramsResult,
	(subResult) => subResult.data,
);

// Get Selectors
export const {
	selectAll: selectAllPrograms,
	selectById: selectProgramById,
	selectIds: selectProgramIds,
} = programsAdapter.getSelectors(
	(state) => selectProgramsData(state) ?? initialState,
);
