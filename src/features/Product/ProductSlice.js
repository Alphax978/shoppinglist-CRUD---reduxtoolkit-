import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchProduct } from './ProductApi';


const initialState = {
  product: [],
  status: 'idle',
};


// typically used to make async requests.
export const fetchAsyncProduct = createAsyncThunk(
  'productSlice/fetchProducts',
  async () => {
    const {data} = await fetchProduct();
      return data;
  }
);

export const ProductSlice = createSlice({
  name: 'ProductSlice',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
     
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
   
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAsyncProduct.fulfilled, (state, action) => {
        state.status = 'idle';
          state.product = action.payload;
      });
  },
});

export const { increment, decrement, incrementByAmount } = ProductSlice.actions;




export default ProductSlice.reducer;