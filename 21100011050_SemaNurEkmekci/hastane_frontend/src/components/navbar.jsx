import { useRef, useState } from "react";
import logo from '../images/favicon.png';
import hamburger from '../images/menu-bar.png';
import '../css/navbar.css';

function Navbar() {
  const navRef = useRef();
  const [showMenu, setShowMenu] = useState(false);

  const toggleNavbar = () => {
    setShowMenu(!showMenu);
  };

  
  return (
    <div>
      <div className="top-navbar">
        <div className="hc-top-header">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="hc-top-head-right hc-top-head-div">
                  <p>
                    NECMETTİN ERBAKAN ÜNİVERSİTESİ TIP FAKÜLTESİ HASTANESİ
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <header>
        <h3><a href="/"><img src={logo} className='logo' alt="Logo" /> </a></h3>
        <nav className={showMenu ? "show" : ""} ref={navRef}>
          <a href="/">Anasayfa</a>
          <a href="/login-or-register">Randevu Al</a>
          <a href="/about">Hakkımızda</a>
         
        </nav>
        <button
          className="nav-btn menu-btn"
          onClick={toggleNavbar}>
          <h3><img src={hamburger} className='menu-bar' alt="Logo" /></h3>
        </button>
      </header>
    </div>
  );
}

export default Navbar;
