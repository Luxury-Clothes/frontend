import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { IUser } from '../../interfaces';

interface IState {
  user: IUser | null;
  loading: boolean;
  initialRouteName: 'Home';
  errors: any;
}

const initialState: IState = {
  user: null,
  loading: false,
  initialRouteName: 'Home',
  errors: {
    username: null,
    email: null,
    password: null,
    confirmPassword: null,
  },
};

export const login = createAsyncThunk(
  'auth/login',
  async (
    formData: {
      email: string;
      password: string;
    },
    thunkAPI
  ) => {
    try {
      const { data } = await axios.post('/auth/login', formData);
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error?.response?.data?.errors);
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (
    formData: {
      username: string;
      email: string;
      password: string;
      confirmPassword: string;
    },
    thunkAPI
  ) => {
    try {
      const { data } = await axios.post('/auth/register', formData);
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error?.response?.data?.errors);
    }
  }
);

export const logout = createAsyncThunk('/auth/logout', async (_, thunkAPI) => {
  try {
    await axios.get('/auth/logout');
    return;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error?.response?.data?.errors);
  }
});

export const init = createAsyncThunk('/auth/init', async (_, thunkAPI) => {
  try {
    const { data } = await axios.get('/auth/me');
    return data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue('error');
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetErrors: (state) => {
      state.errors = {
        username: null,
        email: null,
        password: null,
        confirmPassword: null,
      };
    },
    resetError: (state, action) => {
      state.errors[action.payload.input] = action.payload.error;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.errors = {
          username: null,
          email: null,
          password: null,
          confirmPassword: null,
        };
      })
      .addCase(login.rejected, (state, action: any) => {
        state.errors = { ...state.errors, ...action.payload };
        state.loading = false;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.errors = {
          username: null,
          email: null,
          password: null,
          confirmPassword: null,
        };
      })
      .addCase(register.rejected, (state, action: any) => {
        state.errors = { ...state.errors, ...action.payload };
        state.loading = false;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.user = null;
        state.loading = false;
        state.errors = {
          username: null,
          email: null,
          password: null,
          confirmPassword: null,
        };
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(init.pending, (state) => {
        state.loading = true;
      })
      .addCase(init.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.initialRouteName = 'Home';
        state.errors = {
          username: null,
          email: null,
          password: null,
          confirmPassword: null,
        };
      })
      .addCase(init.rejected, (state, action) => {
        state.loading = false;
        state.initialRouteName = 'Home';
      });
  },
});

export const { resetErrors, resetError } = authSlice.actions;

export default authSlice.reducer;
