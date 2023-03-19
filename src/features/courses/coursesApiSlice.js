import {createEntityAdapter, createSelector} from '@reduxjs/toolkit';
import {apiSlice} from '../../app/api/apiSlice';

const coursesAdapter = createEntityAdapter({
    sortComparer: (a, b) => a.title.localeCompare(b.title),
});

const initialState = coursesAdapter.getInitialState();

export const coursesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCourses: builder.query({
            query: () => '/courses',
            keepUnusedDataFor: 900,
            transformResponse: (responseData) => {
                return coursesAdapter.setAll(initialState, responseData);
            },
            providesTags: (result, error, arg) => [
                {type: 'Course', id: 'LIST'},
                ...result.ids.map((id) => ({type: 'Course', id})),
            ],
        }),
        getCoursesByDepartment: builder.query({
            query: (deptId) => `/courses/by-department/${deptId}`,
            keepUnusedDataFor: 900,
            transformResponse: (responseData) => {
                return coursesAdapter.setAll(initialState, responseData);
            },
            providesTags: (result, error, arg) => [
                {type: 'Course', id: 'LIST'},
                ...result.ids.map((id) => ({type: 'Course', id})),
            ],
        }),
        addNewCourse: builder.mutation({
            query: (initialCourse) => ({
                url: '/courses',
                method: 'POST',
                body: {...initialCourse},
            }),
            invalidatesTags: [{type: 'Course', id: 'LIST'}],
        }),
        updateCourse: builder.mutation({
            query: (initialCourse) => ({
                url: `/courses/${initialCourse.id}`,
                method: 'PUT',
                body: {...initialCourse},
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'Course', id: arg.id},
            ],
        }),
        deleteCourse: builder.mutation({
            query: ({id}) => ({
                url: `/courses/${id}`,
                method: 'DELETE',
                body: {id},
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'Course', id: arg.id},
            ],
        }),
    }),
});

// Api hooks
export const {
    useGetCoursesQuery,
    useGetCoursesByDepartmentQuery,
    useAddNewCourseMutation,
    useUpdateCourseMutation,
    useDeleteCourseMutation,
} = coursesApiSlice;

// Selectors
export const selectCoursesResult =
    coursesApiSlice.endpoints.getCourses.select();

const selectCoursesData = createSelector(
    selectCoursesResult,
    (subResult) => subResult.data,
);

// Get Selectors
export const {
    selectAll: selectAllCourses,
    selectById: selectCourseById,
    selectIds: selectCourseIds,
} = coursesAdapter.getSelectors(
    (state) => selectCoursesData(state) ?? initialState,
);
