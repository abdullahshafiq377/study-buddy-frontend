import {createEntityAdapter, createSelector} from '@reduxjs/toolkit';
import {apiSlice} from '../../app/api/apiSlice';

const postsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date_time.localeCompare(a.date_time),
});

const initialState = postsAdapter.getInitialState();

export const postsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: () => '/posts',
            keepUnusedDataFor: 900,
            transformResponse: (responseData) => {
                return postsAdapter.setAll(initialState, responseData);
            },
            providesTags: (result, error, arg) => [
                {type: 'Post', id: 'LIST'},
                ...result.ids.map((id) => ({type: 'Post', id})),
            ],
        }),
        getPostsByUser: builder.query({
            query: (userId) => `/posts/${userId}`,
            keepUnusedDataFor: 900,
            transformResponse: (responseData) => {
                return postsAdapter.setAll(initialState, responseData);
            },
            providesTags: (result, error, arg) => [
                {type: 'Post', id: 'LIST'},
                ...result.ids.map((id) => ({type: 'Post', id})),
            ],
        }),
        addNewPost: builder.mutation({
            query: (initialPost) => ({
                url: '/posts',
                method: 'POST',
                body: {...initialPost},
            }),
            invalidatesTags: [{type: 'Post', id: 'LIST'}],
        }),
        updatePost: builder.mutation({
            query: (initialPost) => ({
                url: `/posts/${initialPost.id}`,
                method: 'PUT',
                body: {...initialPost},
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'Post', id: arg.id},
            ],
        }),
        deletePost: builder.mutation({
            query: (id) => ({
                url: `/posts/${id}`,
                method: 'DELETE',
                body: {id},
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'Post', id: arg.id},
            ],
        }),
        getCommentsByPost: builder.query({
            query: (postId) => `/posts/comments/${postId}`,
            keepUnusedDataFor: 900,
            transformResponse: (responseData) => {
                return responseData;
            },
        }),
        addNewComment: builder.mutation({
            query: (initialComment) => ({
                url: `/posts/comments/${initialComment.postId}`,
                method: 'POST',
                body: {...initialComment},
            }),
            invalidatesTags: [{type: 'Post', id: 'LIST'}],
        }),
        deleteComment: builder.mutation({
            query: (id) => ({
                url: `/posts/comments/${id}`,
                method: 'DELETE',
                body: {id},
            }),
        }),
        addReaction: builder.mutation({
            query: ({ postId, reactions }) => ({
                url: `posts/${postId}`,
                method: 'PATCH',
                // In a real app, we'd probably need to base this on user ID somehow
                // so that a user can't do the same reaction more than once
                body: { reactions },
            }),
            async onQueryStarted(
                { postId, reactions },
                { dispatch, queryFulfilled },
            ) {
                // `updateQueryData` requires the endpoint name and cache key arguments,
                // so it knows which piece of cache state to update
                const patchResult = dispatch(
                    postsApiSlice.util.updateQueryData(
                        'getPosts',
                        undefined,
                        (draft) => {
                            // The `draft` is Immer-wrapped and can be "mutated" like in createSlice
                            const post = draft.entities[postId];
                            if (post) {
                                post.likes = reactions.likes;
                                post.dislikes = reactions.dislikes;
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

export const {
    useGetPostsQuery,
    useGetPostsByUserQuery,
    useGetCommentsByPostQuery,
    useAddNewPostMutation,
    useAddNewCommentMutation,
    useUpdatePostMutation,
    useDeletePostMutation,
    useDeleteCommentMutation,
    useAddReactionMutation,
} = postsApiSlice;



// Selectors
export const selectPostsResult =
    postsApiSlice.endpoints.getPosts.select();

const selectPostsData = createSelector(
    selectPostsResult,
    (subResult) => subResult.data,
);

// Get Selectors
export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds,
} = postsAdapter.getSelectors(
    (state) => selectPostsData(state) ?? initialState,
);


