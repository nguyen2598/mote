import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import user from '../../services/user';
export const getCurrent = createAsyncThunk('post/getCurrent', async () => {
    try {
        const response = await user.getApiCurrent();
        if (response?.data?.err === 0) {
            return response?.data;
        } else {
            return response?.data;
        }
    } catch (error) {
        return null;
    }
});
const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentData: {},
    },
    reducers: {
        getLogout: (state, action) => {
            state.currentData = {};
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCurrent.pending, (state) => {
                // state.isLoggedIn = false;
            })
            .addCase(getCurrent.fulfilled, (state, action) => {
                if (action.payload?.err === 0) {
                    state.currentData = action.payload.response || [];
                    // state.msg = action.payload?.msg || '';
                } else {
                    state.currentData = null;
                }
            })
            .addCase(getCurrent.rejected, (state, action) => {
                state.currentData = null;
            });
    },
});

const { actions, reducer } = userSlice;
export const { getLogout } = actions;
export default reducer;
