import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import auth from '../../services/auth';
export const Register = createAsyncThunk('user/Register', async (data) => {
    try {
        const response = await auth.register(data);
        if (response?.data?.err === 0) {
            return response?.data;
        } else {
            return response?.data;
        }
    } catch (error) {
        return null;
    }
});

export const LoginApi = createAsyncThunk('user/Login', async (data) => {
    try {
        const response = await auth.login(data);
        if (response?.data?.err === 0) {
            return response?.data;
        } else {
            return response?.data;
        }
    } catch (error) {
        return null;
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        token: null,
        msg: '',
    },
    reducers: {
        logout(state, action) {
            state.token = null;
            state.msg = '';
            state.isLoggedIn = false;
        },
    },
    extraReducers: (builder) => {
        builder
            // register
            .addCase(Register.pending, (state) => {
                state.isLoggedIn = false;
            })
            .addCase(Register.fulfilled, (state, action) => {
                if (action.payload.err === 0) {
                    state.isLoggedIn = true;
                    state.token = action.payload.token;
                } else {
                    state.isLoggedIn = false;
                    state.msg = action.payload.msg;
                    state.token = null;
                }
            })
            .addCase(Register.rejected, (state, action) => {
                state.isLoggedIn = false;
                state.token = action.payload;
            })

            // login
            .addCase(LoginApi.pending, (state) => {
                state.isLoggedIn = false;
            })
            .addCase(LoginApi.fulfilled, (state, action) => {
                if (action?.payload?.err === 0) {
                    state.isLoggedIn = true;
                    state.token = action.payload.token;
                    state.msg = '';
                } else {
                    state.isLoggedIn = false;
                    state.msg = action.payload?.msg;
                    state.token = null;
                }
            })
            .addCase(LoginApi.rejected, (state, action) => {
                state.isLoggedIn = false;
                state.token = action.payload;
            });
    },
});

const { actions, reducer } = authSlice;
export const { logout } = actions;
export default reducer;
