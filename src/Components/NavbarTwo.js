import React, {useState, useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from './UserContext';
import { Avatar, Badge } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';
import LanguageIcon from '@mui/icons-material/Language';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from './Sidebar';


function NavbarTwo(){
    const isMediumScreen = window.matchMedia('(min-width: 768px)').matches;
      const isSmallScreen = window.matchMedia('(max-width: 768px)').matches;
      const [language, setLanguage] = useState('swahili');
const [isOpen, setIsOpen] = useState(false);
const { user, setUser } = useContext(UserContext);
const navigate = useNavigate();
const [isMenuOpen, setIsMenuOpen] = useState(false);
const [isSidebarOpen, setIsSidebarOpen] = useState(false);

const toggleDropdown = () => {
  setIsOpen(!isOpen);
};

const toggleSidebar = () => {
  setIsSidebarOpen(!isSidebarOpen);
};

useEffect(() => {
  //console.log('isSidebarOpen:', isSidebarOpen);
}, [isSidebarOpen]);

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
      const handleLanguageChange = (newLanguage) => {
        setLanguage(newLanguage);
      };

    return(
        <div className='welcome-div mb-2 bg-white ' style={{ display:'flex',
         flexDirection:'row', zIndex:'10000',
         boxShadow:'0 0 10px 0 rgba(0,0,0,0.1)',
         top:'0',
         width:'100%',
          boxSizing: 'border-box',
         padding:'8px', marginLeft:isMediumScreen?'0':'0'}}>
        <button type='button'
className="btn  md:hidden hide-on-md"
onClick={toggleSidebar}
style={{ marginLeft:'',
display: isMediumScreen ? 'none' : 'flex',
}}
>
<MenuIcon />
</button>
<div
// className={`ul-div md:hidden  hide-on-md ${isSidebarOpen ? 'ul-block' : 'ul-hidden'}`}
style={{
display: isSidebarOpen ? (isMediumScreen ? 'none' : 'flex') : 'none',
alignItems: 'center',
height: '100vh',
width: '100%',
position: 'fixed',
backgroundColor:'pink',
top: '0',
right:'0',
left: '0',
zIndex: 10000,
//padding:'30px',
backdropFilter: 'blur(10px)',
WebkitBackdropFilter: 'blur(10px)',
}}
> 
{/* <li style={{display:'flex', justifyContent:'flex-end'}}>
{isSidebarOpen && <CloseIcon onClick={() => setIsSidebarOpen(false)} style={{color:'white'}} />}
</li> */}
<Sidebar onClick={toggleSidebar}  />
</div> 

       <div className='' style={{display:'flex', flex:'3'}}>
       <h4 className='font-mono font-bold' style={{display:isMediumScreen?'none':''}}> DCTTS 
        {/* <span className='text-blue-900 font-mono text-3xl'> {user.firstName} </span> */}
        </h4>
        </div>
        <div className='' style={{display:'flex', flexDirection:'row', gap:'20px', justifyContent:'flex-end', flex:'1'}}>
        <div className="btn-group" style={{zIndex:'9999', flex:'1', display:'flex'}}>
       <button type="button" className="btn btn-primary  btn-sm">
       {isSmallScreen ? 
         <LanguageIcon /> : 
<>
<span className={language === 'english' ? '' : 'ul-hidden'}>Language</span>
<span className={language === 'swahili' ? '' : 'ul-hidden'}>Lugha</span>
</>
}
</button>
<button type="button" className="btn btn-outline-primary btn-sm dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
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
        
        <div onClick={toggleDropdown} className='flex items-center position-relative account-div'
              style={{height:'80%', width:'80%', flex:'1', display:'flex'}} >
        
            <StyledBadge
             overlap="circular"
             anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
             variant="dot"
             >
             <Avatar {...stringAvatar(`${user?.firstName} ${user?.lastName}`)}  />
            </StyledBadge>
            
                {isOpen && (
                    <ul className='text-base avatar-ul'
                    style={{ position:'absolute',
                    top:'50px',
                    right:'40px',
                    backgroundColor:'white',
                    padding:'10px',  
                    boxShadow:'0 0 10px rgba(0,0,0,0.1)', 
                    listStyle:'none',
                    textDecoration:'none',  
                    zIndex:1000,
                    width:'100px'
                    }}>
                        
                        
                        <li className='navi'><NavLink to="/profile" activeClassName="active-link">
                            <span><ManageAccountsIcon fontSize='medium'/> </span>Profile
                            </NavLink></li>
                        
                        <li className='navi' onClick={logout}><NavLink to="/logout" activeClassName="active-link">
                           <span><LogoutIcon fontSize='medium'/> </span> Logout
                            </NavLink></li>
                    </ul>
                    )}
            </div>


        </div>
        </div>
    )
}export default NavbarTwo;