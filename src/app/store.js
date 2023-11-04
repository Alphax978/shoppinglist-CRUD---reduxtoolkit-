import { configureStore } from '@reduxjs/toolkit';
import ProductReducer from '../features/Product/ProductSlice';
import CartReducer from '../features/Cart/CartsSlice';


;
export const store = configureStore({
  reducer: {
    products: ProductReducer,
    carts:CartReducer
  },
});
