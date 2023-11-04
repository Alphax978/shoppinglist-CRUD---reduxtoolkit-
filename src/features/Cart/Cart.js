import { useDispatch, useSelector } from 'react-redux';
import './Cart.css';
import { AsyncDeleteItem, AsyncUpdate } from './CartsSlice';


const Cart = () => {

    const cart = useSelector(state => state.carts.cart)
    const dispatch = useDispatch()

    const handleChange = (e, id) => {
        dispatch(AsyncUpdate({id, newitem:{quantity:+e.target.value}}))

    }
   


    return (
        <div>
            {cart.map((items) => (
                <div className='cart-item'>
                            <img
                        className="img-fluid"
                        src={items.thumbnail}
                        
                                alt="test"
                            />
                            <div className="description">
                                <p>{items.title}</p>
                                <p>{items.description}</p>
                                <strong>${items.price}</strong>
                            </div>
                            <div className="quantity">
                                Quantity
                                <select value={items.quantity} onChange={(e) => handleChange(e,items.id)}>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                </select>
                            </div>
                            <div className='close'>
                        <button onClick={() => {
                            dispatch(AsyncDeleteItem(items.id))
                        }}>Remove from cart</button>
                            </div>
                </div>

            ))}
        <h1>Total:{cart.reduce((acc, item)=>item.price*item.quantity+acc ,0 )}</h1>
        </div>
    );
}

export default Cart