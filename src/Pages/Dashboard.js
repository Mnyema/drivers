import React, {useEffect, useState, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import { UserContext } from '../Components/UserContext';
import '../App.css';
import Sidebar from '../Components/Sidebar';
import WelcomeMessage from '../Components/WelcomeMessage';
import { Card } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import SlideOneImage from '../Images/pexels-kelly-3119975.jpg';
import SlideTwoImg from '../Images/pexels-dvaughnbell-2068664.jpg';
import SlideThreeImg from '../Images/pexels-ron-lach-9518015.jpg';
import SlideFourImg from '../Images/pexels-maltelu-1397751.jpg';
import SlideFiveImg from '../Images/mechanic-hand-checking-fixing-broken-car-car-service-garage.jpg';
import Law from '../Images/pexels-sora-shimazaki-5669602.jpg';
import Tanzania from '../Images/tanzaniaEmblem.jpg';
import Driving from '../Images/pexels-jeshoots-com-147458-13861.jpg';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import NavbarTwo from '../Components/NavbarTwo';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import LanguageIcon from '@mui/icons-material/Language';
import Language from '../Components/language';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import { Avatar } from '@mui/material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';
import { NavLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';


function Dashboard() {
  //const { user } = useContext(UserContext);
  const [booking, setBooking] = useState(null);
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

  useEffect(() => {
    if (user && user.id) {
      fetch(`https://rsallies.azurewebsites.net/api/bookings/user/${user.id}/current-booking`)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setBooking(data)})
        .catch(error => console.error('Error:', error));
    }
  }, [user]);

    return (
       <div style={{ backgroundColor:'#f9f5fd', position:'fixed'}}>
        <div className='dashboard-container ' style={{ display:'flex',flexDirection:'row'}} >
        {!isSmallScreen && (
        <div className='sidebar' style={{ flex: '1'}}>
          <Sidebar/>
        </div>
      )}
            
            <div className='right-space' style={{ flex: '4', width:isSmallScreen?'100vw':'100%', backgroundColor:'#f9f5fd' }}>
              <div  className='dashboard-content' >
                <div className='welcome-div mt-2 mb-2 bg-white '
                 style={{height:'100%', display:'flex',
                  flexDirection:'row', boxShadow:'0 0 10px 0 rgba(0,0,0,0.1)', 
                  padding:'8px', marginLeft:isMediumScreen?'15px':'', marginRight:isMediumScreen?'15px':''}}>
                <button type='button'
        className="btn  md:hidden hide-on-md"
        onClick={toggleSidebar}
        style={{ marginLeft:'10px',
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
                <div className='mr-4' style={{display:'flex', flexDirection:'row', gap:'20px', justifyContent:'flex-end', flex:'1'}}>
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
                <div className='two-content'>
                <div className='content-one mb-2'>
                    <div className={`aboutYou-div ${isSmallScreen ? 'ml-3' : 'ml-7'}`} style={{flexDirection:isSmallScreen?'column':'row'}} >
                        <div className='reservation-div'>
                          <Card style={{height:'100%', width:'100%', borderColor:'cyan'}}>
                          <Card.Body>
  <Card.Title>Upcoming Test <span><AccessAlarmIcon color='warning'/></span></Card.Title>
  {booking && booking.isSuccess && booking.value && booking.value.code !== 'GetCurrentBooking.NoBooking' ? (
    <Card.Text>
      Your test at venue <span className='text-orange-900'>{booking.value.venueName} </span> 
       in <span className='text-orange-900'>{booking.value.venueAddress} </span>
      on <span className='text-orange-900'>{new Date(booking.value.sessionDate).toLocaleDateString()} </span>
      at <span className='text-orange-900'>{new Date(booking.value.sessionDate).toLocaleTimeString()} </span> is coming soon!
    </Card.Text>
  ) : (
    <Card.Text>Your Upcoming test will appear here</Card.Text>
  )}
</Card.Body>
                          </Card>
                        </div>
                        <div className='achievement-div' style={{display:isSmallScreen?'none':'flex'}}>
                        <Card style={{height:'100%', width:'100%', borderColor:'orange'}}>
                            <Card.Body>
                                <Card.Title>One Step To Go!</Card.Title>
                                <Card.Text>
                                    Take your theoretical driving test and you see your achievements here
                                </Card.Text>
                            </Card.Body>
                          </Card>
                        </div>

                    </div>
                    
<div className='tips-div ' style={{display:'flex', flexDirection:'column'}}>
                        
<div className='carousel-div mt-2' style={{display:'flex', alignItems:'center',justifyContent:'center'}}> 
<Carousel style={{height:'90%', width:'95%', backgroundColor:'', }}>
<Carousel.Item style={{ height:'230px',position:'relative', paddingBottom: '50px'}}>
    <div style={{
      height: '140%',
      backgroundImage: `url(${SlideOneImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }} />
    <Carousel.Caption className='text-white' style={{
      backgroundColor:'rgba(0, 0, 0, 0.4)',
      position:'absolute',
      top:'80%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '100%',
      height:'100%',
      textAlign: 'center'
    }}>
      <h6>Always Wear Seatbelts</h6>
      <p>Seatbelts reduce the risk of death by 45% and cut the risk of serious injury by 50%.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item style={{ height:'230px',position:'relative', paddingBottom: '50px'}}>
    <div style={{
      height: '140%',
      backgroundImage: `url(${SlideTwoImg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }} />
    <Carousel.Caption className='text-white' style={{
      backgroundColor:'rgba(0, 0, 0, 0.4)',
      position:'absolute',
      top:'80%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '100%',
      height:'100%',
      textAlign: 'center'
    }}>
      <h6>Don't Use Your Phone While Driving</h6>
      <p>Texting while driving increases the chances of a crash by 23 times.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item style={{ height:'230px',position:'relative', paddingBottom: '50px'}}>
    <div style={{
      height: '140%',
      backgroundImage: `url(${SlideThreeImg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }} />
    <Carousel.Caption className='text-white' style={{
      backgroundColor:'rgba(0, 0, 0, 0.4)',
      position:'absolute',
      top:'80%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '100%',
      height:'100%',
      textAlign: 'center'
    }}>
      <h6>Be Aware of Your Surroundings</h6>
      <p> Check your mirrors frequently and scan conditions 20 to 30 seconds ahead of you.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item style={{ height:'230px',position:'relative', paddingBottom: '50px'}}>
    <div style={{
      height: '140%',
      backgroundImage: `url(${SlideFourImg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }} />
    <Carousel.Caption className='text-white' style={{
      backgroundColor:'rgba(0, 0, 0, 0.7)',
      position:'absolute',
      top:'80%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '100%',
      height:'100%',
      textAlign: 'center'
    }}>
      <h6>Use Turn Signals</h6>
      <p>Always use your turn signals, even if you think no one is around.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item className='data-bs-interval=10000' style={{ height:'230px',position:'relative', paddingBottom: '50px'}}>
    <div style={{
      height: '140%',
      backgroundImage: `url(${SlideFiveImg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }} />
    <Carousel.Caption className='text-white' style={{
      backgroundColor:'rgba(0, 0, 0, 0.4)',
      position:'absolute',
      top:'80%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '100%',
      height:'100%',
      textAlign: 'center'
    }}>
      <h6>Regular Vehicle Maintenance</h6>
      <p> Check your vehicle's oil, tire pressure, and lights regularly to prevent breakdowns.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>

</div>

                    </div>
                    <div className='other-div'style={{display:'flex', flexDirection:'column'}}>
                      <div className='ml-4'><p style={{flex:'1', margin:'0', padding:'0'}} className='text-slate-400'>
                      - Documents -</p>
                      </div>
                    <div className='docs-div' style={{flex:'5',margin:'0', padding:'0', display:'flex', flexDirection:isSmallScreen?'column': 'row', alignItems:'center', justifyContent:'center', gap:'5px', marginRight:'5px'}}>
                    <div className='doc-one bg-white' 
                    style={{flex:'1',height:isSmallScreen?'auto': '90%', display:'flex', flexDirection:'row', borderColor:"blue", alignItems:'center', justifyContent:'center'}}>
                      <div className='img-div  ' style={{flex:'1', height:isSmallScreen?'70%': '90%', display:'flex', alignItems:'center',justifyContent:'center'}}>
                        <img src={Law} alt='' style={{height:isSmallScreen?'50%': '70%', width: isSmallScreen?'100%': '70%', borderRadius:'5px'}}/>
                      </div>
                      <div className='doc-div ' style={{flex:'2', height:'80%', display:'flex', alignItems:'center',justifyContent:'center'}}>
                        <a className='text-sm mr-1' href='https://www.latra.go.tz/uploads/documents/sw-1676102731-AMENDMENT.pdf' style={{textDecoration:'none', color:'inherit'}}>
                          Amendment to various Regulations, 2021
                        </a>
                      </div>
                    </div>
                    <div className='doc-one bg-white' 
                    style={{flex:'1',height:'90%', display:'flex', flexDirection:'row', borderColor:"blue", alignItems:'center', justifyContent:'center'}}>
                      <div className='img-div ' style={{flex:'1', height:'90%', display:'flex', alignItems:'center',justifyContent:'center'}}>
                        <img src={Driving} alt='' style={{height:'70%', width:'70%', borderRadius:'5px'}}/>
                      </div>
                      <div className='doc-div ' style={{flex:'2', height:'80%', display:'flex', alignItems:'center',justifyContent:'center'}}>
                        <a className='text-sm mr-1' href='https://tmscheck.com/driving-licence-renewal/' style={{textDecoration:'none', color:'inherit'}}>
                        Driving Licence Renewal in Tanzania | A Complete Guide
                        </a>
                      </div>
                    </div>
                    <div className='doc-one bg-white' 
                    style={{flex:'1',height:'90%', display:'flex', flexDirection:'row', borderColor:"blue", alignItems:'center', justifyContent:'center'}}>
                      <div className='img-div ' style={{flex:'1', height:'90%', display:'flex', alignItems:'center',justifyContent:'center'}}>
                        <img src={Tanzania} alt='' style={{height:'70%', width:'70%', borderRadius:'5px'}}/>
                      </div>
                      <div className='doc-div ' style={{flex:'2', height:'80%', display:'flex', alignItems:'center',justifyContent:'center'}}>
                        <a className='text-sm mr-1' href='https://www.mow.go.tz/uploads/documents/sw-1634716378-A%20Guide%20to%20Traffic%20Signing%202009%20V21.pdf' style={{textDecoration:'none', color:'inherit'}}>
                          A Guide to Traffic Signs, Tanzania
                        </a>
                      </div>
                    </div>
                    </div>
                    </div>
                </div>
                {/* <div className='content-two'>
                <Card style={{height:'98%', width:'95%', borderColor:'greenyellow'}} className=''>
                            <Card.Body>
                                <Card.Title><span><NewspaperIcon color='info'/></span> News</Card.Title>
                                <Card.Text className='text-sm news-card-text'>
                                <li style={{listStyle:'none'}}>
                                  <a style={{textDecoration:'none', color:'inherit'}}
                                   href='https://www.roadtripafrica.com/tanzania/practical-info/driving-in-tanzania'>
                                  Driving in Tanzania | 12 Things You Need to Know - Roadtrip Africa
                                  </a></li> 
                                </Card.Text>
                                <hr />
                                <Card.Text className='text-sm news-card-text'>
                                <li style={{listStyle:'none'}}>
                                  <a style={{textDecoration:'none', color:'inherit'}}
                                   href='https://internationaldriversassociation.com/tanzania-driving-guide/'>
                                  2024 Best Tanzania Driving guide - Learn The Rules and Tips Now
                                  </a></li> 
                                </Card.Text>
                                <hr/>
                                <Card.Text className='text-sm news-card-text'>
                                <li style={{listStyle:'none'}}>
                                  <a style={{textDecoration:'none', color:'inherit'}}
                                   href='https://www.usnews.com/news/health-news/articles/2023-10-03/seniors-here-are-the-meds-that-can-harm-your-driving-skills'>
                                  Seniors, Here Are the Meds That Can Harm Your Driving Skills
                                  </a></li> 
                                </Card.Text>
                                <hr/>
                                <Card.Text className='text-sm news-card-text'>
                                <li style={{listStyle:'none'}}>
                                  <a style={{textDecoration:'none', color:'inherit'}}
                                   href='https://www.usnews.com/news/health-news/articles/2024-03-18/women-more-prone-to-go-into-shock-after-car-crashes-than-men'>
                                  Women More Prone to Go Into Shock After Car Crashes Than Men
                                  </a></li> 
                                </Card.Text>
                                 <hr/>
                                 <Card.Text className='text-sm news-card-text'>
                                <li style={{listStyle:'none'}}>
                                  <a style={{textDecoration:'none', color:'inherit'}}
                                   href='https://www.weforum.org/agenda/2023/02/charted-autonomous-driving-accelerating-mobility/'>
                                  Autonomous driving is racing ahead | World Economic Forum
                                  </a></li> 
                                </Card.Text>
                                <hr/>
                                <Card.Text className='text-sm news-card-text'>
                                <li style={{listStyle:'none'}}>
                                  <a style={{textDecoration:'none', color:'inherit'}}
                                   href='https://allafrica.com/stories/202106100397.html'>
                                 How Electric Vehicles Will Drive Africa's Future Automobiles
                                  </a></li> 
                                </Card.Text>
                            </Card.Body>
                          </Card>
                </div>  */}
                
                </div>
                
              </div>

            </div>
        </div>
        

        </div>
    );
}

export default Dashboard;