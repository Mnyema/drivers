
//import './App.css';
import React, {useState} from 'react';
import { UserContextProvider } from './Components/UserContext';
import 'tailwindcss/tailwind.css';
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';
import LandingPage from './Pages/LandingPage';
import Dashboard from './Pages/Dashboard';
import MyCertificate from './Pages/MyCertificate';
import MyReservations from './Pages/MyReservations';
import MyResults from './Pages/MyResults';
import Reserve from './Pages/Reserve';
import CreateAccount from './Pages/CreateAccount';
import VenueAndItsSession from './Pages/VenueAndItsSession';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import {BrowserRouter as Router, Route, Routes, useLocation} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function RoutesWithSidebar() {
  
  const location = useLocation();
  const pageRoutes = ["/dashboard", "/certificate", "/myreservations", "/results", "/reserve", "/venue-and-session","/profile"];

  return (
    <>
      {pageRoutes.includes(location.pathname) && <Sidebar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/certificate" element={<MyCertificate />} />
        <Route path="/myreservations" element={<MyReservations />} />
        <Route path="/results" element={<MyResults />} />
        <Route path="/reserve" element={<Reserve />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/login" element={<Login />} />
        <Route path='/venue-and-session' element={<VenueAndItsSession/>} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}


function App() {
   const [user, setUser] = useState(null);
   
  //  const handleLogin = (phone, password) => {
  //   fetch('https://rsallies.azurewebsites.net/api/user/authenticate', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ phone, password }),
  //   })
  //   .then(response => {
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  //     return response.json();
  //   })
  //   .then(data => {
  //     if (data.isSuccess) {
  //       console.log(data);
  //       setUser(data.value);
  //     } else {
  //       // Handle login failure...
  //     }
  //   })
  //   .catch((error) => {
  //     console.error('Error:', error);
  //     // Handle error...
  //   });
  // };

  return (
    <div className="App">
      <Router>
      
      <UserContextProvider value={{ user, setUser }}>
        <Navbar />
          <RoutesWithSidebar />
        </UserContextProvider>
      </Router>
    </div>
  );
}
export default App;