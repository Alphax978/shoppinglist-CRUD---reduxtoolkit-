import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Product from './features/Product/Product';
import Cart from './features/Cart/Cart';
import { AsyncfetchCart } from './features/Cart/CartsSlice';
import { fetchAsyncProduct } from './features/Product/ProductSlice'
import { useDispatch, useSelector } from 'react-redux';
function App() {


  const [show, setShow] = useState(false)
  const cart = useSelector(state => state.carts.cart)
  const dispatch = useDispatch()

  const product = useSelector(state => state.products.product)


  useEffect(() => {
    dispatch(AsyncfetchCart())
    dispatch(fetchAsyncProduct())
  },[])
  

  
  return (
    <div className="App">
      <button  onClick={() => setShow(!show)}>{show ? `View Product  [${product.length}]` : `View Cart  [${cart.length}]`} </button>
      <br/>
      <br/>
      {show ? <Cart/> : <Product/>}
  
    </div>
  );
}

export default App;
