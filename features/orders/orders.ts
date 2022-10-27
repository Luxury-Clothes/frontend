import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { IOrder } from '../../types';

interface IState {
  orders: IOrder[];
  loading: boolean;
  allOrders: IOrder[];
  page: number;
  pages: number;
  selectedOrder: IOrder | null;
  order: 'today' | 'week' | 'month' | 'all';
}

const initialState: IState = {
  orders: [],
  allOrders: [],
  page: 1,
  pages: 1,
  loading: true,
  selectedOrder: null,
  order: 'today',
};

export const getOrders = createAsyncThunk(
  'orders/getOrders',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get<IOrder[]>('/orders/');
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error?.response?.data?.errors);
    }
  }
);

export const getAllOrders = createAsyncThunk(
  'orders/getAllOrders',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(
        // @ts-ignore
        '/orders/all?created_at=' + thunkAPI.getState().orders.order
      );
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error?.response?.data?.errors);
    }
  }
);

export const fetchMoreOrders = createAsyncThunk(
  '/orders/fetchMoreOrders',
  async (_, thunkAPI) => {
    try {
      // @ts-ignore
      const page = thunkAPI.getState().orders.page;

      const { data } = await axios.get(
        `/orders/all?created_at=${
          // @ts-ignore
          thunkAPI.getState().orders.order
        }&page=${page}`
      );

      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue('error');
    }
  }
);

export const getOrder = createAsyncThunk(
  'orders/getOrder',
  async (id: string, thunkAPI) => {
    try {
      const { data } = await axios.get<IOrder>('/orders/' + id);
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error?.response?.data?.errors);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  'orders/updateOrderStatus',
  async (
    {
      id,
      status,
    }: {
      id: string;
      status: string;
    },
    thunkAPI
  ) => {
    try {
      const { data } = await axios.patch<IOrder>('/orders/' + id, {
        status,
      });
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error?.response?.data?.errors);
    }
  }
);

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (_, thunkAPI) => {
    try {
      // @ts-ignore
      const cart = thunkAPI.getState().cart;
      // @ts-ignore
      const user = thunkAPI.getState().auth.user;
      const { data } = await axios.post<IOrder>('/orders/', {
        email_address: user?.email,
        full_name: user?.username,
        address: cart?.street + ' ' + cart?.street_number,
        country: cart?.country,
        postal_code: cart?.postal_code,
        city: cart?.city,
        payment_method: 'Stripe',
        items_price: cart?.subtotal,
        shipping_price: 0,
        tax_price: 0,
        total_price: cart?.subtotal,
        products: cart?.cartItems.map((i) => ({
          id: i.id,
          quantity: i.quantity,
        })),
      });
      // console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error?.response?.data?.errors);
    }
  }
);

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setSelectedOrder: (state, action: PayloadAction<IOrder>) => {
      state.selectedOrder = action.payload;
    },
    setOrder: (
      state,
      action: PayloadAction<'today' | 'week' | 'month' | 'all'>
    ) => {
      state.order = action.payload;
    },
    setPage: (state, action) => {
      state.page = Math.min(action.payload, state.pages);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getOrders.fulfilled,
        (state, action: PayloadAction<IOrder[]>) => {
          state.orders = action.payload;
        }
      )
      .addCase(getOrder.fulfilled, (state, action: PayloadAction<IOrder>) => {
        state.selectedOrder = action.payload;
      })
      .addCase(
        createOrder.fulfilled,
        (state, action: PayloadAction<IOrder>) => {
          state.orders.unshift(action.payload);
        }
      )
      .addCase(
        updateOrderStatus.fulfilled,
        (state, action: PayloadAction<IOrder>) => {
          state.orders = state.orders.map((order) =>
            order.id === action.payload.id
              ? {
                  ...order,
                  status: action.payload.status,
                }
              : order
          );
        }
      )
      .addCase(getAllOrders.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.allOrders = action.payload.orders;
        state.pages = action.payload.pages;
        state.loading = false;
      })
      .addCase(getAllOrders.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchMoreOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMoreOrders.fulfilled, (state, action) => {
        state.allOrders = [...state.allOrders, ...action.payload.orders];
        state.pages = action.payload.pages;
        state.loading = false;
      })
      .addCase(fetchMoreOrders.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const { setSelectedOrder, setOrder, setPage } = ordersSlice.actions;

export default ordersSlice.reducer;
