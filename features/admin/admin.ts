import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import axios from 'axios';

import { IUser } from '../../types';

const initialState = {
  users: [],
  searchTerm: '',
  page: 1,
  pages: 1,
  loading: false,
  newUsers: 0,
  oldUsers: 1,
  newOrders: 0,
  oldOrders: 1,
  newMessages: 0,
  oldMessages: 1,
  totalEarnings: 0,
  categoriesStats: [],
  monthlyEarnings: [],
};

export const getStats = createAsyncThunk(
  '/admin/stats',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get('/products/stats');
      // console.log(data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue('error');
    }
  }
);

export const searchUsers = createAsyncThunk(
  '/admin/searchUsers',
  async (_, thunkAPI) => {
    try {
      // @ts-ignore
      const searchTerm = thunkAPI.getState().admin.searchTerm;
      // @ts-ignore
      const page = thunkAPI.getState().admin.page;
      const { data } = await axios.get(
        `/users/search?search=${searchTerm}&page=${page}&pageSize=10`
      );

      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue('error');
    }
  }
);

export const fetchMoreUsers = createAsyncThunk(
  '/admin/fetchMoreUsers',
  async (_, thunkAPI) => {
    try {
      // @ts-ignore
      const searchTerm = thunkAPI.getState().admin.searchTerm;
      // @ts-ignore
      const page = thunkAPI.getState().admin.page;
      const { data } = await axios.get(
        `/users/search?search=${searchTerm}&page=${page}&pageSize=10`
      );
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue('error');
    }
  }
);

export const updateStatus = createAsyncThunk(
  '/admin/updateStatus',
  async (
    {
      id,
      isAdmin,
    }: {
      id: string;
      isAdmin: boolean;
    },
    thunkAPI
  ) => {
    try {
      const { data } = await axios.patch(`/users/${id}`, {
        isAdmin,
      });

      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue('error');
    }
  }
);

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.page = 1;
    },
    setPage: (state, action) => {
      state.page = Math.min(action.payload, state.pages);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.users = action.payload.users;
        state.pages = action.payload.pages;
        state.loading = false;
      })
      .addCase(searchUsers.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getStats.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getStats.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getStats.fulfilled, (state, action) => {
        state.loading = false;
        state.newUsers = +action.payload.users.newUsers.count;
        state.newOrders = +action.payload.orders.newOrders.count;
        state.newMessages = +action.payload.messages.newMessages.count;
        state.oldUsers =
          +action.payload.users.oldUsers.count === 0
            ? 1
            : +action.payload.users.oldUsers.count;
        state.oldOrders =
          +action.payload.orders.oldOrders.count === 0
            ? 1
            : +action.payload.orders.oldOrders.count;
        state.oldMessages =
          +action.payload.messages.oldMessages.count === 0
            ? 1
            : +action.payload.messages.oldMessages.count;

        state.totalEarnings = action.payload.totalEarnings.earnings;
        state.categoriesStats = action.payload.categories;
        state.monthlyEarnings = action.payload.monthlyEarnings;
      })
      .addCase(fetchMoreUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMoreUsers.fulfilled, (state, action) => {
        state.users = [...state.users, ...action.payload.users];
        state.pages = action.payload.pages;
        state.loading = false;
      })
      .addCase(fetchMoreUsers.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(updateStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        updateStatus.fulfilled,
        (state, action: PayloadAction<IUser>) => {
          state.users = state.users.map((user) => {
            return user.id === action.payload.id ? action.payload : user;
          });
          state.loading = false;
        }
      )
      .addCase(updateStatus.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const { setSearchTerm, setPage } = adminSlice.actions;

export default adminSlice.reducer;
