import React from 'react'
import { useSelector , useDispatch} from 'react-redux'//getting data from store
import { remove } from '../store/cartSlice';
//seSelector= getting data from store, for counter update, here we are getting items
//useDispatch=for canin te store, to apply function on button for add or remove item
const Cart = () => {
  const products=useSelector(state=>state.cart);
  const dispatch=useDispatch();
  const handleRemove=(productId) =>{
         dispatch(remove(productId));    
  }
  return <div>
    <h3>Cart</h3>
    <div className='cartWrapper'>
      {
       products.map((product)=>(
            <div key={product.id} className='cartCard'>
              <img src={product.image} alt=''/>
              <h4>{product.title}</h4>
              <h5>{product.price}</h5>
              <button onClick={()=>handleRemove(product.id)} className='btnadd'>Remove</button>
            </div>
       ))
      }
    </div>
  </div>
  
}

export default Cart