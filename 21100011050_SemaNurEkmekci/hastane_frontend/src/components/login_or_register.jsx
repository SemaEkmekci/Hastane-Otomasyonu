import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Register from './register';
import Login from './login';
import Navbar from './navbar';

function Login_or_register() {
    const [currentPage, setCurrentPage] = useState('login')
    sessionStorage.clear();
    const renderPage = () => {
      if (currentPage === 'login') {
        return <Login />;
      } else if (currentPage === 'register') {
        return <Register />;
      }
      return <Login />;
    }

  return (
    <>
    <Navbar/>

    <div className='btnLR'>
    
    <button onClick={() => setCurrentPage('login')} id="login" className='LR'>Giriş Yap</button>
    <button onClick={() => setCurrentPage('register')} id="register"  className='LR'>Kayıt Ol</button>
    {renderPage()}
    </div>
    </>
  );
}

export default Login_or_register;
