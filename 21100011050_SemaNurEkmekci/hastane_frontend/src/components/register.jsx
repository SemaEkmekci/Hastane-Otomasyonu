import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../css/register.css'


function Register() {
  const [tc, setTC] = useState('');
  const [userName, setUserName] = useState('');
  const [surname, setSurname] = useState('');
  const [tel, setTel] = useState('');
  const [email, setEmail] = useState('');
  const [dt, setDT] = useState('');
  const [gender, setGender] = useState('K');
  const [password, setPassword] = useState('');
  const [confirmPassword, setCP] = useState('');
  

  const control = () => {
    let state = 1;
    let warningText;
    if(tc.length === 0){
      warningText = "TC Alanı Boş Bırakılamaz.";
      state = 0;
    }
    else if(tc.length != 11){
      warningText = "TC 11 karakter olmalı.."; 
      state = 0;
    }
    else if(userName.length === 0){
      warningText = "İsim Alanı Boş Bırakılamaz.";
      state = 0;
    }
    else if(surname.length === 0){
      warningText = "Soyisim Alanı Boş Bırakılamaz.";
    }
    else if(tel.length === 0){
      warningText = "Telefon Alanı Boş Bırakılamaz."; 
      state = 0;
    }
    else if(tel.length != 10)
    {
    warningText = "Telefonu Uygun Formatta Giriniz.";
      state = 0;
    }
    else if(email.length === 0){
      warningText = "E-Posta Alanı Boş Bırakılamaz.";
      state = 0;
    }
    else if(!email.includes("@")){
      warningText = "E-posta Bilginizi Doğru Giriniz.";
      state = 0;
    }
    else if(dt.length === 0){
      warningText = "Doğum Tarihi Alanı Boş Bırakılamaz.";      
      state = 0;
    }
    else if(password.length === 0){
      warningText = "Şifre Alanı Boş Bırakılamaz.";
      state = 0;
    } 
    else if(password != confirmPassword){
      warningText = "Şifreler Eşleşmiyor";
      state = 0;
    }
    if(state == 0){
    Swal.fire({
      icon: "warning",
      title: "Oops...",
      text: warningText
    });}
    return state;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    let cntrl = control(); 

    if(cntrl == 1){
      const url = 'http://localhost/hastane_backend/register.php';
      let fData = new FormData();
      fData.append('tc', tc);
      fData.append('userName', userName);
      fData.append('surname', surname);
      fData.append('tel', tel);
      fData.append('email', email);
      fData.append('dt', dt);
      fData.append('gender', gender);
      fData.append('password', password);
      // axios.post(url, fData).then(response=> alert(response.data));
      await axios.post(url, fData)
      .then(r=>console.log(r.response.data))
      .catch((e)=> {
        console.log(e.response.data)
        if(e.response.data === "Success"){
          Swal.fire({
            icon: "success",
            title: "Kaydınız Başarılı Bir Şekilde Oluşturuldu.",
            showConfirmButton: false,
            timer: 1500,
            width: 500
          });
          setTimeout(() => {
            document.getElementById('login').click();
          }, 1500);
        }else{
          Swal.fire({
            icon: "error",
            text: "Zaten Kaydınız Var.",
            width: 500
          });
        }
      });
    }
  }

  return (
    <div>
        <section className="home">
            <div className="form_container">
              <div className="form signup_form">
                <form>
                  <h2>Kayıt Ol</h2>
                
                  <div className="input_box">
                    <input type="number" placeholder="T.C Kimlik No" name='tc' value={tc}  onChange={(e) => setTC(e.target.value)}  />
                    <input type="text" placeholder="Ad" name='name' value={userName} onChange={(e) => setUserName(e.target.value)}  />
                  </div>

                  <div className="input_box">
                    <input type="text" placeholder="Soyad" name='surname' value={surname} onChange={(e) => setSurname(e.target.value)}  />
                  {/* </div> */}
                  {/* <div className="input_box"> */}
                    <input type="tel" placeholder="Telefon: (5XX) XXX XX XX" name='tel' value={tel} onChange={(e) => setTel(e.target.value)}  />
                  </div>
                  <div className="input_box">
                    <input type="email" placeholder="E-Posta" name='email' value={email} onChange={(e) => setEmail(e.target.value)}  />
                  {/* </div> */}
                  {/* <div className="input_box"> */}
                    <input type="date" placeholder="Doğum Tarihi" name='dt' value={dt} onChange={(e) => setDT(e.target.value)}  />
                  </div>
                  <div className='input_box'>
                  <select name="gender" id="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option value="K">Kadın</option>
                    <option value="E">Erkek</option>
                  </select>
                  </div>
                  <div className="input_box">
                    <input type="password" placeholder="Şifre" name='password' value={password} onChange={(e) => setPassword(e.target.value)}  />
                  {/* </div>
                  <div className="input_box"> */}
                    <input type="password" placeholder="Şifre Tekrar" name='confirmPassword' value={confirmPassword} onChange={(e) => setCP(e.target.value)}  />
                  </div>
                  <button type='submit' className="button" onClick={handleSubmit}>Hesap Oluştur</button>
                </form>
              </div>
            </div>
        </section>
    </div>
  );
}

export default Register;