import React from 'react';
import '../css/footer.css'


function Footer() {
  return (
    <>
    <div className="beyaz-cizgi"></div>
    <div className="hc-footer hc-spacer-top hc-spacer-bottom" id="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 d-flex justify-content-between">
            <div className="hc-footer-logo">
              <a href="https://hastane.erbakan.edu.tr/">
                <img src="https://hastane.erbakan.edu.tr/assets/images/altfooter2.png" alt="logo" />
              </a>
            </div>
            <div className="hc-footer-logo">
              <a href="https://hastane.erbakan.edu.tr/">
                <img src="https://hastane.erbakan.edu.tr/assets/images/once_saglik.svg" alt="" />
              </a>
            </div>
          </div>
          <div className="col-lg-12">
            <ul className="hc-footer-contact-list">
              <li>
                <div className="hc-foot-contact-box">
                  <h2>Adres</h2>
                  <p>
                    Yunus Emre Mah. Beyşehir Cad. No:281 PK: 42090 Meram/KONYA (Eski Hastane) <br />
                    Hocacihan Mah. Abdulhamid Han Cad. No:3 PK: 42080 Selçuklu/KONYA (Yeni Hastane)
                  </p>
                </div>
              </li>
              <li>
                <div className="hc-foot-contact-box">
                  <h2>Randevu Sekreterliği</h2>
                  <p>
                    <a href="tel::0 332 223 70 00" className='a'>0 332 223 70 00</a>
                    <br />
                  </p>
                </div>
              </li>
              <li>
                <div className="hc-foot-contact-box">
                  <h2>E-Posta</h2>
                  <a className="a">hastane@erbakan.edu.tr</a>
                  <br />
                  <a className="a" >
                    neutiphastahaklari@erbakan.edu.tr</a>
                  <br />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
   
    </>
  );
}

export default Footer;
