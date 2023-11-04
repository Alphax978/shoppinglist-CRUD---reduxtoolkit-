import React, { useEffect } from 'react'
import "./Product.css"
import { useDispatch, useSelector } from 'react-redux'
import { fetchAsyncProduct } from './ProductSlice'
import { Asyncaddtocart } from '../Cart/CartsSlice'
import { HttpStatusCode } from 'axios'


const Product = () => {

    const product = useSelector(state => state.products.product)

    const dispatch = useDispatch()

 


    return (
        <div>
            <h2>Products Available : {product.length}</h2>
            {product.map(puc => (
                <div  className="card">
                    <img src={puc.thumbnail} alt="Denim Jeans" style={{ width:"100%"}} />
                    <h1>{puc.title}</h1>
                    <p className="price">${puc.price}</p>
                    <p>{puc.description}</p>
                    <p><button onClick={() => dispatch(Asyncaddtocart(puc))}>Add to Cart</button></p>
            </div>
            ))}
        </div>
    
  )
}

export default Product
