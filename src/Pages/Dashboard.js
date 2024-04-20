import React, {useEffect, useState} from 'react';
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
import { useContext } from 'react';
import { UserContext } from '../Components/UserContext';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
// import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";



function Dashboard() {
  const { user } = useContext(UserContext);
  const [booking, setBooking] = useState(null);

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
       <div style={{display:'flex', flexDirection:'column', backgroundColor:'red'}}>
        <div className='dashboard-container ' style={{ display:'flex',flex:'8'}} >
            <div className='sidebar' style={{ flex: '1' }}>
                <Sidebar/>
            </div>
            
            <div className='right-space' style={{ flex: '4' }}>
              <div  className='dashboard-content' >
                <div className='welcome-div ml-3 '>
                <Card style={{height:'80%', width:'95%', boxShadow:'0 0 10px rgba(0,0,0,0.1)', }}>
                <Card.Body className='mt-2 ml-3 text-2xl font-semibold' >Welcome 
                <span className='text-blue-800 font-mono text-3xl'> {user.firstName} </span></Card.Body>
                </Card> 
                </div>
                <div className='two-content'>
                <div className='content-one mb-2'>
                    <div className='aboutYou-div ml-7' >
                        <div className='reservation-div'>
                          <Card style={{height:'100%', width:'100%', borderColor:'cyan'}}>
                          <Card.Body>
  <Card.Title>Upcoming Reservation <span><AccessAlarmIcon color='warning'/></span></Card.Title>
  {booking && booking.isSuccess && booking.value && booking.value.code !== 'GetCurrentBooking.NoBooking' ? (
    <Card.Text>
      Your reservation for the venue <span className='text-orange-900'>{booking.value.venueName} </span> 
       in <span className='text-orange-900'>{booking.value.venueAddress} </span>
      on <span className='text-orange-900'>{new Date(booking.value.sessionDate).toLocaleDateString()} </span>
      at <span className='text-orange-900'>{new Date(booking.value.sessionDate).toLocaleTimeString()} </span> is coming soon!
    </Card.Text>
  ) : (
    <Card.Text>Your Upcoming reservation will appear here</Card.Text>
  )}
</Card.Body>
                          </Card>
                        </div>
                        <div className='achievement-div'>
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
                    
                    <div className='tips-div' style={{display:'flex', flexDirection:'column'}}>
                        
   <div style={{flex:'1'}}>
<p className='ml-5 text-slate-400 '>- Road Safety Tips -</p>
   </div>
<div className='carousel-div' style={{flex:'8',display:'flex', alignItems:'center',justifyContent:'center'}}> 
<Carousel style={{height:'95%', width:'95%', backgroundColor:'', }}>
<Carousel.Item style={{ height:'180px',position:'relative', paddingBottom: '50px'}}>
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
  <Carousel.Item style={{ height:'180px',position:'relative', paddingBottom: '50px'}}>
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
  <Carousel.Item style={{ height:'180px',position:'relative', paddingBottom: '50px'}}>
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
  <Carousel.Item style={{ height:'180px',position:'relative', paddingBottom: '50px'}}>
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
  <Carousel.Item className='data-bs-interval=10000' style={{ height:'180px',position:'relative', paddingBottom: '50px'}}>
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
                    <div className='other-div 'style={{display:'flex', flexDirection:'column'}}>
                    <div className='ml-4'><p style={{flex:'1', margin:'0', padding:'0'}} className='text-slate-400'>
                      - Documents -</p></div>
                    <div className='docs-div' style={{flex:'5',margin:'0', padding:'0', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center', gap:'5px', marginRight:'5px'}}>
                    <div className='doc-one bg-white' 
                    style={{flex:'1',height:'90%', display:'flex', flexDirection:'row', borderColor:"blue", alignItems:'center', justifyContent:'center'}}>
                      <div className='img-div ' style={{flex:'1', height:'90%', display:'flex', alignItems:'center',justifyContent:'center'}}>
                        <img src={Law} alt='' style={{height:'70%', width:'70%', borderRadius:'5px'}}/>
                      </div>
                      <div className='doc-div ' style={{flex:'2', height:'90%', display:'flex', alignItems:'center',justifyContent:'center'}}>
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
                      <div className='doc-div ' style={{flex:'2', height:'90%', display:'flex', alignItems:'center',justifyContent:'center'}}>
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
                      <div className='doc-div ' style={{flex:'2', height:'90%', display:'flex', alignItems:'center',justifyContent:'center'}}>
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
        <div className='footer-div bg-red-100' style={{flex:'1'}}>

        </div>

        </div>
    );
}

export default Dashboard;