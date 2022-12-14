import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import authReducer from '../features/auth/auth';
import productsReducer from '../features/products/products';
import cartReducer from '../features/cart/cart';
import ordersReducer from '../features/orders/orders';
import messagesReducer from '../features/messages/messages';
import adminReducer from '../features/admin/admin';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    cart: cartReducer,
    orders: ordersReducer,
    messages: messagesReducer,
    admin: adminReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
