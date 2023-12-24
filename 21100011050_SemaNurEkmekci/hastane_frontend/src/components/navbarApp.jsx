import React, { useRef,useState, useEffect } from 'react';
import { Modal, ModalBody, ModalHeader, Row, Col } from 'reactstrap';
import { BiEdit } from 'react-icons/bi';
import logo from '../images/favicon.png';
import hamburger from '../images/menu-bar.png';
import Swal from 'sweetalert2';
import axios from 'axios';
import HomeProfile from './homeProfile';
import '../css/navbar.css';

function Navbar() {
  const [userInfo, setUserInfo] = useState(null);
  const [appointments, setAppointments] = useState(null);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [isInputDisabled, setIsInputDisabled] = useState(true);
  const [updateTelefon, setUpdateTelefon] = useState('');
  const [updateEmail, setUpdateEmail] = useState('');
  const [age, setAge] = useState('');
  const navRef = useRef();
  const [showMenu, setShowMenu] = useState(false);
  const [modalAppointment, setModalAppointment] = useState(false); //Randevular Modalı
  
  
  const handleCancelAppointment = async (r_id) => {
    console.log(r_id);
    try {
      if (r_id) {
        const confirmed = Swal.fire({
          title: "Randevuyu İptal Etmek İstediğinize Emin Misiniz?",
          confirmButtonText: "Evet",
          denyButtonText: `Hayır`
        }).then((result) => {
          if (result.isConfirmed) {
            const response =  axios.get(`http://localhost/hastane_backend/deleteAppointment.php?id=${r_id}}`);
            console.log(response.data);
            Swal.fire("Randevu İptal Edildi!", "", "success");
            setTimeout(() => {
              window.location.href = '/appointment';
            }, 500);
          }
        });
      }
       else {
        window.location.href = '/login-or-register';
      }
    } catch (error) {
      console.error('Randevu silme hatası:', error);
    }
  };
  

  useEffect(() => {
    async function getUserData() {
      try {
        const userID = sessionStorage.getItem('userID');
        if (userID && !userInfo) {
          const response = await axios.get(`http://localhost/hastane_backend/getUserData.php?id=${userID}`);
          setUserInfo(response.data);
          const userBirthDate = response.data && response.data[0] && response.data[0]['dogum_tarihi'];
          const userAge = calculateAge(userBirthDate);
          setAge(userAge);
        } 
        else if (!userID) {
          window.location.href = '/login-or-register';
        }
      } catch (error) {
        console.error('Kullanıcı bilgilerini alma hatası:', error);
      }
    }
    getUserData();

   
  }, [userInfo]);
  

  const handleLogout = async () => {
    try {
      sessionStorage.clear();
      await axios.get('http://localhost/hastane_backend/logOut.php');
      window.location.href = '/';
    } catch (error) {
      console.error('Çıkış hatası:', error);
    }
  };



  const getAppointment = async () => {
    setModalAppointment(!modalAppointment); 
    console.log("sdgs");
    try {
      const userID = sessionStorage.getItem('userID');
      if (userID) {
        const response = await axios.get(`http://localhost/hastane_backend/getAppointment.php?id=${userID}`);
        setAppointments(response.data);
        console.log(response.data);
      } 
      else {
        window.location.href = '/login-or-register';
      }
    } catch (error) {
      console.error('Randevu bilgilerini alma hatası:', error);
    }
    // console.log(appointments);
  };
  
  
  function calculateAge(birthday) {
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    return age;
  }

  const toggleNavbar = () => {
    setShowMenu(!showMenu);
    console.log("showMenu:", showMenu);
  };

  const handleMeetingCheckboxChange = () => {
    setIsInputDisabled(prevState => !prevState);
    setUpdateTelefon('');
    setUpdateEmail('');
  };

  const updateData = async (event) => {
    event.preventDefault();
    try {
      const isValidPhoneNumber = updateTelefon.length === 10; //tel no kotnrol
      const isValidEmail = updateEmail.includes('@'); //gmail kontrol

      if (!isValidPhoneNumber) {
        Swal.fire({
          icon: 'error',
          title: 'Telefon numarası 10 haneli olmalıdır.',
          showConfirmButton: false,
          timer: 2000,
          width: 300
        });
        return false;
      }
    
      if (!isValidEmail) {
        Swal.fire({
          icon: 'error',
          title: 'Geçersiz e-posta adresi.',
          showConfirmButton: false,
          timer: 2000,
          width: 300
        });
        return false;
      }
      let fData = new FormData();
      if (updateTelefon !== "") {
        fData.append('tel', updateTelefon);
      } else {
        fData.append('tel', (userInfo && userInfo[0] && userInfo[0]['telefon']));
      }
      if (updateEmail !== "") {
        fData.append('mail', updateEmail);
      } else {
        fData.append('mail', (userInfo && userInfo[0] && userInfo[0]['email']));
      }
      const response = await axios.post('http://localhost/hastane_backend/updateData.php', fData);

      if (response.data === "Success") {
        Swal.fire({
          icon: "success",
          title: "Güncelleme Başarılı.",
          showConfirmButton: false,
          timer: 1000,
          width: 300
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Güncelleme Yapılamadı.",
          showConfirmButton: false,
          timer: 1000,
          width: 300
        });
      }
    } catch (error) {
      if (error.response.data === "Success") {
        Swal.fire({
          icon: "success",
          title: "Güncelleme Başarılı.",
          showConfirmButton: false,
          timer: 1000,
          width: 300
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Güncelleme Yapılamadı.",
          showConfirmButton: false,
          timer: 1000,
          width: 300
        });
      }
      // console.log('Güncelleme hatası:', error.response.data);
    }
  };

  return (
    <div>
      
      <div className='header'>
        <h3><a href="/"><img src={logo} className='logo logo2' alt="Logo" /></a></h3>

        <button
          className="nav-btn menu-btn"
          onClick={toggleNavbar}>
          <h3><img src={hamburger} className='menu-bar' alt="Logo" /></h3>
        </button>

        <nav className={showMenu ? "show" : ""} ref={navRef}>
          <a href="#" onClick={getAppointment} >Randevularım</a>
          <a href="/" onClick={handleLogout}>Çıkış Yap</a>
          <a className="user-info" onClick={() => setModalUpdate(!modalUpdate)}>
            {userInfo && userInfo[0] && (
              <>
                {userInfo[0]['ad']} {userInfo[0]['soyad']}
                <br />
                {userInfo[0]['tc']}
              </>
            )}
          </a>
        </nav>
      </div>


      <Modal
        size="m"
        isOpen={modalUpdate}
        toggle={() => setModalUpdate(!modalUpdate)}
      >
        <ModalHeader
          toggle={() => setModalUpdate(!modalUpdate)}
        >
          <button
            className="iconButton"
            onClick={handleMeetingCheckboxChange}
          >
            <BiEdit />
          </button>
        </ModalHeader>
        <ModalBody>
          <form onSubmit={updateData}>
            <Row>
              <Col lg={12}>
                <div></div>
              </Col>
              <Col lg={12}>
                <div>
                  <label htmlFor="">Telefon</label>
                  <input
                    type="text"
                    className="form-control form-margin"
                    placeholder="Telefon"
                    disabled={isInputDisabled}
                    value={updateTelefon || (userInfo && userInfo[0] && userInfo[0]['telefon'])}
                    onChange={e => setUpdateTelefon(e.target.value)}
                    required
                  />
                </div>
                <br />
              </Col>
              <Col lg={12}>
                <div>
                  <label htmlFor="">
                    E-posta
                  </label>
                  <input
                    className="form-control form-margin"
                    placeholder="E-Posta"
                    disabled={isInputDisabled}
                    value={updateEmail || (userInfo && userInfo[0] && userInfo[0]['email'])}
                    onChange={e => setUpdateEmail(e.target.value)}
                    required
                  />
                </div>
              </Col>
            </Row>
            <button
              className="button-form"
              type="submit"
              onClick={updateData}
              disabled={isInputDisabled}
            >
              Güncelle
            </button>
          </form>
        </ModalBody>
      </Modal>

      <Modal
        className='modalAppointment'
        size="m"
        isOpen={modalAppointment}
        toggle={() => setModalAppointment(!modalAppointment)}
      >
        <ModalHeader toggle={() => setModalAppointment(!modalAppointment)}>
          Randevu Detayları
        </ModalHeader>
        <ModalBody>
        {appointments &&
            appointments.map(appointment => (
              <div key={appointment.r_id}>
                <p>
                  <strong>Poliklinik:</strong> {appointment.b_ad}
                </p>
                <p>
                  <strong>Doktor:</strong> {appointment.d_ad + " " +appointment.d_soyad}
                </p>
                <p>
                  <strong>Randevu Tarihi:</strong> {appointment.randevu_tarihi.split('-').reverse().join('-')}
                </p>
                <p>
                  <strong>Saat:</strong> {appointment.saat.split(':').slice(0, 2).join(':')}
                </p>
                <button
                  className={`button-form cancel-button ${
                    appointment.aktiflik_durumu === '0' ? 'cancelled' : ''
                  }`}
                  onClick={() => handleCancelAppointment(appointment.r_id)}
                  disabled={appointment.aktiflik_durumu === '0'}
                >
                  {appointment.aktiflik_durumu === '0' ? 'Geçmiş Randevu' : 'Randevu İptal Et'}
                </button>
                <hr />
              </div>
            ))}
         
        </ModalBody>
      </Modal>

      <HomeProfile age={age} />
    </div>

  );
}

export default Navbar;
