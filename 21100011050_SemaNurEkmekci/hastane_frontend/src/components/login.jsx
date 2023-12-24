import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../css/login.css'



function Login() {

  const [tc, setTC] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = 'http://localhost/hastane_backend/login.php';
    let fData = new FormData();
    fData.append('tc', tc);
    fData.append('password', password);
    axios.post(url, fData).then(r => console.log(r.data))
    .catch(e => 
      {
        console.log(e.response.data)
        if(e.response.data != "False" && e.response.data !="Invalid password")
        {
          sessionStorage.setItem('userID', e.response.data);
          Swal.fire({
            icon: "success",
            title: "Giriş Yapıldı.",
            showConfirmButton: false,
            timer: 1000,
            width: 500
          });
          setTimeout(() => {
            window.location.href = '/appointment';
          }, 1000);
        }
        else if(e.response.data === "False"){
          Swal.fire({
            icon: "error",
            text: "Kaydınız Bulunamadı.",
            width: 500
          });
        }
        else{
          Swal.fire({
            icon: "error",
            text: "Hatalı Şifre.",
            width: 500
          });
        }
      }
    );
  }

  return (
    <div className='loginPage'>
         <section className="home">
        <div className="form_container2">
          <div className="form2 login_form2">
            <form action="#">
              <h2>Giriş Yap</h2>
              <div className="input_box2">
                <input type="number" placeholder="T.C Kimlik No" name='tc' value={tc}  onChange={(e) => setTC(e.target.value)}  />
              </div>
              <div className="input_box2">
              <input type="password" placeholder="Şifre" name='password' value={password} onChange={(e) => setPassword(e.target.value)}  />
              </div>

              <button type="submit" className="button2" onClick={handleSubmit}>
                Giriş Yap
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
