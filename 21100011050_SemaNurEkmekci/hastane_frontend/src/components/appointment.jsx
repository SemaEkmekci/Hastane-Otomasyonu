import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Modal, ModalBody, ModalHeader, Row, Col } from "reactstrap";
import NavbarApp from './navbarApp';
import Pharmacy from './pharmacy';
import 'bootstrap/dist/css/bootstrap.css'
import '../css/appointment.css';




function Appointment() {
  // Randevu Oluşturmak İçin
  const [modal, setModal] = useState(false);
  const [pharmacyModal, setPharmacyModal] = useState(false);
  const [poliklinikData, setPoliklinikData] = useState([]);
  const [selectedPoliklinik, setSelectedPoliklinik] = useState(null); //seçilen poliklinik
  const [doctor, setDoctor] = useState(''); //seçilen doktor
  const [date, setDate] = useState(''); //Seçilen randevu tarihi
  const [time, setTime] = useState('');
  const [doctors, setDoctors] = useState([]); //seçilen poliklinikteki doktorların listesi
  const [appTime, setAppTime] = useState([]); // Alınan Veri tabanındaki randevu saatleri
  const today = new Date().toISOString().split('T')[0]; //bugünün tarihi
  const [nearestAppointment, setNearestAppointment] = useState(null); //En yakın randevu


  useEffect(() => {
    async function checkSession() {  //Session kotnrolü
      try {
        const response = await axios.get('http://localhost/hastane_backend/sessionCheck.php');
        const isLoggedIn = response.data;
        console.log(isLoggedIn);
        if (isLoggedIn === "False") {
          window.location.href = '/login-or-register'; 
        } else {
          getData();
        }
      } catch (error) {
        console.error('Oturum kontrolü hatası:', error);
      }
    }
    checkSession();

    async function fetchNearestAppointment() {
      console.log("blabla");
      try {
        const userID = sessionStorage.getItem('userID');
        const response = await axios.get(`http://localhost/hastane_backend/getNearestAppointment.php?id=${userID}`);
        const nearest = response.data;
        console.log(response.data);
        setNearestAppointment(nearest);
      } catch (error) {
        console.error('En yakın randevu bilgisini alma hatası:', error);
      }
    }

    fetchNearestAppointment();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get('http://localhost/hastane_backend/getPoliclinic.php');  //Poliklinik bilgilerini modalda göstermek için
      setPoliklinikData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Poliklinik verilerini alma hatası:', error);
    }
    
  }

  // const appointmentTime = async (event) => {
  //   try {
  //     const response = await axios.get(`http://localhost/hastane_backend/appointmentTime.php`);

  //     const modifiedData = response.data.map(item => { //saat verilerini 12:45:00 formatından 12:45 formatına çevirdim
  //       return {
  //         saat: item.saat.substring(0, 5) 
  //       };
  //     });
  
  //     setAppTime(modifiedData);
  //     console.log(modifiedData);
  //   } catch (error) {
  //     console.error('Randevu saati verilerini alma hatası:', error);
  //   }
  // }
  
 
  const handlePoliklinikChange = async (event) => { //Seçilen poliklinikteki doktorları getirmek için
    const selectedPoliklinikAd = event.target.value;
    setSelectedPoliklinik(selectedPoliklinikAd);
    console.log(selectedPoliklinikAd);
    try {
      const response = await axios.get(`http://localhost/hastane_backend/getDoctors.php?ad=${selectedPoliklinikAd}`);
      setDoctors(response.data);
      console.log(response);
      const responseTime = await axios.get(`http://localhost/hastane_backend/appointmentTime.php?ad=${selectedPoliklinikAd}`);

      if (responseTime && responseTime.data) {
        const modifiedData = responseTime.data.map(item => {
          return {
            saat: item.saat.substring(0, 5)
          };
        });
        setAppTime(modifiedData);
        console.log(modifiedData);
      } else {
        console.error('Veri alınamadı veya boş.');
      }
      
    } catch (error) {
      console.error('Doktor verilerini alma hatası:', error);
    }
  }
  
  const handleSubmit = async (event) => {  //Randevu Oluşturmak İçin
    event.preventDefault();
    const userID = sessionStorage.getItem('userID');
    const url = 'http://localhost/hastane_backend/dateRegister.php';
    let fData = new FormData();
    if(userID == "" || selectedPoliklinik == "" || doctor == "" || date == "" || time == ""){
      Swal.fire({
        icon: "error",
        text: "Eksik Bilgi Girdiniz!",
        width: 500
      });
      return;
    }
    fData.append('id', userID);
    fData.append('poli', selectedPoliklinik);
    fData.append('doctor', doctor);
    fData.append('date', date);
    fData.append('time', time);
    const response = await axios.post(url, fData).then(r => console.log(r.data))
    .catch(e => 
      {
        console.log(e.response.data)
        if(e.response.data === "Success")
        {
          Swal.fire({
            icon: "success",
            title: "Randevu Oluşturuldu.",
            showConfirmButton: false,
            timer: 1000,
            width: 500
          });
        
         
        }
        else if(e.response.data === "Error"){
          Swal.fire({
            icon: "error",
            text: "Randevu Oluşturulamadı. Aynı Poliklinikte aktif randevunuz bulunmaktadır.",
            width: 500
          });
        }
        setTimeout(() => {
          window.location.href = '/appointment';
        }, 1000);
      }
    );
  }

  return (
    <div>
      <NavbarApp/>
      <Pharmacy/>

     
     <Modal
          size="m"
          isOpen={modal}
          toggle={() => setModal(!modal)}
          centered
        >
          <ModalHeader toggle={() => setModal(!modal)}>
            Randevu Al
          </ModalHeader>
          <ModalBody className="modal-content">
            <form>
              <Row>
                <Col lg={12}>
                <div>
                  <label htmlFor="">
                  Poliklinik Seçin
                  </label>
                  <select className="form-control" onChange={handlePoliklinikChange}>
                    <option  disabled selected value={selectedPoliklinik} >Poliklinik Seçin</option>
                      {poliklinikData.map((poliklinik, index) => (
                    <option key={index} value={poliklinik.id}>{poliklinik.b_ad}</option>
                    ))}
                  </select>

            </div>
            <br />
                </Col>
                <Col lg={12}>
                <div>
                  <label htmlFor="">
                  Doktor Seçin
                  </label>
                  <select
  className="form-control"
  value={doctor}
  onChange={(e) => {
    console.log(e.target.value);
    setDoctor(e.target.value);
  }}
>
  <option disabled selected value="">Doktor Seçin</option>
  {doctors.map((doktor, index) => (
    <option key={index} value={`${doktor.d_ad} ${doktor.d_soyad}`}>{`${doktor.d_ad} ${doktor.d_soyad}`}</option>
  ))}
</select>
            </div>
            <br />
                </Col>
                <Col lg={12}>
                <div>
                <label htmlFor="">
                  Tarih Seçin
                </label>
                <input
                  type="date"
                  className="form-control"
                  min={today}
                  value={date} onChange={(e) => setDate(e.target.value)}
                />
                </div>
            <br />
                </Col>
                <Col lg={12}>
                <div>
  <label htmlFor="appointment-time">
    Saat Seçin
  </label>
  <select
  id="appointment-time"
  name="appointment-time"
  className="form-control"
  value={time}
  onChange={(e) => setTime(e.target.value)}
>
  <option disabled selected value="">
    Saat Seçin
  </option>
  {Array.from({ length: 24 * 4 }, (_, index) => {
    const hour = Math.floor(index / 4).toString().padStart(2, '0');
    const minute = (index % 4) * 15;
    const formattedMinute = minute.toString().padStart(2, '0');
    const time = `${hour}:${formattedMinute}`;
    if (time >= '09:00' && time <= '17:00') {
      // Eğer o saatte bir randevu varsa o saat seçilemez.
      const isDisabled = appTime.find((item) => item.saat === time);
      return (
        <option
          key={time}
          value={time}
          disabled={isDisabled}
        >
          {time}
        </option>
      );
    }
    return null;
  })}
</select>

</div>
            <br />
                </Col>  
              </Row>
              <button
                className="button-form"
                type="submit"
                onClick={handleSubmit}
              >
                Gönder
              </button>
            </form>
          </ModalBody>
        </Modal>

        <div className="home-randevu3">
  <a href="#" className="randevu3" style={{ display: 'block' }} tabIndex="-1">
  <h3>En Yakın Randevu Bilgisi</h3>

    {nearestAppointment && nearestAppointment.length > 0 ? (
      <div className="nearest-appointment">
     
        <p>
          <strong>Poliklinik:</strong> {nearestAppointment[0]['b_ad']}
        </p>
        <p>
          <strong>Doktor:</strong> {nearestAppointment[0]['d_ad'] + " " + nearestAppointment[0]['d_soyad']}
        </p>
        <p>
          <strong>Randevu Tarihi:</strong> {nearestAppointment[0]['randevu_tarihi'].split('-').reverse().join('-')}
        </p>
        <p>
          <strong>Saat:</strong> {nearestAppointment[0]['saat'].split(':').slice(0, 2).join(':')}
        </p>
      </div>
    ) : (
          <div>
            <h3 className="baslik">Aktif Randevunuz Bulunmamaktadır</h3>
          </div>
    )}
  </a>
</div>
       
        <div className="home-randevu2" onClick={() => {setModal(!modal);}}>

      <a href="#" className="randevu" >
        <div >
   
          <h3 className="baslik">Randevu Al</h3>
        </div>
      </a>
    </div>

    <Pharmacy modalState={pharmacyModal} toggleModal={() => setPharmacyModal(!pharmacyModal)} />  {/* Eczanaler Modalı */}
      
      <div className="home-randevu2" onClick={() => setPharmacyModal(!pharmacyModal)}>
        <a href="#" className="randevu">
          <div>
            <h3 className="baslik">Nöbetçi Ezcaneler</h3>
          </div>
        </a>
      </div>

    </div>

    
  );
}

export default Appointment;
