import React, { useState } from 'react';
import Navbar from './navbar';
import Footer from './footer';
import Video from './promotionalVideo';
import '../css/main.css'

function Main() {

 
  return (
    <div>
      <Navbar/>
      <Video/>
      <Footer/>
     
    </div>
  );
}

export default Main;
