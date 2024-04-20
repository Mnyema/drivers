import React, {useState, useEffect, useContext} from 'react';
import EastIcon from '@mui/icons-material/East';
import {NavLink} from 'react-router-dom';
import '../App.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {UserContext} from './UserContext';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

const Navbar = () => {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const [firstName, setFirstName] = useState('');

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
      };

    useEffect(() => {
        // Fetch the user's data when the component mounts
        fetch('https://rsallies.azurewebsites.net/api/users')
          .then(response => response.json())
          .then(data => {
            console.log(data);
            setFirstName(data.firstName)
        });
      }, []);

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        
        <nav className=' h-14 bg-blue-100' style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
             alignItems: 'center',
            
             width:'100vw'}}>
            <h1 className='ml-20 font-bold font-mono text-2xl text-blue-900'>Safer Driving</h1>
            <ul style={{ display: 'flex', listStyle: 'none', gap: '25px' }} className='mr-20 text-lg mt-4'>
                <li className='nav-item '><NavLink exact="true" to="/" activeclassname="active-link">Welcome</NavLink></li>
                <li className='nav-item'><NavLink to="/about" activeclassname="active-link">About</NavLink></li>
                <li className='nav-item'><NavLink to="/contact" activeclassname="active-link">Contact</NavLink></li>
                <li className='nav-item'><NavLink to="/services" activeclassname="active-link">Services</NavLink></li>
                <p> | </p>
                <li className='nav-item'>
                    {/* <NavLink to="/login" activeClassName="active-link"><AccountCircleIcon/></NavLink> */}
                    <div onClick={toggleDropdown} className='flex items-center position-relative' >
                        <AccountCircleIcon className='mt-1' fontSize='medium'/>
                        {isOpen && (
                            <ul className='text-base'
                            style={{ position:'absolute',
                            top:'50px',
                            right:'-50px',
                            backgroundColor:'white',
                            padding:'10px',  
                            boxShadow:'0 0 10px rgba(0,0,0,0.1)', 
                            listStyle:'none', 
                            zIndex:1000,
                            width:'100px'
                            }}>
                                
                                <li><NavLink to="/profile" activeClassName="active-link">{firstName}</NavLink></li>
                                
                                <li><NavLink to="/profile" activeClassName="active-link">
                                    <span><ManageAccountsIcon fontSize='medium'/> </span>Profile
                                    </NavLink></li>
                                
                                <li onClick={logout}><NavLink to="/logout" activeClassName="active-link">
                                   <span><LogoutIcon fontSize='medium'/> </span> Logout
                                    </NavLink></li>
                            </ul>
                            )}
                    </div>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;