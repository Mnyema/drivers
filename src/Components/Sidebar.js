import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { NavLink} from 'react-router-dom';
import '../App.css';
import GridViewIcon from '@mui/icons-material/GridView';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import PlusOneIcon from '@mui/icons-material/PlusOne';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import AssessmentIcon from '@mui/icons-material/Assessment';
import HomeIcon from '@mui/icons-material/Home';
import CloseIcon from '@mui/icons-material/Close';


const Sidebar = ({ onClick }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [language, setLanguage] = useState('english');
    const [activeItem, setActiveItem] = useState('');
    const [sidebarWidth, setSidebarWidth] = useState('100');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
      };

    const handleLanguageChange = (newLanguage) => {
        setLanguage(newLanguage);
      };

      const [isOpen, setIsOpen] = useState(false);

      const toggleDropdown = () => {
          setIsOpen(!isOpen);
      };
      const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
      };
      const isMediumScreen = window.matchMedia('(min-width: 768px)').matches;
      const isSmallScreen = window.matchMedia('(max-width: 768px)').matches;

      useEffect(() => {
        //console.log('isSidebarOpenm:', isSidebarOpen);
      }, [isSidebarOpen]);
  
    return (
        <div className={`sidebar ${isSidebarOpen ? 'open' : 'hidden'}`}>
    <div className='flex' style={{height:'100vh', position:'fixed', width:isSmallScreen?'100vw':''}}>

        <div className="sidebar-container w-64 flex-1 bg-primary" style={{ width:isSmallScreen?'100vw':'', top:'0',left:'0'}}>
            
            <ul className="sidebar-list text-lg mt-6" style={{ width:isSmallScreen?'90vw':'', top:'0', left:'0'}}>
            {/* <li style={{ display: isSmallScreen ? 'flex' : 'none', justifyContent: 'flex-end' }}>
            <CloseIcon onClick={() => { 
            console.log('isSidebarOpen before click:', isSidebarOpen); // Log before click
         toggleSidebar(); 
         if (isSmallScreen) setIsSidebarOpen(false); 
          console.log('isSidebarOpen after click:', isSidebarOpen); // Log after click
         }} style={{ color: 'white' }} />
          </li> */}
          <li style={{ display: isSmallScreen ? 'flex' : 'none', justifyContent: 'flex-end' }}>
        <CloseIcon
          onClick={() => {
            onClick(); // Toggle Sidebar
          }}
          style={{ color: 'white' }}
        />
      </li>
            <li style={{display:isSmallScreen?'none':'flex', alignItems:'center', justifyContent:'center', height:'50px'}}>
            <h1 className='text-2xl text-blue-100 font-mono font-bold ' style={{display:'flex', alignItems:'center', justifyContent:'center'}}>Driver-Centric Theoretical Testing System</h1>
            </li>
            <hr style={{display:isSmallScreen?'none':'flex'}}/>
            <li className='sidebar-item' >
            <NavLink to="/dashboard" activeclassname="active" onClick={() => isSmallScreen && setIsSidebarOpen(false)}>
                        <span><GridViewIcon/></span> Dashboard
                    </NavLink>
                </li>
                <li className="sidebar-item">
                    <NavLink to="/reserve" activeclassname="active">
                        <span><AddLocationIcon/></span> Book seat
                    </NavLink>
                </li>
                <li className="sidebar-item">
                    <NavLink to="/myreservations" activeclassname="active">
                        <span><EventSeatIcon/></span>  Bookings
                    </NavLink>
                </li>
                <li className="sidebar-item" >
                    <NavLink to="/results"  activeclassname="active">
                        <span><AssessmentIcon/></span>  Results
                    </NavLink>
                </li>
                <li className="sidebar-item">
                    <NavLink to="/certificate" activeclassname="active">
                        <span><WorkspacePremiumIcon/></span>  Certificate
                    </NavLink>
                </li>
                
                
               
            </ul>
        </div>

        <div className='inherit-sidebar flex-2 bg-red-100'>

        </div>



    </div>
</div>
    );
};

export default Sidebar;