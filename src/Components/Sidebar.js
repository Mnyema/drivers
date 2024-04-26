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


const Sidebar = () => {

    const [activeItem, setActiveItem] = useState('');
  
    return (
    <div className='flex' style={{height:'calc(100vh-56px)', position:'fixed'}}>

        <div className="sidebar-container w-64 flex-1">
            
            <ul className="sidebar-list text-lg mt-6">
           
            <li className='sidebar-item'>
                    <NavLink to="/dashboard" activeclassname="active">
                        <span><HomeIcon/></span> Home
                    </NavLink>
                </li>
                <li className="sidebar-item">
                    <NavLink to="/reserve" activeclassname="active">
                        <span><AddLocationIcon/></span> Reserve a seat
                    </NavLink>
                </li>
                <li className="sidebar-item">
                    <NavLink to="/myreservations" activeclassname="active">
                        <span><EventSeatIcon/></span> My Reservations
                    </NavLink>
                </li>
                <li className="sidebar-item" >
                    <NavLink to="/results"  activeclassname="active">
                        <span><AssessmentIcon/></span> My Results
                    </NavLink>
                </li>
                <li className="sidebar-item">
                    <NavLink to="/certificate" activeclassname="active">
                        <span><WorkspacePremiumIcon/></span> My Certificate
                    </NavLink>
                </li>
                
                
               
            </ul>
        </div>

        <div className='inherit-sidebar flex-2 bg-red-100'>

        </div>



    </div>
    );
};

export default Sidebar;