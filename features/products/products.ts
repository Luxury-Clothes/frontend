import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from 'axios';

import { IProduct } from '../../types';

const initialState = {
  products: [],
  favourites: [],
  filteredFavourites: [],
  selectedProduct: null,
  categories: ['All'],
  selectedCategory: 'All',
  page: 1,
  pages: 1,
  searchTerm: '',
  favouritesSearchTerm: '',
  isFilterOpen: false,
  order: 'desc',
  loading: false,
};

export const getProducts = createAsyncThunk(
  '/products/getProducts',
  async (_, thunkAPI) => {
    try {
      // console.log('get products');
      const { data } = await axios.get('/products');
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue('error');
    }
  }
);

export const getFavourites = createAsyncThunk(
  '/products/getFavourites',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get('/products/favourites');
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue('error');
    }
  }
);

export const toggleFavourite = createAsyncThunk(
  '/products/toggleFavourite',
  async (product: IProduct, thunkAPI) => {
    try {
      await axios.post('/products/favourites/' + product.id);
      return product;
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
      // console.log('search products');
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
      // console.log('fetch more products');
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
    setFavouritesSearchTerm: (state, action) => {
      state.favouritesSearchTerm = action.payload;
      state.filteredFavourites = state.favourites.filter((p) => {
        return p.title
          .toLowerCase()
          .includes(state.favouritesSearchTerm.toLowerCase());
      });
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
      })
      .addCase(getFavourites.fulfilled, (state, action) => {
        state.favourites = action.payload;
        state.filteredFavourites = action.payload;
      })
      .addCase(toggleFavourite.fulfilled, (state, action) => {
        if (state.favourites.find((p) => p.id === action.payload.id)) {
          state.favourites = state.favourites.filter(
            (p) => p.id !== action.payload.id
          );
          state.filteredFavourites = state.favourites.filter(
            (p) => p.id !== action.payload.id
          );
        } else {
          state.favourites.push(action.payload);
          state.filteredFavourites.push(action.payload);
        }
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
  setFavouritesSearchTerm,
} = productsSlice.actions;

export default productsSlice.reducer;
