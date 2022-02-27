import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Home from './component/home/Home';
import Login from './component/login/Login';
import SignIn from './component/signin/SignIn';
import CartPage from './component/cartPage/CartPage';
import SuccessPage from './component/successPage/SuccessPage';
import Order from './component/order/Order'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


ReactDOM.render(
  <BrowserRouter>
     <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/order" element={<Order />} />
      </Route>
      <Route path="/success" element={<SuccessPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
