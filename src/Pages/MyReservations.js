import React, { useState, useEffect, useContext } from 'react';
import '../App.css';
import Sidebar from '../Components/Sidebar';
import NavbarTwo from '../Components/NavbarTwo';
import { useNavigate } from 'react-router-dom';
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
import { Card } from 'react-bootstrap';
import InfoIcon from '@mui/icons-material/Info';
import Loader from '../Components/Loader';

function MyReservations() {
  const [isLoading, setIsLoading] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [cancelledBookings, setCancelledBookings] = useState([]);
  const { user } = useContext(UserContext);
  const [openSnackbar, setOpenSnackbar] = useState(false);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    
    const redirectToQuestion = () => {
      setIsLoading(true);
      navigate('/intro-to-question');
      setIsLoading(false);
    };

    const [openDialog, setOpenDialog] = useState(false);
const [currentBooking, setCurrentBooking] = useState(null);
const isMediumScreen = window.matchMedia('(min-width: 768px)').matches;
const isSmallScreen = window.matchMedia('(max-width: 768px)').matches;

// ...

const handleCancelReservation = () => {
  setIsLoading(true);
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
        setIsLoading(false);
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
        setIsLoading(false);
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
    setIsLoading(true);
    fetch(`https://rsallies.azurewebsites.net/api/user/${user.id}/bookings`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data.value);
        setBookings(data.value);
        setIsLoading(false);
    })
      .catch(error => console.error('There was an error!', error));
      setIsLoading(false);
  }, []);

  return (
    <div >
      <Loader isOpen={isLoading} />
    <div className='myreservation-container' style={{ display:'flex', flexDirection:'row', backgroundColor:'#f9f5fd', height:'100vh', width:'100vw', alignItems:'center',justifyContent:'center', position:'fixed'}}>
    {!isSmallScreen && (
        <div className='sidebar' style={{ flex: '1'}}>
          <Sidebar/>
        </div>
      )}
      <div className='' style={{flex:'4',display:'flex', flexDirection:'column', height:'100vh',alignContent:'center',justifyContent:'center'}}>
      <div className='navtwo' style={{flex:'1'}}>
                    <NavbarTwo/>
                </div>
      <div className='bg-white '
       style={{height:'100%', width:isSmallScreen?'100vw':'100%', flex:'9', marginTop:isSmallScreen?'0':'', borderRadius:'5px',
       backgroundColor:'white', alignItems:'center',justifyContent:isMediumScreen?'center':'', display:'flex',flexDirection:'column'}}>
        <div className='' style={{display:'flex',flexDirection:'column', justifyContent:'center',alignItems:'center'}}>
          <div className=' mt-2 mb-2' style={{width:isSmallScreen?'90%':'100%'}}>
        <h3 className='text-2xl' style={{flex:'1'}}>My Bookings</h3>
        {/* <p style={{flex:'1'}}>Here are credentials about bookings you've made</p> */}
        </div>
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
    Booking cancelled successfully!
           </Alert>
          </Snackbar> 
        
<div style={{width:isSmallScreen?'95%':'fit-content',display:'flex',flex:'3', justifyContent:'center'}}>
  <Card>
    <Card.Body className='bg-blue-200 info-card font-mono text-sm' style={{width:'fit-content', height:isSmallScreen?'fit-content':'50px', borderRadius:'5px', display:'flex', alignItems:'center', borderColor:'blue'}}>
    <span className='mr-2'><InfoIcon /></span> Kindly carry your valid NIDA card and be at the venue 30 minutes before the session starts.
      </Card.Body>
  </Card>
</div>
</div>
{/* <TableContainer component={Paper} style={{width:'90%', boxShadow:'0 0 10px rgba(0,0,0,0.1)'}}
 className='mt-3'>
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
          <TableCell style={{fontWeight:'bold'}}>
            <span><AutorenewIcon/></span>You don't have any reservation yet
          </TableCell>
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
                <button  className='btn btn-outline-danger btn-sm' onClick={() => handleOpenDialog(booking)}>
                  Cancel <span> <NotInterestedIcon fontSize='sm'/></span>
                </button>
            )}
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  </Table>
</TableContainer> */}

<div className='' style={{display:'flex', alignItems:'center', justifyContent:'center',width:isSmallScreen?'100vw':'83%'}}>
<TableContainer className='mt-3' component={Paper} style={{width:isSmallScreen?'95%':'90%', boxShadow:'0 0 10px rgba(0,0,0,0.1)'}}>
    <Table>
    <TableHead>
            {bookings.length === 0 && (
                <TableRow>
                    <TableCell>
                        <span><AutorenewIcon/></span>You don't have any booking yet
                    </TableCell>
                </TableRow>
            )}
        </TableHead>
        <TableBody>
            {Array.isArray(bookings) && bookings.map(booking => {
                const sessionDate = new Date(booking.sessionDate);
                const date = sessionDate.toLocaleDateString();
                const time = sessionDate.toLocaleTimeString();

                return (
                    <>
                        <TableRow key={booking.id + 'venueName'}>
                            <TableCell>
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <span className='font-semibold'>Venue Name:</span>
                                    <span>{booking.venueName}</span>
                                </div>
                            </TableCell>
                        </TableRow>
                        <TableRow key={booking.id + 'venueAddress'}>
                            <TableCell>
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <span className='font-semibold'>Venue Address:</span>
                                    <span>{booking.venueAddress}</span>
                                </div>
                            </TableCell>
                        </TableRow>
                        <TableRow key={booking.id + 'date'}>
                            <TableCell>
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <span className='font-semibold'>Date:</span>
                                    <span>{date}</span>
                                </div>
                            </TableCell>
                        </TableRow>
                        <TableRow key={booking.id + 'time'}>
                            <TableCell>
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <span className='font-semibold'>Time:</span>
                                    <span>{time}</span>
                                </div>
                            </TableCell>
                        </TableRow>
                        <TableRow key={booking.id + 'cancel'}>
                            <TableCell >
                              <div style={{display:'flex', justifyContent:'space-between'}}>
                              <button className='btn btn-outline-primary btn-sm' onClick={redirectToQuestion}>
                                  Attempt Test
                                </button>
                                {!cancelledBookings.includes(booking.id) && (
                                    <button  className='btn btn-outline-danger btn-sm' onClick={() => handleOpenDialog(booking)}>
                                        Cancel <span> <NotInterestedIcon fontSize='sm'/></span>
                                    </button>
                                )}

                                </div>
                            </TableCell>
                        </TableRow>
                    </>
                )
            })}
        </TableBody>
    </Table>
</TableContainer>
</div>

<Dialog open={openDialog} onClose={handleCloseDialog}>
  <DialogTitle>Confirm Cancelling Reservation</DialogTitle>
  <DialogContent>
  <DialogContentText>
      Are you sure you want to cancel the reservation made for <span>{currentBooking?.venueName} </span>
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
    </div>
    </div>
  );
}

export default MyReservations;