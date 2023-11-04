import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addItem, deleteItem, readItem, updateItem } from './CartApi';


const initialState = {
  cart: [],
  statusall: 'idle',
};


// typically used to make async requests.
export const Asyncaddtocart = createAsyncThunk(
  'CartSlice/AddProducts',
  async (item) => {
    const { id, title, description, price, thumbnail } = item;
    const response = await addItem({ id, title, description, price, thumbnail, quantity: 1 });
      return response.data;
    }
  
);

export const AsyncfetchCart = createAsyncThunk(
  'CartSlice/fetchItems',
  async () => {
    const response = await readItem();
      return response.data;
  }
);
export const AsyncDeleteItem = createAsyncThunk(
  'CartSlice/deleteItems',
  async (id) => {
    const response = await deleteItem(id);
      return response.data;
  }
);
export const AsyncUpdate = createAsyncThunk(
  'CartSlice/updateItems',
  async ({id, newitem}) => {
    const response = await updateItem(id, newitem);
      return response.data;
  }
);



const CartsSlice = createSlice({
  name: 'CartSlice',
  initialState,
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
      .addCase(AsyncfetchCart.pending, (state) => {
        state.statusall = 'loading';
      })
      .addCase(AsyncfetchCart.fulfilled, (state, action) => {
        state.statusall = 'idle';
        state.cart = action.payload
      })
      .addCase(Asyncaddtocart.fulfilled, (state, action) => {
        state.statusall = 'idle';
        state.cart.push(action.payload)
        alert(`${action.payload.title} has been added to the cart`)
      })
      .addCase(Asyncaddtocart.rejected, (state, action) => {
        state.statusall = 'error';
        alert(`This Item already exists in your cart`)
      })
      .addCase(AsyncDeleteItem.fulfilled, (state, action) => {
        state.statusall = 'idle';
        const cartindex = state.cart.findIndex(carts => carts.id === action.payload)
        state.cart.splice(cartindex,1)
      })
      .addCase(AsyncDeleteItem.rejected, (state, action) => {
        state.statusall = 'error';
        alert("An error occured")
        
      })
      .addCase(AsyncUpdate.fulfilled, (state, action) => {
        state.statusall = 'error';
        const cartindex = state.cart.findIndex(carts => carts.id === action.payload.id)
        state.cart.splice(cartindex, 1, action.payload)
      })
      .addCase(AsyncUpdate.rejected, (state, action) => {
        state.statusall = 'error';
        alert("An error occured")
       
      });
  },
});

export const { increment, decrement, incrementByAmount } = CartsSlice.actions;




export default CartsSlice.reducer;