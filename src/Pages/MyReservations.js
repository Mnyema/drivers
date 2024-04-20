import React, { useState, useEffect, useContext } from 'react';
import '../App.css';
import Sidebar from '../Components/Sidebar';
import { UserContext } from '../Components/UserContext';
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
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import AutorenewIcon from '@mui/icons-material/Autorenew';

function MyReservations() {
  const [bookings, setBookings] = useState([]);
  const [cancelledBookings, setCancelledBookings] = useState([]);
  const { user } = useContext(UserContext);
  const [openSnackbar, setOpenSnackbar] = useState(false);
    const [open, setOpen] = useState(false);

    const [openDialog, setOpenDialog] = useState(false);
const [currentBooking, setCurrentBooking] = useState(null);

// ...

const handleCancelReservation = () => {
    fetch(`https://rsallies.azurewebsites.net/api/booking/${currentBooking.id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        handleCloseDialog();
        setOpenSnackbar(true);
        setCancelledBookings(prevState => [...prevState, currentBooking.id]);
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  };
  
  

const handleOpenDialog = (booking) => {
    setCurrentBooking(booking);
    setOpenDialog(true);
  };
  
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };


    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenSnackbar(false);
      };

    

  useEffect(() => {
    fetch(`https://rsallies.azurewebsites.net/api/user/${user.id}/bookings`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data.value);
        setBookings(data.value)
    })
      .catch(error => console.error('There was an error!', error));
  }, []);

  return (
    <div className='myreservation-container' style={{ display:'flex', backgroundColor:'rgb(241, 245, 249)'}}>
      <div style={{ flex:'1'}}>
        <Sidebar/>
      </div>
      <div style={{flex:'3'}}>
        <h3 className='mt-5'>My Reservations</h3>
        <p>Here are credentials about Reservation you've made</p>

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
    Reservation cancelled successfully!
           </Alert>
          </Snackbar> 
        

<TableContainer component={Paper} style={{width:'90%', boxShadow:'0 0 10px rgba(0,0,0,0.1)'}}
 className='mt-5'>
  <Table>
    <TableHead className='font-bold'>
    <TableRow >
        {bookings.length > 0 ? (
          <>
            <TableCell style={{fontWeight:'bold'}}>Venue Name</TableCell>
            <TableCell style={{fontWeight:'bold'}}>Venue Address</TableCell>
            <TableCell style={{fontWeight:'bold'}}>Session Date</TableCell>
            <TableCell style={{fontWeight:'bold'}}>Session Time</TableCell>
          </>
        ) : (
          <TableCell style={{fontWeight:'bold'}}><span><AutorenewIcon/> </span>You don't have any reservation yet</TableCell>
        )}
      </TableRow>
    </TableHead>
    <TableBody>
      {Array.isArray(bookings) && bookings.map(booking => {
        const sessionDate = new Date(booking.sessionDate);
        const date = sessionDate.toLocaleDateString();
        const time = sessionDate.toLocaleTimeString();

        return (
          <TableRow key={booking.id + 'cancel'}>
            <TableCell>{booking.venueName}</TableCell>
            <TableCell>{booking.venueAddress}</TableCell>
            <TableCell>{date}</TableCell>
            <TableCell>{time}</TableCell>
            <TableCell>
            {!cancelledBookings.includes(booking.id) && (
                <button  className='btn btn-outline-danger' onClick={() => handleOpenDialog(booking)}>
                  Cancel <span> <NotInterestedIcon/></span>
                </button>
            )}
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  </Table>
</TableContainer>

<Dialog open={openDialog} onClose={handleCloseDialog}>
  <DialogTitle>Confirm Cancelling Reservation</DialogTitle>
  <DialogContent>
  <DialogContentText>
      Are you sure you want to cancel the reservation for <span>{currentBooking?.venueName} </span>
       in <span className='text-warning'>{currentBooking?.venueAddress} </span>
       on <span className='text-warning'>{new Date(currentBooking?.sessionDate).toLocaleDateString()} </span> 
       at <span className='text-warning'>{new Date(currentBooking?.sessionDate).toLocaleTimeString()}</span>?
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseDialog} color="error" variant='outlined'>
      Back
    </Button>
    <Button onClick={() => { handleCancelReservation(); handleCloseDialog();}}
    
    color="error" variant='contained'>
      Yes, Cancel
    </Button>
  </DialogActions>
</Dialog>
      </div>
    </div>
  );
}

export default MyReservations;