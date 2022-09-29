import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { IProduct } from '../../interfaces';

interface ICartProduct extends IProduct {
  quantity: number;
}

interface IState {
  cartItems: ICartProduct[];
  total: number;
  subtotal: number;
  tax: number;
  clientSecret: string;
}

const initialState: IState = {
  cartItems: [],
  total: 0,
  subtotal: 0,
  tax: 0,
  clientSecret: '',
};

export const createPaymentIntent = createAsyncThunk(
  'auth/createPaymentIntent',
  async (amount: Number, thunkAPI) => {
    try {
      const { data } = await axios.post('/payment/create-payment-intent', {
        amount,
        currency: 'rub',
      });
      // console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error?.response?.data?.errors);
    }
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<IProduct>) => {
      if (state.cartItems.find((item) => item.id === action.payload.id)) {
        state.cartItems = state.cartItems.map((item) => {
          return item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item;
        });
      } else {
        state.cartItems.push({
          ...action.payload,
          quantity: 1,
        });
      }
      state.subtotal = state.cartItems.reduce((total, product) => {
        return (total = total + product.price * product.quantity);
      }, 0);
      state.tax = state.subtotal / 50;
      state.total = state.subtotal + state.tax;
    },
    removeProduct: (state, action: PayloadAction<IProduct>) => {
      state.cartItems = state.cartItems.filter(
        (product) => product.id !== action.payload.id
      );
      state.subtotal = state.cartItems.reduce((total, product) => {
        return (total = total + product.price * product.quantity);
      }, 0);
      state.tax = state.subtotal / 50;
      state.total = state.subtotal + state.tax;
    },
    incrementProduct: (state, action: PayloadAction<IProduct>) => {
      state.cartItems = state.cartItems.map((item) => {
        return item.id === action.payload.id
          ? { ...item, quantity: item.quantity + 1 }
          : item;
      });
      state.subtotal = state.cartItems.reduce((total, product) => {
        return (total = total + product.price * product.quantity);
      }, 0);
      state.tax = state.subtotal / 50;
      state.total = state.subtotal + state.tax;
    },
    decrementProduct: (state, action: PayloadAction<IProduct>) => {
      state.cartItems = state.cartItems.map((item) => {
        return item.id === action.payload.id
          ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
          : item;
      });
      state.subtotal = state.cartItems.reduce((total, product) => {
        return (total = total + product.price * product.quantity);
      }, 0);
      state.tax = state.subtotal / 50;
      state.total = state.subtotal + state.tax;
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.subtotal = 0;
      state.tax = 0;
      state.total = 0;
      state.clientSecret = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(createPaymentIntent.pending, (state) => {})
      .addCase(createPaymentIntent.fulfilled, (state, action) => {
        state.clientSecret = action.payload.clientSecret;
      });
    // .addCase(createPaymentIntent.rejected, (state, action: any) => {});
  },
});

export const {
  addProduct,
  removeProduct,
  incrementProduct,
  decrementProduct,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
