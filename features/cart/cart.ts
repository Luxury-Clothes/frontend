import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { ICartProduct, IProduct } from '../../types';


interface IState {
  cartItems: ICartProduct[];
  total: number;
  subtotal: number;
  tax: number;
  clientSecret: string;
  country: string;
  city: string;
  postal_code: number | string;
  street: string;
  street_number: number | string;
}

const initialState: IState = {
  cartItems: [],
  total: 0,
  subtotal: 0,
  tax: 0,
  clientSecret: '',
  country: 'Россия (Российская Федерация)',
  city: '',
  postal_code: '',
  street: '',
  street_number: '',
};

export const createPaymentIntent = createAsyncThunk(
  'cart/createPaymentIntent',
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

export const getCartItems = createAsyncThunk(
  'cart/getCartItems',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get<ICartProduct[]>('/cart/');
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error?.response?.data?.errors);
    }
  }
);

export const addProductToCart = createAsyncThunk(
  'cart/addProductToCart',
  async (product: IProduct, thunkAPI) => {
    try {
      const { data } = await axios.post<ICartProduct[]>('/cart/', {
        product,
      });
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error?.response?.data?.errors);
    }
  }
);

export const incrementProductInCart = createAsyncThunk(
  'cart/incrementProductInCart',
  async (product: IProduct, thunkAPI) => {
    try {
      const { data } = await axios.post<ICartProduct[]>(
        `/cart/${product.id}/increment`,
        {
          product,
        }
      );
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error?.response?.data?.errors);
    }
  }
);

export const decrementProductInCart = createAsyncThunk(
  'cart/decrementProductInCart',
  async (product: IProduct, thunkAPI) => {
    try {
      const { data } = await axios.post<ICartProduct[]>(
        `/cart/${product.id}/decrement`,
        {
          product,
        }
      );
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error?.response?.data?.errors);
    }
  }
);

export const clearProductsInCart = createAsyncThunk(
  'cart/clearProductsInCart',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.delete<ICartProduct[]>(`/cart/`);
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error?.response?.data?.errors);
    }
  }
);

export const removeProductInCart = createAsyncThunk(
  'cart/removeProductInCart',
  async (product: IProduct, thunkAPI) => {
    try {
      const { data } = await axios.delete<ICartProduct[]>(
        `/cart/` + product.id
      );
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
      // state.tax = state.subtotal / 50;
      state.total = state.subtotal + state.tax;
    },
    removeProduct: (state, action: PayloadAction<IProduct>) => {
      state.cartItems = state.cartItems.filter(
        (product) => product.id !== action.payload.id
      );
      state.subtotal = state.cartItems.reduce((total, product) => {
        return (total = total + product.price * product.quantity);
      }, 0);
      // state.tax = state.subtotal / 50;
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
      // state.tax = state.subtotal / 50;
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
      // state.tax = state.subtotal / 50;
      state.total = state.subtotal + state.tax;
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.subtotal = 0;
      state.tax = 0;
      state.total = 0;
      state.clientSecret = '';
    },
    setStreetNumber: (state, action: PayloadAction<string>) => {
      state.street_number = action.payload;
    },
    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    setPostalCode: (state, action: PayloadAction<number>) => {
      state.postal_code = action.payload;
    },
    setStreet: (state, action: PayloadAction<string>) => {
      state.street = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(createPaymentIntent.pending, (state) => {})
      .addCase(createPaymentIntent.fulfilled, (state, action) => {
        state.clientSecret = action.payload.clientSecret;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.cartItems = action.payload.map((product: ICartProduct) => ({
          ...product,
          quantity: +product.quantity,
        }));
        state.subtotal = state.cartItems.reduce((total, product) => {
          return (total = total + product.price * product.quantity);
        }, 0);
        // state.tax = state.subtotal / 50;
        state.total = state.subtotal + state.tax;
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
  setCity,
  setStreet,
  setPostalCode,
  setStreetNumber,
} = cartSlice.actions;

export default cartSlice.reducer;
