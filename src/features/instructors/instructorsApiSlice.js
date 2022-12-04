import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

const instructorsAdapter = createEntityAdapter({
	sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const initialState = instructorsAdapter.getInitialState();

export const instructorsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getInstructors: builder.query({
			query: () => '/instructors',
			keepUnusedDataFor: 900,
			transformResponse: (responseData) => {
				return instructorsAdapter.setAll(initialState, responseData);
			},
			providesTags: (result, error, arg) => [
				{ type: 'Instructor', id: 'LIST' },
				...result.ids.map((id) => ({ type: 'Instructor', id })),
			],
		}),
		addNewInstructor: builder.mutation({
			query: (initialInstructor) => ({
				url: '/instructors',
				method: 'POST',
				body: { ...initialInstructor },
			}),
			invalidatesTags: [{ type: 'Instructor', id: 'LIST' }],
		}),
		updateInstructor: builder.mutation({
			query: (initialInstructor) => ({
				url: `/instructors/${initialInstructor.id}`,
				method: 'PUT',
				body: { ...initialInstructor },
			}),
			invalidatesTags: (result, error, arg) => [
				{ type: 'Instructor', id: arg.id },
			],
		}),
		deleteInstructor: builder.mutation({
			query: ({ id }) => ({
				url: `/instructors/${id}`,
				method: 'DELETE',
				body: { id },
			}),
			invalidatesTags: (result, error, arg) => [
				{ type: 'Instructor', id: arg.id },
			],
		}),
	}),
});

// Api hooks
export const {
	useGetInstructorsQuery,
	useAddNewInstructorMutation,
	useUpdateInstructorMutation,
	useDeleteInstructorMutation,
} = instructorsApiSlice;

// Selectors
export const selectInstructorsResult =
	instructorsApiSlice.endpoints.getInstructors.select();

const selectInstructorsData = createSelector(
	selectInstructorsResult,
	(subResult) => subResult.data,
);

// Get Selectors
export const {
	selectAll: selectAllInstructors,
	selectById: selectInstructorById,
	selectIds: selectInstructorIds,
} = instructorsAdapter.getSelectors(
	(state) => selectInstructorsData(state) ?? initialState,
);
