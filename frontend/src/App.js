
import React from "react";
import {Route,Routes,Link} from 'react-router-dom';
import DisplayAllCategory from "./Admin/DisplayAllCategory";
import Category from './Admin/Category';
import Product from './Admin/Product';
import Dashboard from './Admin/Dashboard';
import DisplayAllProducts from "./Admin/DisplayAllProducts";
import Home from './User interface/Home'
import Login from "./User interface/Login";
import SignIn from './User interface/SignIn'
import OrderSummary from "./Admin/OrderSummary";
import PlaceOrder from "./User interface/PlaceOrder";
import Thankyou from "./User interface/Thankyou";


function App(props) {
  return (
    <div >
      <Routes>
        <Route strict props={props.history} element= {<Category/>} path="/category"/>
       <Route strict props={props.history} element={<DisplayAllCategory/>} path="/displayallcategory"/>
       <Route strict props={props.history} element={<Dashboard/>} path="/dashboard" />
       <Route strict props={props.history} element={<Product/>} path="/product" />
       <Route strict props={props.history} element={<DisplayAllProducts/>} path="/displayallproduct" />
       <Route strict props={props.history} element={<Home/>} path="/Home" />
       <Route strict props={props.history} element={<Login/>} path="/Login" />
       <Route strict props={props.history} element={<SignIn/>} path="/Signin" />
       <Route strict props={props.history} element={<OrderSummary/>} path="/ordersummary" />
       <Route strict props={props.history} element={<PlaceOrder/>} path="/placeorder" />
       <Route strict props={props.history} element={<Thankyou/>} path="/thankyou" />



      </Routes>
      
    </div>
  );
}
export default App ;