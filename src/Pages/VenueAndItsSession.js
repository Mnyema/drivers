import React, {useEffect, useState, useContext} from 'react';
import Sidebar from '../Components/Sidebar';
import NavbarTwo from '../Components/NavbarTwo';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Snackbar, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import { UserContext } from '../Components/UserContext';
import PlaceIcon from '@mui/icons-material/Place';
import Loader from '../Components/Loader';


function VenueAndItsSession() {
  const isMediumScreen = window.matchMedia('(min-width: 768px)').matches;
      const isSmallScreen = window.matchMedia('(max-width: 768px)').matches;
  const { user } = useContext(UserContext); 
  const [sessionData, setSessionData] = useState(null);
    const location = useLocation();
   const queryParams = new URLSearchParams(location.search);
    const venueId = queryParams.get('venueId');
    const [sessions, setSessions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const startDate = new Date();
    // Set the hours, minutes, and seconds to 00
       startDate.setUTCHours(0, 0, 0, 0);
    const endDate = new Date(startDate.getTime());
   endDate.setMonth(startDate.getMonth() + 1);
  
  const formattedStartDateTime = startDate.toISOString().replace('.000', '') + '';
  const formattedEndDateTime = endDate.toISOString().replace('.000', '') + '';

  if (!formattedStartDateTime.endsWith('Z')) {
    formattedStartDateTime += 'Z';
  }
  
  if (!formattedEndDateTime.endsWith('Z')) {
    formattedEndDateTime += 'Z';
  }

   const [venue, setVenue] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [open, setOpen] = useState(false);
    const [selectedSession, setSelectedSession] = useState(null);

    const [userId, setUserId] = useState(null);
      const [sessionId, setSessionId] = useState(null);

   

   
      const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
      
        setOpenSnackbar(false);
      };

    

      const handleClickOpen = (id) => {
        setIsLoading(true);
        fetch(`https://rsallies.azurewebsites.net/api/session/${id}`) 
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            console.log('Session data:', data);
            setSessionId(id); 
            setSessionData(data);
            setOpen(true);
            setIsLoading(false);
          })
          .catch(error => console.error('Error:', error));
          setIsLoading(false);
      };
      
      const handleClose = () => {
        setOpen(false);
        setSessionData(null);
      };

      
      
      useEffect(() => {
        setIsLoading(true);
        fetch(`https://rsallies.azurewebsites.net/api/sessions?venueId=${venueId}`)
          .then(response => response.json())
          .then(data =>{
            console.log(data.sessionId);
            setSessionId(data.sessionId)
            setIsLoading(false);
      });
      }, [venueId]);

   

   useEffect(() => {
    setIsLoading(true);
    fetch(`https://rsallies.azurewebsites.net/api/venue/${venueId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              return response.json();
            })
        .then(data => {
            setVenue(data.value);
            setIsLoading(false);
        })
        fetch(`https://rsallies.azurewebsites.net/api/venue/${venueId}/sessions/from/${formattedStartDateTime}/to/${formattedEndDateTime}`)
        .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
        .then(data => {
          setSessions(data.value);
          setIsLoading(false);
   })
        .catch(error => console.error('Error:', error));
        setIsLoading(false);
}, [venueId]);

const handleBook = () => {
  console.log('Book clicked, sessionId:', sessionId);
  setIsLoading(true);
  fetch(`https://rsallies.azurewebsites.net/api/user/${user.id}/bookings`)
    .then(response => {
      if (response.status === 404) {
        // The user has no bookings, so proceed with the booking
        return { value: [] };
      }
      if (!response.ok) {
        throw new Error('No bookings found for this user');
      }
      return response.json();
    })
    .then(data => {
      const bookings = data.value;
      const now = new Date();
      const hasActiveBooking = bookings.some(booking => new Date(booking.sessionDate) > now);
      console.log('Has active booking:', hasActiveBooking); 
      if (Array.isArray(bookings)) {
        const hasActiveBooking = bookings.some(booking => new Date(booking.sessionDate) > now);
        console.log('Has active booking:', hasActiveBooking); 
        if (hasActiveBooking) {
          // The user has an active booking
          alert('Failed to book: You already have an active booking.');
          console.error('Failed to book: You already have an active booking.');
          setIsLoading(false);
        } else {
          console.log('Booking the session...');
          const bookingData = {
            userId: user.id,
            sessionId: sessionId,
            bookingDate: new Date().toISOString(),
            status: "confirmed"
          };
          console.log(JSON.stringify(bookingData));
          setIsLoading(true);
          fetch('https://rsallies.azurewebsites.net/api/bookings', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookingData)
          })
          .then(response => {
            if (!response.ok) {
              return response.text().then(text => {
                throw new Error(`Network response was not ok: ${text}`);
              });
            }
            return response.json();
          })
          .then(bookingData => {
            // handle success
            setOpenSnackbar(true);
            handleClose();
            setIsLoading(false);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
        }
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      setIsLoading(false);
    });
};

if (!venue) {
   return <Loader/>;
}

    return (
      <div>
        {isLoading ? <Loader /> : (
        <div className='venue-container' style={{display:'flex', flexDirection:'row', height:'100vh', width:'100vw', padding:'10px',position:'fixed',overflow:'auto',
         backgroundColor:'#f9f5fd',
         
         }}>
           {!isSmallScreen && (
        <div className='sidebar' style={{ flex: '1'}}>
          <Sidebar/>
        </div>
      )}
      <div className='' style={{flex:'4',display:'flex', flexDirection:'column', height:'100vh'}}>
      <div className='navtwo' style={{flex:'1'}}>
                    <NavbarTwo/>
                </div>
            <div className='' style={{flex:'9',padding:'10px', width:'100%' }}>
           <div className='' style={{display:'flex', justifyContent:'flex-start'}}> <h3>{venue.name} </h3> </div>
           <div className='' style={{display:'flex', justifyContent:'flex-start'}}>
           <span><PlaceIcon color='info'/> </span> {venue.address} </div>

            <Snackbar style={{zIndex:'10000', width: isSmallScreen ? '90vw' : '50%',}}
                 open={openSnackbar}
        //   autoHideDuration={6000}
            onClose={handleCloseSnackbar}
           anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
           <Alert
             onClose={handleCloseSnackbar}
             severity="success"
             variant="filled"
              action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnackbar}>
             <CloseIcon fontSize="small" />
             </IconButton>
            }>
    Successfully booked the venue!
           </Alert>
          </Snackbar> 

            <p className='mt-2'>Available Sessions for this month</p>
        <div className=' mt-2' style={{display:'flex', justifyContent:'center',width:'100%'}}>
        <TableContainer component={Paper} style={{width:'100%', boxShadow:'0 0 10px rgba(0,0,0,0.2)'}}>
  <Table aria-label="simple table">
    <TableHead>
      <TableRow>
        <TableCell style={{fontWeight:'bold'}}>Session Date</TableCell>
        <TableCell style={{fontWeight:'bold'}}>Time</TableCell>
        <TableCell style={{fontWeight:'bold'}}>Current Capacity</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {sessions.map((session) => (
        <TableRow key={session.id}>
          <TableCell>{new Date(session.sessionDate).toLocaleDateString()}</TableCell>
          <TableCell>{new Date(session.sessionDate).toLocaleTimeString()}</TableCell>
          <TableCell>{venue.capacity - session.currentCapacity}</TableCell>
          <TableCell>
            <button className='btn btn-outline-primary btn-sm' 
            onClick={() => handleClickOpen(session.id)}  
            title={`Session ID: ${session.id}`}
            disabled={venue.capacity - session.currentCapacity === 0}
            >
            Book
            </button></TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>

<Dialog open={open} onClose={handleClose}>
  <DialogTitle>Confirm Reservation</DialogTitle>
  <DialogContent>
  {sessionData && (
    <>
    <DialogContentText>
      Are you sure you want to book <span className='text-warning'>{venue.name}</span>  for the session on
       <span className='text-warning'> {new Date(sessionData.value.sessionDate).toLocaleDateString()} </span> 
       at <span className='text-warning'> {new Date(sessionData.value.sessionDate).toLocaleTimeString()}</span>?
    </DialogContentText><br/>
    <DialogContentText className='text-danger'>
      <span className='font-bold'>Note: </span>You can only book one session at a time.
    </DialogContentText>
    </>
  )}
  </DialogContent>
  <DialogActions>
    <Button onClick={handleClose} color="primary" variant='outlined'>
      Cancel
    </Button>
    <Button onClick={() => { handleBook(); handleClose(); }}
     title={`Session ID: ${sessionId}`}
    color="primary" variant='contained'>
      Book
    </Button>
  </DialogActions>
</Dialog>

            </div>
            </div>
      </div>
        </div>
        )}
    </div>
    );
}

export default VenueAndItsSession;


