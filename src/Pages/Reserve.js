import React from 'react';
import '../App.css';
import Sidebar from '../Components/Sidebar';
import { Component } from 'react';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from 'axios';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Accordion from 'react-bootstrap/Accordion';
import img6 from '../Images/pexels-polina-zimmerman-3747486.jpg'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Link } from 'react-router-dom';
import NavbarTwo from '../Components/NavbarTwo';

class Reserve extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
            language: 'swahili',
        };
        this.isMediumScreen = window.matchMedia('(min-width: 768px)').matches;
        this.isSmallScreen = window.matchMedia('(max-width: 768px)').matches;
    this.state = {
        regionsInTanzania: [
            "Arusha",
            "Dar es Salaam",
            "Dodoma",
            "Geita",
            "Iringa",
            "Kagera",
            "Katavi",
            "Kigoma",
            "Kilimanjaro",
            "Lindi",
            "Manyara",
            "Mara",
            "Mbeya",
            "Mjini Magharibi (Zanzibar)",
            "Morogoro",
            "Mtwara",
            "Mwanza",
            "Njombe",
            "Pemba North",
            "Pemba South",
            "Pwani",
            "Rukwa",
            "Ruvuma",
            "Shinyanga",
            "Simiyu",
            "Singida",
            "Songwe",
            "Tabora",
            "Tanga",
            "Unguja North (Zanzibar)",
            "Unguja South (Zanzibar)"
        ],
        venues: [],
        selectedRegion: '',
        selectedDate: '',
        filteredSessions: [],
    };
}
  

    componentDidMount() {
        axios.get('https://rsallies.azurewebsites.net/api/venues')
            .then(response => 
                // console.log(response.data.value) ||
                this.setState({ venues: response.data.value }));
    }
    filterSessions(region, date) {
        console.log(date, region);
        if (!date || isNaN(Date.parse(date))) {
            console.error('Invalid date:', date);
            return;
        }
        const isoDate = new Date(date).toISOString();
        fetch(`https://rsallies.azurewebsites.net/api/sessions/filter/region/${region}/date/${isoDate}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                let sessions = data.value;
                let filteredSessions = sessions.filter(session => session.isFull === false);
                console.log(filteredSessions);
                this.setState({ filteredSessions: filteredSessions });
            })
            .catch(error => console.error(error));
    }
    


    render() {
    return (
        <div className='reserve-container' style={{ display:'flex',flexDirection:'row',position:'fixed', backgroundColor: '#f9f5fd'}}>
             {!this.isSmallScreen && (
      <div className='sidebar' style={{ flex: '1'}}>
        <Sidebar/>
      </div>
    )}
            <div className='reserve-div' style={{flex:'4', padding:'5px', backgroundColor:'#f9f5fd'}}>
                <div className='navtwo' style={{flex:'1'}}>
                    <NavbarTwo/>
                </div>
                <div className='content after-navtwo' style={{ flex:'9',overflow:'auto', marginTop:this.isSmallScreen?'20px':''}}>
                
            <p className='text-base ml-5'>
            {this.state.language === 'english' ? 'Book a venue for your theoretical driving test here' : 'Weka nafasi yakofanya mtihani wa nadharia ya udereva hapa'}
                </p>

            <Accordion   style={{width:'96%', marginLeft:'20px'}}>
      <Accordion.Item eventKey="0">
        <Accordion.Header>{this.state.language === 'english' ? 'Find Venue' : 'Tafuta Kituo'}</Accordion.Header>
        <Accordion.Body>
        <form  className=''>
                <div className='filter ' style={{display:'flex', 
                             flexDirection:this.isSmallScreen?'column':'row',
                             justifyContent: 'space-around', 
                             alignItems: 'center',
                             width: '100%',
                             gap:this.isSmallScreen?'': '20px'
                           }}>
                
                <div className='form-floating mb-3 flex-1 ' style={{width:this.isSmallScreen?'100%':'', }}>
                    <select className='form-control' id='region' name='region' 
                    required
                    onChange={e => this.setState({ selectedRegion: e.target.value })}>
                        <option value='' className=''> </option>
                        {this.state.regionsInTanzania.map(region => (
                            <option key={region} value={region}>{region}</option>
                        ))}
                    </select>
                    <label htmlFor='floatingSelect' className='text-primary text-lg'><span><LocationOnIcon/></span> {this.state.language === 'english' ? 'Region' : 'Mkoa'}</label>
                </div>
                <div className='form-floating mb-3 flex-1 ' style={{width:this.isSmallScreen?'100%':'', }}>
                    <select className='form-control' id='district' name='district' 
                    required
                    onChange={e => this.setState({ selectedRegion: e.target.value })}>
                        <option value='' className=''> </option>
                        
                            <option  value=''>{this.state.language === 'english' ? 'District' : 'Wilaya'}</option>
                        
                    </select>
                    <label htmlFor='floatingSelect' className='text-primary text-lg'><span><LocationOnIcon/></span> {this.state.language === 'english' ? 'District' : 'Wilaya'}</label>
                </div>
                <div className='flex-1  '
                style={{display:'flex', alignItems:'center', justifyContent:'center', width:this.isSmallScreen?'100%':'', }}>
                  <button onClick={()=>this.filterSessions(this.state.selectedRegion, this.state.selectedDate)} className="btn btn-primary mb-3 filter-btn"
                  style={{width:'250px', height:'50px' }}>{this.state.language === 'english' ? 'Filter' : 'Tafuta'} <span><FilterAltIcon/></span></button>
                  </div>
                </div>
                
            </form>

        </Accordion.Body>
      </Accordion.Item>
           </Accordion>
            
            <div className='d-flex flex-wrap justify-content-around ml-0 mt-3'>
            { this.state.venues.map(venue => (

                      <Link to={`/venue-and-session?venueId=${venue.id}`} className='venue-item' style={{textDecoration:'none'}} key={venue.id}>
                        <Card style={{ width:this.isSmallScreen?'95vw': '18rem', height:'14rem', boxShadow: '0 0 8px rgba(0,0,0,0.1)', cursor:'pointer'}} className='m-2  venue-card' key={venue.id}>
                          <Card.Img variant="top" src={img6} style={{width:this.isSmallScreen?'100%':'18rem', height:'8rem'}} />
                          <Card.Body className='text-sm' style={{transition: 'box-shadow .3s ease', boxShadow: '0 0 10px rgba(0,0,0,0)', height:'5rem'}}>
                           <Card.Title className='text-sm'>{venue.name}</Card.Title>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                             <Card.Text>
                               {venue.address}<br/>
                            </Card.Text>
                            {/* <button className="btn btn-primary mt-0 " style={{borderRadius:'20px', alignSelf: 'flex-end', height:'30px', width:'120px', alignItems:'center', justifyContent:'center'}} onClick={() => this.handleVenueBooking(venue)}>Book</button> */}
                            </div>
                         </Card.Body>
                        </Card>
                        </Link>
                    ))}
                </div>
                
            




            </div>
            
            
        </div>
        </div>
    );
}

}



export default Reserve;
