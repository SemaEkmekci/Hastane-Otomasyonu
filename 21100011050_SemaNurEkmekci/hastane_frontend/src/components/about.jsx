import React from 'react';
import Navbar from './navbar';
import foto from '../images/about.png';
import '../css/about.css'


const About = () => {
  

  return (
    <div className="page-content">
    <Navbar/>

      <div className="container">
      <img src={foto} className='foto' alt="Logo" />
        <div className="row">
          <div className="col-lg-12 ">
            <h4 className="hs_heading">Tanıtım Broşürü</h4>
            <hr />
            <p>
              <iframe
                title="Brochure"
                height="720"
                src="https://hastane.erbakan.edu.tr/upload/dosyalar/MTY0NjIzNDVhNDU4MGQ.pdf"
                width="100%"
              ></iframe>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
