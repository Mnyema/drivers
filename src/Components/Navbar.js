import React, {useState, useEffect, useContext} from 'react';
import EastIcon from '@mui/icons-material/East';
import {NavLink} from 'react-router-dom';
import '../App.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {UserContext} from './UserContext';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const [firstName, setFirstName] = useState('');
    const location = useLocation();

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
      };
      const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
          backgroundColor: '#44b700',
          color: '#44b700',
          boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
          '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
          },
        },
        '@keyframes ripple': {
          '0%': {
            transform: 'scale(.8)',
            opacity: 1,
          },
          '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
          },
        },
      }));

      function stringToColor(string) {
        let hash = 0;
        let i;
      
        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
          hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
      
        let color = '#';
      
        for (i = 0; i < 3; i += 1) {
          const value = (hash >> (i * 8)) & 0xff;
          color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */
      
        return color;
      }
      
      function stringAvatar(name) {
        return {
          sx: {
            bgcolor: stringToColor(name),
          },
          children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
      }

    useEffect(() => {
        // Fetch the user's data when the component mounts
        fetch('https://rsallies.azurewebsites.net/api/users')
          .then(response => response.json())
          .then(data => {
            console.log(data);
            setFirstName(data.firstName)
        });
      }, []);

      useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem('user'));
        console.log(loggedInUser);
        setUser(loggedInUser);
    }, []);

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        
        <nav className='h-14  bg-blue-100 max-w-full nav-content' style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
             alignItems: 'center',
             width:'100%',
             }}>
            <h1 className='ml-20 font-bold font-mono text-2xl  text-blue-900'>Safer Driving</h1>
            <ul style={{ display: 'flex',
             listStyle: 'none',
              gap: '25px',
              display:'flex',
              alignItems:'center',
              justifyContent:'center',
              height:'95%'
            }}
             className='mr-20  mt-4'>
                <li className='nav-item '><NavLink exact="true" to="/" activeclassname="active-link">Welcome</NavLink></li>
                <li className='nav-item'><NavLink to="/about" activeclassname="active-link">About</NavLink></li>
                <li className='nav-item'><NavLink to="/contact" activeclassname="active-link">Contact</NavLink></li>
                <li className='nav-item'><NavLink to="/services" activeclassname="active-link">Services</NavLink></li>
                <li> | </li>
                <li className='nav'>
                {["/dashboard", "/certificate", "/myreservations", "/results", "/reserve", "/venue-and-session","/profile"].includes(location.pathname) && (
                      <div onClick={toggleDropdown} className='flex items-center position-relative account-div'
                      style={{height:'80%', width:'80%'}} >
                
                    <StyledBadge
                     overlap="circular"
                     anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                     variant="dot"
                     >
                     <Avatar {...stringAvatar(`${user?.firstName} ${user?.lastName}`)}  />
                    </StyledBadge>
                    
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
                                
                                
                                <li><NavLink to="/profile" activeClassName="active-link">
                                    <span><ManageAccountsIcon fontSize='medium'/> </span>Profile
                                    </NavLink></li>
                                
                                <li onClick={logout}><NavLink to="/logout" activeClassName="active-link">
                                   <span><LogoutIcon fontSize='medium'/> </span> Logout
                                    </NavLink></li>
                            </ul>
                            )}
                    </div>
                )}
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;