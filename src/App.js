import './App.css';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import LogIn from './Shared-Cars-Service/Enterace/LogIn';
import SignUp from './Shared-Cars-Service/Enterace/SignUp';
import Navbar from './Shared-Cars-Service/Navbar';
import logo from "./pictures/smallLogo.png";
import gif from "./pictures/dribbble-3.gif"
import Home from './Shared-Cars-Service/Home';
import About from './Shared-Cars-Service/About';
import BeginTravel from './Shared-Cars-Service/BeginTravel';
import EndTravel from './Shared-Cars-Service/EndTravel';
import Profile from './Shared-Cars-Service/Profile';
import History from './Shared-Cars-Service/History';
import Payment from './Shared-Cars-Service/Payment'
import { UserProvider } from '../src/Shared-Cars-Service/Context/UserContext';
function App() {
  return (
    <div style={{ backgroundColor: 'black' }}>
      {/* <Navbar></Navbar> */}
      {/* <LogIn></LogIn> */}
      
      <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<LogIn />}></Route>
          <Route path="/LogIn" element={<LogIn />}></Route>
          <Route path="/SignUp" element={<SignUp />}></Route>
          <Route path="/Home" element={<Home />}></Route>
          <Route path="/About" element={<About />}></Route>
          <Route path="/begin-travel" element={<BeginTravel/>}></Route> 
          <Route path="/EndTravel" element={<EndTravel />}></Route>
          <Route path="/Profile" element={<Profile />}></Route>
          <Route path="/History" element={<History />}></Route>
          <Route path="/Payment" element={<Payment />}></Route>

        </Routes>
          </UserProvider>
      </BrowserRouter>
     

      <br></br><br></br>
      <br></br><br></br>
      <img src={gif} alt="Image" style={{ width: '25%', height: '200px' }} /><img src={gif} alt="Image" style={{ width: '25%', height: '200px' }} /><img src={gif} alt="Image" style={{ width: '25%', height: '200px' }} /><img src={gif} alt="Image" style={{ width: '25%', height: '200px' }} />
      <br></br><br></br><br></br>
      <p style={{ textAlign: 'center' }}>
        <h6 style={{ color: 'White' }}> כל הזכויות שמורות לדסי גנוט©</h6><br></br>
        <h6 style={{ color: 'White' }}>:לפרטים ויצירת קשר</h6><br></br>
        <p style={{ color: 'White' }}>
          <br></br>
          d0504119627@gmail.com | דסי | 0504119627
        </p>
        <br></br><br></br><br></br>
        {/* <h6 style={{ color:'White'}}> chedvanaftali@gmail.com | חדוה | 0583218448</h6><br></br>
          <h6 style={{ color:'White'}}> dassigenut1234@gmail.com | דסי | 0504119627</h6><br></br> */}
      </p>
    </div>
  );
}

export default App;