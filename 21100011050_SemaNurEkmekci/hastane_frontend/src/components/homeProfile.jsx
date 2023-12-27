import React, { useState, useEffect } from 'react';
import { Modal, ModalBody, ModalHeader, Row, Col } from 'reactstrap';
import Swal from 'sweetalert2';
import profile from '../images/profile.webp';
import '../css/homeProfile.css';

function HomeProfile({ info }) {

  const [modalBMI, setModalBMI] = useState(false);
  const [weight, setWeight] = useState(0); //kilo
  const [height, setHeight] = useState(0); //boy
  const [result, setResult] = useState(null); //bmi sonucu
  const [resultBMIText, setResultBMIText] = useState(""); //bmi sonucu text


  

  const calculateBMI = (e) => {
    e.preventDefault(); 
    
    console.log(height);
    console.log(weight);
    const heightMt = height / 100;
    console.log(heightMt);

    if (height > 0 && heightMt > 0 && height > 0) {
      const bmi = (weight / (heightMt * heightMt)).toFixed(2);
      setResult(bmi);
      if(bmi < 18.5){
        setResultBMIText("İdeal Kilonun Altındasınız.");
      }else if(bmi < 24.9){
        setResultBMIText("İdeal Kilodasınız.");
      }else if(bmi < 29.9){
        setResultBMIText("İdeal Kilonun Üstündesiniz.");
      }else if(bmi < 30){
        setResultBMIText("İdeal Kilonun Çok Üstündesiniz.");
      }else if(bmi < 40){
        setResultBMIText("İdeal Kilonun Çok Çok Üstündesiniz.")
      }
    }else{
      Swal.fire({
        icon: "error",
        title: "Geçersiz Değer Girdiniz.",
        showConfirmButton: false,
        timer: 1000,
        width: 300
      });
    }
    console.log(result);
  }


  return (
    <div className="home-profile">
      <div className="profile">
        <div className="Profilbg">
        <div
            role="img"
            aria-label="profil fotoğrafı"
            className="profile-pic"
            style={{ backgroundImage: `url(${profile})` }}
          >
          </div>
          <div className="profile-usertitle">
            <div className="profile-usertitle-name font-rc">{info[0] + " " + info[1]}</div>
            
          </div>
        
        </div>
        <div className="full-box bb" style={{ verticalAlign: "top" }}>
        <span className="text-big">{info[2]}</span>
          <span className="text-small">Yaş</span>
        </div>

        
        <div className="full-box bt">
          <span className="text-small">Vücut Kitle İndeksi</span> <br />
          <a href="#" className="butonHover green margin-top-10 displayBlock" onClick={() => {setModalBMI(!modalBMI); setResult(null); setResultBMIText("")}}>
            Hesapla
          </a>
        </div>
      </div>

      <Modal
      className='modalBMI'
        size="m"
        isOpen={modalBMI}
        toggle={() => setModalBMI(!modalBMI)}
      >
        <ModalHeader
          toggle={() => setModalBMI(!modalBMI)}
        >
          Vücut Kitle İndeksi
        </ModalHeader>
        <ModalBody>
          <form onSubmit={calculateBMI}>
            <Row>
              <Col lg={12}>
                <div></div>
              </Col>
              <Col lg={12}>
                <div>
                  <label htmlFor="">Kilonuz</label>
                  <input
                    type="text"
                    className="form-control form-margin"
                    placeholder="Kilonuz (Kg)"
                    onChange={e => setWeight(e.target.value)}
                    required
                  />
                </div>
                <br />
              </Col>
              <Col lg={12}>
                <div>
                  <label htmlFor="">
                    Boyunuz
                  </label>
                  <input
                    className="form-control form-margin"
                    placeholder="Boyunuz (cm)"
                    onChange={e => setHeight(e.target.value)}
                    required
                  />
                </div>
              </Col>
            </Row>
            <button
              className="button-form"
              type="submit"
              onClick={calculateBMI}
            >
              Hesapla
            </button>
            {result && <p>Vücut Kitle İndeksiniz: {result} <br /> {resultBMIText}</p>}
          </form>
        </ModalBody>
      </Modal>
    </div>


  );
}

export default HomeProfile;
