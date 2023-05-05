import React from 'react'
import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';//for counter update

const Navbar = () => {
  const items=useSelector((state)=>state.cart)//it have func in that we will get whole app state-->inside func we have to mention which state we have to subscribe
  //we want to subscribe cart(property),when cart changed,the value of items get update[get new value],then component get re-rendered
  //selector=which obj we want to subscribe,when data get changed,youll get the change value of data
  //you dont have to request for data,it will get automatically because you have subscribe the data
  //useSelector hook subscribe the data
  return (
    <div style={{display:'flex',alignItems:'center', justifyContent:'space-between'}}>
    <span className='logo'>REDUX STORE</span>

    <div>
        <Link className='navLink' to='/'>Home</Link>
        <Link className='navLink' to='/cart'>Cart</Link>
        <span className='cartCount'>Cart items: {items.length}</span>
    </div>

  </div>
  );
};

export default Navbar