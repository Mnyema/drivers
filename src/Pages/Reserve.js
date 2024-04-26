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

class Reserve extends Component{

    state = {
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
    
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         selectedDate: '',
    //         selectedRegion: '', 
    //     };
    // }

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
        <div className='reserve-container' style={{ display:'flex', backgroundColor: 'rgb(241, 245, 249)'}}>
            <div style={{ flex:'1'}}>
             <Sidebar/>
            </div>
            <div style={{flex:'4', overflowY:'auto'}}>
            <h2 className='ml-5 '>Secure Your Spot</h2>
            <p className='text-base ml-5'>Reserve a venue for your theoretical driving test here </p>

            <Accordion   style={{width:'90%', marginLeft:'20px'}}>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Find Venue</Accordion.Header>
        <Accordion.Body>
        <form  className=''>
                <div style={{display:'flex', 
                             justifyContent: 'space-around', 
                             alignItems: 'center',
                             width: '90%',
                             gap: '20px'
                           }} className=''>
                <div className='form-floating mb-3 flex-1 ' style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <input 
                    type='date' className='form-control ' id='date' name='date' placeholder='Pick a date'
                     min={new Date().toISOString().slice(0, 10)} 
                     max={new Date(new Date().getFullYear(), new Date().getMonth() + 3, 0).toISOString().slice(0, 10)}
                     required
                     onChange={e => this.setState({ selectedDate: e.target.value })}/>
                    <label htmlFor='floatingDate' className=' text-lg text-primary '> Pick Date</label>
                </div>
                <div className='form-floating mb-3 flex-1 '>
                    <select className='form-control' id='region' name='region' 
                    required
                    onChange={e => this.setState({ selectedRegion: e.target.value })}>
                        <option value='' className=''> </option>
                        {this.state.regionsInTanzania.map(region => (
                            <option key={region} value={region}>{region}</option>
                        ))}
                    </select>
                    <label htmlFor='floatingSelect' className='text-primary text-lg'><span><LocationOnIcon/></span> Choose Region</label>
                </div>
                <div className='flex-1  justify-center items-center'>
                  <button onClick={()=>this.filterSessions(this.state.selectedRegion, this.state.selectedDate)} className="btn btn-primary mb-3 filter-btn"
                  style={{width:'250px', height:'50px' }}>Filter <span><FilterAltIcon/></span></button>
                  </div>
                </div>
                
            </form>

        </Accordion.Body>
      </Accordion.Item>
           </Accordion>
            
            <div className='d-flex flex-wrap justify-content-around ml-0 mt-3 mr-6 '>
            { this.state.venues.map(venue => (

                      <Link to={`/venue-and-session?venueId=${venue.id}`} className='venue-item' style={{textDecoration:'none'}} key={venue.id}>
                        <Card style={{ width: '18rem', height:'14rem', boxShadow: '0 0 8px rgba(0,0,0,0.1)', cursor:'pointer'}} className='m-2  venue-card' key={venue.id}>
                          <Card.Img variant="top" src={img6} style={{width:'18rem', height:'8rem'}} />
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
                
                {/* <div className='d-flex flex-wrap justify-content-around ml-0 mt-3 mr-6 '>
                {this.state.filteredSessions && this.state.filteredSessions.map(session => (
        // Replace this with your code to display a session
        <div key={session.id}>
            <h2>{session.venueName}</h2>
            <p>{session.sessionDate}</p>
            <p>{session.currentCapacity}</p>
        </div>
    ))}
</div> */}




            </div>
            
            
        </div>
    );
}

}



export default Reserve;
