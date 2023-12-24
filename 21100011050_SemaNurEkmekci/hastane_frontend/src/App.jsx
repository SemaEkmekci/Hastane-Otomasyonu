import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Main from './components/mainPage';
import Login_or_register from './components/login_or_register';
import Appointment from './components/appointment';
import About from './components/about';


import './App.css'

function App() {
  return (
    <>
      <div className='App'>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path='/' element={<Main/>} />
            <Route path='/login-or-register' element={<Login_or_register/>} />
            <Route path='/appointment' element={<Appointment/>} />
            <Route path='/about' element={<About/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
    </>
  )
}

export default App
