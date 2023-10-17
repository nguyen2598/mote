import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import categories from '../../services/category';
import app from '../../services/app';

export const getCategories = createAsyncThunk('app/getCategories', async () => {
    try {
        const response = await categories.getCategoryApi();
        if (response?.data?.err === 0) {
            return response?.data;
        } else {
            return response?.data;
        }
    } catch (error) {
        return null;
    }
});

export const getPrices = createAsyncThunk('app/getPrices', async () => {
    try {
        const response = await app.getPriceApi();
        if (response?.data?.err === 0) {
            return response?.data;
        } else {
            return response?.data;
        }
    } catch (error) {
        return null;
    }
});

export const getAreas = createAsyncThunk('app/getAreas', async () => {
    try {
        const response = await app.getAreaApi();
        if (response?.data?.err === 0) {
            return response?.data;
        } else {
            return response?.data;
        }
    } catch (error) {
        return null;
    }
});

export const getProvinces = createAsyncThunk('app/getProvinces', async () => {
    try {
        const response = await app.getProvinceApi();
        if (response?.data?.err === 0) {
            return response?.data;
        } else {
            return response?.data;
        }
    } catch (error) {
        return null;
    }
});

const appSlice = createSlice({
    name: 'app',
    initialState: {
        categories: [],
        msg: '',
        prices: [],
        areas: [],
        provinces: [],
    },
    reducers: {
        // getCategories(state, action) {
        //     state.token = null;
        //     state.msg = '';
        //     state.isLoggedIn = false;
        // },
    },
    extraReducers: (builder) => {
        builder
            // getCategories
            .addCase(getCategories.pending, (state) => {
                // state.isLoggedIn = false;
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                if (action.payload?.err === 0) {
                    state.categories = action.payload.response || [];
                    state.msg = action.payload?.msg || '';
                } else {
                    state.msg = action.payload?.msg;
                }
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.categories = null;
            })
            .addCase(getPrices.pending, (state) => {
                // state.isLoggedIn = false;
            })
            .addCase(getPrices.fulfilled, (state, action) => {
                if (action.payload?.err === 0) {
                    state.prices = action.payload.response?.sort((a, b) => +a?.order - +b?.order) || [];
                    state.msg = action.payload?.msg || '';
                } else {
                    state.msg = action.payload?.msg;
                }
            })
            .addCase(getPrices.rejected, (state, action) => {
                state.prices = null;
            })
            .addCase(getAreas.pending, (state) => {
                // state.isLoggedIn = false;
            })
            .addCase(getAreas.fulfilled, (state, action) => {
                if (action.payload?.err === 0) {
                    state.areas = action.payload.response?.sort((a, b) => +a?.order - +b?.order) || [];
                    state.msg = action.payload?.msg || '';
                } else {
                    state.msg = action.payload?.msg;
                }
            })
            .addCase(getAreas.rejected, (state, action) => {
                state.areas = null;
            })

            .addCase(getProvinces.pending, (state) => {
                // state.isLoggedIn = false;
            })
            .addCase(getProvinces.fulfilled, (state, action) => {
                if (action.payload?.err === 0) {
                    state.provinces = action.payload.response || [];
                    state.msg = action.payload?.msg || '';
                } else {
                    state.msg = action.payload?.msg;
                }
            })
            .addCase(getProvinces.rejected, (state, action) => {
                state.provinces = null;
            });
    },
});

const { actions, reducer } = appSlice;
export const {} = actions;
export default reducer;
