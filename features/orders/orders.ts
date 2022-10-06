import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { IOrder } from '../../types';

interface IState {
  orders: IOrder[];
}

const initialState: IState = {
  orders: [],
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
        shipping_price: 500,
        tax_price: cart?.subtotal * 0.02,
        total_price: cart?.subtotal + 500 + cart?.subtotal / 50,
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getOrders.fulfilled,
        (state, action: PayloadAction<IOrder[]>) => {
          state.orders = action.payload;
        }
      )
      .addCase(
        createOrder.fulfilled,
        (state, action: PayloadAction<IOrder>) => {
          state.orders.push(action.payload);
        }
      );
  },
});

export default ordersSlice.reducer;
