import React, { useState,useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { add } from '../store/cartSlice';
import { fetchProducts } from '../store/productSlice';
import { STATUSES } from '../store/productSlice';


//using component localstate,
//if we want to increase or decrese the counter 
//1)if we add 1 product to Add To Cart then cart counter has to be incresed by 1 but counter is in Navbar.js file
//2)so we have to manage state(increase or decrese the counter) so we can use contextapi in that we crete"cart"[so whole app can acess this cart]
//3)we want do this all locally so have to use prop-drilling in that-
//we have find common-parent between products.js & home.js[for sharing state between both files]- App.js is a common parent
//if we put "cart" in usestate in App.js so it can acess by products.js & home.js
//prop-drillig= our components are nested, so we have to first pass data to home.js & ten pass data in products.js
//                if Products.js has any another component so we have to pass data in that also
//it become too complex because of nested component so it tough to handle this so here we can introduced "REDUX"
//"REDUX"=[when we can use redux] when our state is used by multiple component in app so here we have to use "REDUX"

const Products = () => {
const dispatch=useDispatch();
//destructuring | properties from products,data=product list, status=loading,success,err //giving alias name to data as products[map]
const {data:products,status}=useSelector((state=>state.product))//after get data by thunk & calling reducers, we display the products on page
// const [products, setProducts]=useState([]);

//after loading component we have to fetch products
useEffect(() => {
     dispatch(fetchProducts());//DISPATCH "THNUK"
//   const fetchProducts=async()=>{ //fetchProducts is async function making it arrow function

//        const res=await fetch('https://fakestoreapi.com/products');//fetch return string

//        //fetch converted into json
//        const data=await res.json();
//        console.log(data);
//        //setting products
//        setProducts(data);
//   }
//   fetchProducts();
}, [])//for only 1 time load when component redered



 //product store in redux-store
 //how to store data-->dispatch'action'from app(also send data with action)-->that'action'call the reducers
 //-->if we send any data so it goes to action.payload & change the state
 //add is a action[this action call reducers] //reducers= add(state , action) {
 //           state.push(action.payload);
 //        }, from cartSlice.js
const handleAdd = (product) =>{//dispatch() is func //with this fun we can dispatch the action //add is action
     dispatch(add(product));//product we get=payload

};

 if(status===STATUSES.LOADING){//WE WANT DISPLAY TH STATUS ON PAGE BEFORE REQUEST IS "Loading"
     return <h2>Loading..</h2>//if status===STATUSES.LOADING then display "Loading" on page
 }

//  if(status===STATUSES.SUCCESS){//IF SUCCESS THEN DISPLAY ON PAGE "Here Are Our Products.."
//      return <h2>Here Are Our Products..</h2>
//  }

 if(status===STATUSES.ERROR){//IF ANY ERROR THEN DISPLAY ON PAGE "Something Went Wrong.."
     return <h2>Something Went Wrong..</h2>
 }

  return (
  <div className="productsWrapper">
  
     {products.map((product) =>(//recive single products
     //making markup //display products
     <div className='card' key={product.id}>

      <img src={product.image} alt=''/>
      <h4>{product.title}</h4>
      <h4>{product.price}</h4>
      <button onClick={()=>handleAdd(product)} className='btnadd'>Add To Cart</button>
      
     </div>
))}
</div>
)


}

export default Products