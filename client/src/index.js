import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Home from './component/home/Home';
import Login from './component/login/Login';
import SignIn from './component/signin/SignIn';
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
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
