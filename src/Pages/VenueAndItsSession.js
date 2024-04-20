import React, {useEffect, useState, useContext} from 'react';
import Sidebar from '../Components/Sidebar';
import { useLocation } from 'react-router-dom';
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



function VenueAndItsSession() {
  const { user } = useContext(UserContext); 
  const [sessionData, setSessionData] = useState(null);
    const location = useLocation();
   const queryParams = new URLSearchParams(location.search);
    const venueId = queryParams.get('venueId');
    const [sessions, setSessions] = useState([]);
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
            
            setOpen(true);
          })
          .catch(error => console.error('Error:', error));
      };
      
      const handleClose = () => {
        setOpen(false);
      };

      
      
      useEffect(() => {
      
        fetch(`https://rsallies.azurewebsites.net/api/sessions?venueId=${venueId}`)
          .then(response => response.json())
          .then(data =>{
            console.log(data.sessionId);
            setSessionId(data.sessionId)
      });
      }, [venueId]);

   

   useEffect(() => {
    fetch(`https://rsallies.azurewebsites.net/api/venue/${venueId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              return response.json();
            })
        .then(data => {
            setVenue(data.value);
        })
        fetch(`https://rsallies.azurewebsites.net/api/venue/${venueId}/sessions/from/${formattedStartDateTime}/to/${formattedEndDateTime}`)
        .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
        .then(data => setSessions(data.value))
        .catch(error => console.error('Error:', error));
}, [venueId]);

 const handleBook = () => {
  console.log('Book clicked, sessionId:', sessionId);
        const data = {
            userId: user.id,
            sessionId: sessionId,
            bookingDate: new Date().toISOString(),
            status: "confirmed"
          };
          console.log(JSON.stringify(data));
        
  fetch('https://rsallies.azurewebsites.net/api/bookings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (!response.ok) {
        return response.text().then(text => {
          throw new Error(`Network response was not ok: ${text}`);
        });
      }
      return response.json();
    })
  .then(data => {
    // handle success
    setOpenSnackbar(true);
    handleClose();
  })
  .catch((error) => {
    console.error('Error:', error);
    // handle error
  });
};

if (!venue) {
    return <div>Loading...</div>;
}

    return (
        <div className='venue-container' style={{display:'flex', backgroundColor:'rgb(241, 245, 249)'}}>
            <div style={{ flex:'1'}}>
             <Sidebar/>
            </div>
            <div style={{flex:'3'}}>
            <h3>{venue.name} </h3>
            <p> {venue.address} </p>

            <Snackbar
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

            <p>Available Sessions for this month</p>
        <div>
        <TableContainer component={Paper} style={{width:'90%', boxShadow:'0 0 10px rgba(0,0,0,0.1)'}}>
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
          <TableCell>{session.currentCapacity}</TableCell>
          <TableCell><button className='btn btn-outline-primary' onClick={() => handleClickOpen(session.id)}  title={`Session ID: ${session.id}`}>
            Reserve
            </button></TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>

<Dialog open={open} onClose={handleClose}>
  <DialogTitle>Confirm Reservation</DialogTitle>
  <DialogContent>
    <DialogContentText>
      Are you sure you want to book <span className='text-warning'>{venue.name}</span>  for the session on <span className='text-warning'>{selectedSession && new Date(selectedSession.sessionDate).toLocaleDateString()}</span> at <span className='text-warning'>{selectedSession && new Date(selectedSession.sessionDate).toLocaleTimeString()}</span>?
    </DialogContentText><br/>
    <DialogContentText className='text-danger'>
       Note: You can only book one session at a time.
    </DialogContentText>
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
    );
}

export default VenueAndItsSession;


