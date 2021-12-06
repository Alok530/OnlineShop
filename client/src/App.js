import React from "react";
import "./App.css";
import Home from "./components/Home";
import { Routes, Route } from 'react-router-dom';
import Greeting from "./components/Greeting";
import AddToCart from "./components/AddToCart";
import Login from "./components/Login";
import Regester from "./components/Register";
import ShopStateContext from "./context/ShopStateContext";
import Error from "./components/Error";
import Payment from "./components/Payment";
import Order from "./components/Order";
import PlacedOrder from './components/PlacedOrder';
import Account from './components/Account';
import OrderHistory from './components/OrderHistory';
import UpdateAcc from './components/UpdateAcc';

const App = () => {
  return (
    <>
      <ShopStateContext>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/gallery' element={<Greeting />} />
          <Route path='/addToCart' element={<AddToCart />} />
          <Route path='/login' element={<Login/>} />
          <Route path='/regester' element={<Regester />} />
          <Route path='/error' element={<Error first={'401-Unauthorized'} second={'Authorization Required-Access is allowed only for registered users'} />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/order' element={<Order />} />
          <Route path='/afterOrder' element={<PlacedOrder />} />          
          <Route path='/account' element={<Account />} />          
          <Route path='/updateAcc' element={<UpdateAcc />} />          
          <Route path='/myorder' element={<OrderHistory />} />          
          <Route path='*' element={<Error first={'404-PAGE NOT FOUND'} second={'Page not found error you are trying to access page which is not exist.'} />} />
        </Routes>
      </ShopStateContext>
    </>
  )
}

export default App;