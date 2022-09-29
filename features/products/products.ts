import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import axios from 'axios';

const initialState = {
  products: [],
  selectedProduct: null,
  categories: ['All'],
  selectedCategory: 'All',
  page: 1,
  pages: 1,
  searchTerm: '',
  isFilterOpen: false,
  order: 'desc',
  loading: false,
};

export const getProducts = createAsyncThunk(
  '/products/getProducts',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get('/products');
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue('error');
    }
  }
);

export const getCategories = createAsyncThunk(
  '/products/getCategories',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get('/products/categories');
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue('error');
    }
  }
);

export const searchProducts = createAsyncThunk(
  '/products/searchProducts',
  async (_, thunkAPI) => {
    try {
      // @ts-ignore
      const selectedCategory = thunkAPI.getState().products.selectedCategory;
      // @ts-ignore
      const searchTerm = thunkAPI.getState().products.searchTerm;
      // @ts-ignore
      const order = thunkAPI.getState().products.order;
      const { data } = await axios.get(
        `/products/search?category=${selectedCategory.toLowerCase()}&search=${searchTerm}&order=${order}`
      );
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue('error');
    }
  }
);

export const fetchMoreProducts = createAsyncThunk(
  '/products/fetchMoreProducts',
  async (_, thunkAPI) => {
    try {
      // @ts-ignore
      const selectedCategory = thunkAPI.getState().products.selectedCategory;
      // @ts-ignore
      const searchTerm = thunkAPI.getState().products.searchTerm;
      // @ts-ignore
      const order = thunkAPI.getState().products.order;
      // @ts-ignore
      const page = thunkAPI.getState().products.page;
      const { data } = await axios.get(
        `/products/search?category=${selectedCategory.toLowerCase()}&search=${searchTerm}&order=${order}&page=${page}`
      );
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue('error');
    }
  }
);

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setIsFilterOpen: (state, action) => {
      state.isFilterOpen = action.payload;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.page = 1;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.page = 1;
    },
    setOrder: (state, action) => {
      state.order = action.payload;
      state.products.sort((a, b) =>
        state.order === 'desc' ? b.price - a.price : a.price - b.price
      );
    },
    setPage: (state, action) => {
      state.page = Math.min(action.payload, state.pages);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.pages = action.payload.pages;
        state.loading = false;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = ['All', ...action.payload];
        state.loading = false;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.pages = action.payload.pages;
        state.loading = false;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchMoreProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMoreProducts.fulfilled, (state, action) => {
        state.products = [...state.products, ...action.payload.products];
        state.pages = action.payload.pages;
        state.loading = false;
      })
      .addCase(fetchMoreProducts.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const {
  setSelectedCategory,
  setIsFilterOpen,
  setSearchTerm,
  setOrder,
  setPage,
  setSelectedProduct,
} = productsSlice.actions;

export default productsSlice.reducer;
