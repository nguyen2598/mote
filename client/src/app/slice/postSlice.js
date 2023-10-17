import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import post from '../../services/post';
export const getPosts = createAsyncThunk('post/getPosts', async () => {
    try {
        const response = await post.getPostsApi();
        if (response?.data?.err === 0) {
            return response?.data;
        } else {
            return response?.data;
        }
    } catch (error) {
        return null;
    }
});

export const getPostsLimit = createAsyncThunk('post/getPostsLimit', async (query) => {
    try {
        const response = await post.getPostsLimitApi(query);
        if (response?.data?.err === 0) {
            return response?.data;
        } else {
            return response?.data;
        }
    } catch (error) {
        return null;
    }
});

export const getNewPosts = createAsyncThunk('post/getNewPosts', async () => {
    try {
        const response = await post.getNewPostsApi();
        if (response?.data?.err === 0) {
            return response?.data;
        } else {
            return response?.data;
        }
    } catch (error) {
        return null;
    }
});

const postSlice = createSlice({
    name: 'post',
    initialState: {
        posts: [],
        msg: '',
        count: 0,
        newPosts: [],
    },
    reducers: {
        // getPosts(state, action) {
        //     state.token = null;
        //     state.msg = '';
        //     state.isLoggedIn = false;
        // },
    },
    extraReducers: (builder) => {
        builder
            // getPosts
            .addCase(getPosts.pending, (state) => {
                // state.isLoggedIn = false;
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                if (action.payload?.err === 0) {
                    state.posts = action.payload.response || [];
                    state.msg = action.payload?.msg || '';
                } else {
                    state.msg = action.payload?.msg;
                }
            })
            .addCase(getPosts.rejected, (state, action) => {
                state.posts = null;
            })
            .addCase(getPostsLimit.pending, (state) => {
                // state.isLoggedIn = false;
            })
            .addCase(getPostsLimit.fulfilled, (state, action) => {
                if (action.payload?.err === 0) {
                    state.posts = action.payload.response?.rows || [];
                    state.msg = action.payload?.msg || '';
                    state.count = action.payload?.response?.count || 0;
                } else {
                    state.msg = action.payload?.msg;
                }
            })
            .addCase(getPostsLimit.rejected, (state, action) => {
                state.posts = null;
            })

            .addCase(getNewPosts.pending, (state) => {
                // state.isLoggedIn = false;
            })
            .addCase(getNewPosts.fulfilled, (state, action) => {
                if (action.payload?.err === 0) {
                    state.newPosts = action.payload.response || [];
                    state.msg = action.payload?.msg || '';
                } else {
                    state.msg = action.payload?.msg;
                }
            })
            .addCase(getNewPosts.rejected, (state, action) => {
                state.newPosts = null;
            });
    },
});

const { actions, reducer } = postSlice;
export const {} = actions;
export default reducer;
