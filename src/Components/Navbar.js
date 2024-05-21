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
import Language from './language';
import MenuIcon from '@mui/icons-material/Menu';
import LanguageIcon from '@mui/icons-material/Language';
import CloseIcon from '@mui/icons-material/Close';

const Navbar = () => {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const [firstName, setFirstName] = useState('');
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [language, setLanguage] = useState('swahili');

    const handleLanguageChange = (newLanguage) => {
      setLanguage(newLanguage);
    };

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
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
    const isMediumScreen = window.matchMedia('(min-width: 768px)').matches;
    const isSmallScreen = window.matchMedia('(max-width: 768px)').matches;

    return (
        
        <nav className='h-14  nav-content' style={{ 
            display: 'flex',
            flexDirection: 'row', 
            justifyContent: 'flex-end',
             alignItems: 'center',
             width:'100%',
             position:'fixed',
             marginBottom:'0',
             backgroundColor:'rgba(0, 0, 0, 0.3)',
             backdropFilter: 'blur(10px)',
             WebkitBackdropFilter: 'blur(10px)', 
             }}>
           <span className={language === 'english' ? '' : 'hidden'}> <h1 className=' ml-5 font-mono text-xl   text-blue-100' style={{flex:'3'}}>Driver-Centric Theoretical Testing System</h1></span>
           <span className={language === 'swahili' ? '' : 'hidden'}> <h1 className=' ml-5 font-mono text-xl   text-blue-100' style={{flex:'3'}}>Mfumo wa Kupima Nadharia ya Udereva</h1></span>

         
      
            <ul className='hidden md:flex md:flex-row md:items-center md:gap-10' style={{ display: 'flex',
             listStyle: 'none',
             flex: '2',
              gap: '25px',
              display:'flex',
              alignItems:'center',
              justifyContent:'flex-end',
              height:'100%',
              color:'white',
              marginTop:'0',
              margin:'0',
              padding:'0',
              marginRight:'10px',
            }}
             >
                <li className='nav-item' style={{display: isSmallScreen ? 'none' : 'block'}}>
                 <span className={language === 'english' ? '' : 'hidden'}> <NavLink exact="true" to="/" activeclassname="active-link" >Welcome</NavLink></span>
                 <span className={language === 'swahili' ? '' : 'hidden'}> <NavLink exact="true" to="/" activeclassname="active-link" >Mwanzo</NavLink></span>
                 </li>
                <li className='nav-item' style={{display: isSmallScreen ? 'none' : 'block'}}>
                <span className={language === 'english' ? '' : 'hidden'}><NavLink to="/about" activeclassname="active-link">About</NavLink></span>
                <span className={language === 'swahili' ? '' : 'hidden'}> <NavLink to="/about" activeclassname="active-link">Kuhusu Sisi</NavLink></span>
                </li>
                <li className='nav-item' style={{display: isSmallScreen ? 'none' : 'block'}}>
                <span className={language === 'english' ? '' : 'hidden'}> <NavLink to="/contact" activeclassname="active-link">Contact</NavLink></span>
                <span className={language === 'swahili' ? '' : 'hidden'}><NavLink to="/contact" activeclassname="active-link">Mawasiliano</NavLink></span>
                </li>
               
    <li>
    <div className="btn-group" style={{zIndex:'9999'}}>
    <button type="button" className="btn btn-danger">
    {isSmallScreen ? 
        <LanguageIcon /> : 
        <>
        <span className={language === 'swahili' ? '' : 'hidden'}>Lugha</span>
        <span className={language === 'english' ? '' : 'hidden'}>Language</span>
      </>
      }
    </button>
    <button type="button" className="btn btn-danger btn-sm dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
        <span className="visually-hidden">Toggle Dropdown</span>
    </button>
    <ul className="dropdown-menu" style={{position:'relative',
                           // top:'50px',
                           // right:'-50px',
                            backgroundColor:'white',
                           // padding:'10px',  
                            boxShadow:'0 0 10px rgba(0,0,0,0.1)', 
                            listStyle:'none', 
                            zIndex:9000,
                           // width:'100px'
                        }}>
        <li style={{cursor:'pointer' }} onClick={() => handleLanguageChange('english')}>
          <span className="dropdown-item language">English</span>
          </li>
        <li style={{cursor:'pointer' }} onClick={() => handleLanguageChange('swahili')}>
          <span className="dropdown-item language">Swahili</span>
          </li>
    </ul>
</div>
  </li>

  
                {/* <li className='nav'>
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
                </li> */}
            </ul>

            <button type='button'
        className="btn  btn-sm md:hidden hide-on-md"
        onClick={toggleMenu}
        style={{ marginRight: '10px',
        display: isMediumScreen ? 'none' : 'block',
       }}
      >
        <MenuIcon color='action' style={{color:'white'}}/>
      </button>

{/* Small Screens: Menu Content (Displayed conditionally) */}
 <ul
  className={`ul-div md:hidden  hide-on-md ${isMenuOpen ? 'ul-block' : 'ul-hidden'}`}
  style={{
    display: isMediumScreen ? 'none' : 'flex',
    //display: 'flex',
    listStyle: 'none',
    flexDirection: 'column',
    gap: '10px',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '100vh',
    width: '100%',
    backgroundColor:'rgba(0,0,0,0.9)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    position: 'fixed',
    top: '0',
    left: '0',
    zIndex: 10000,
    color:'white',
    padding:'30px'
  }}
> 
<li style={{display:'flex', justifyContent:'flex-end'}}>
{isMenuOpen && <CloseIcon onClick={() => setIsMenuOpen(false)} />}
</li>
  <li className="nav-item2">
    <NavLink exact="true" to="/" activeclassname="active-link" onClick={toggleMenu}>
      Welcome
    </NavLink>
  </li>
  {/* <hr style={{width:'100%', color:'white'}}/> */}
  <li className="nav-item2">
    <NavLink to="/about" activeclassname="active-link" onClick={toggleMenu}>
      About
    </NavLink>
  </li>
  <li className="nav-item2">
    <NavLink to="/contact" activeclassname="active-link" onClick={toggleMenu}>
      Contact
    </NavLink>
  </li>
</ul> 


        </nav>
    );
};

export default Navbar;