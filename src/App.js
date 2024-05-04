
//import './App.css';
import React, {useState} from 'react';
import { UserContextProvider } from './Components/UserContext';
import 'tailwindcss/tailwind.css';
import Navbar from './Components/Navbar';
import NavbarTwo from './Components/NavbarTwo';
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
import Loader from './Components/Loader';
import Footer from './Components/Footer';
import {BrowserRouter , Router, Route, Routes} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  //  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="App">
      <UserContextProvider>
      <BrowserRouter>
      <Routes>
        <Route path='/sidebar' element={ <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />} />
        <Route path='/navbar' element={<Navbar/>} />
        <Route path='/navbartwo' element={<NavbarTwo/>} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/dashboard" element={<Dashboard isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />} />
        <Route path="/certificate" element={<MyCertificate />} />
        <Route path="/myreservations" element={<MyReservations />} />
        <Route path="/results" element={<MyResults />} />
        <Route path="/reserve" element={<Reserve />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/login" element={<Login />} />
        <Route path='/venue-and-session' element={<VenueAndItsSession/>} />
        <Route path="/profile" element={<Profile />} />
        <Route path='/loader' element={<Loader/>} />
      </Routes>
      </BrowserRouter>
      </UserContextProvider>
    </div>
  );
}
export default App;