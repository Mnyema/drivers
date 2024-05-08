import React, { useState, useEffect, useRef } from 'react';
import '../App.css';
import drivingLicense from '../Images/_9ed1cd6b-f639-4f38-ba66-6bf49e0837ea.jpg'
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LockIcon from '@mui/icons-material/Lock';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import axios from 'axios';
import { Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Loader from '../Components/Loader';

function CreateAccount() {
    const myRef = useRef(null);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const isMediumScreen = window.matchMedia('(min-width: 768px)').matches;
    const isSmallScreen = window.matchMedia('(max-width: 768px)').matches;
    const [isLoading, setIsLoading] = useState(false);

function validateForm() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const phone = document.getElementById('phone').value;
  
    if (!firstName || !lastName || !phone || !password) {
      setErrorMessage('All fields are required!');
      setIsSnackbarOpen(true);
      return false;
    }

    if (phone.length > 10) {
      setIsSnackbarOpen(true);
      setErrorMessage('Phone number should not be more than 12 digits.');
      return;
    }
  
    if (password.length < 8 || password.length > 12) {
      setIsSnackbarOpen(true);
      setErrorMessage('Password should be between 8 and 12 characters.');
      return;
    }
  
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address!');
      setIsSnackbarOpen(true);
      return false;
    }
  
    // const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    // if (!phoneRegex.test(phone)) {
    //   setErrorMessage('Please enter a valid phone number!');
    //   setIsSnackbarOpen(true);
    //   return false;
    // }
  
    return true;
  }
  


  async function handleSubmit(event) {
    setIsLoading(true);
    event.preventDefault();
    if (validateForm()) {
      const firstName = document.getElementById('firstName').value;
      const lastName = document.getElementById('lastName').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const phone = document.getElementById('phone').value;

     try{
      const response = await fetch('https://rsallies.azurewebsites.net/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          phone
           }),
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message);
        setIsLoading(false);
      }
      setIsLoading(false);
      window.location.href = '/login';
      setErrorMessage(''); // Clear the error message
    } catch (error) {
        console.error('Error:',error);
      setErrorMessage(error.message);
      setIsSnackbarOpen(true);
      setIsLoading(false);
    } 
    // navigate('/dashboard');
    }
  }

    useEffect(() => {
        if (!myRef.current) return;
        window.VANTA.WAVES({
          el: myRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          shininess: 34.00
        });
      }, [myRef]);

    return (
      <div style={{position:'relative'}}>
      <Loader isOpen={isLoading}/>
      <div className='create-account' ref={myRef}
      style={{ 
        display:'flex',
      flexDirection:'column',
       justifyContent:'center', 
       alignItems:'center',
        height:'100vh',
         width:'100vw',
         position:'fixed',
         }}>
          <div style={{flex:'1', width:'100%', zIndex:'9999'}}>
        <Navbar/>
         </div>
      <div className='create-acc ' style={{ 
        marginTop: isSmallScreen ? '0' : '5rem',
        flex: '9',
       alignItems: 'center',
        display: 'flex',
       //  backgroundColor: 'pink',
         marginTop: '0',
       justifyContent: 'center',
       position:'relative',
      }}>
        <div className='create-account-container' style={{display:'flex',
         justifyContent:'center', alignItems:'center',
         width: isSmallScreen ? '100vw':'80vw',
         }} >
          <div className='left-column' style={{display: isSmallScreen ? 'none' : 'block'}}>
            <img src={drivingLicense} alt="Left column image" className="" />
          </div>
          <div className='right-column ' 
          style={{height:isSmallScreen ? '100%' : '100%',
          alignItems: isSmallScreen ? 'center' : 'flex-start',
          justifyContent: isSmallScreen ? 'center' : 'flex-start',
        }}>
         <form onSubmit={handleSubmit} className=''> 
         <div className='' 
         style={{
          top: isSmallScreen ? '0' : '0',
         }}>

         <Snackbar className=' p-10 mb-1' style={{zIndex:'10000', width: isSmallScreen ? '90vw' : '50%',}}
           open={isSnackbarOpen}
          //  autoHideDuration={6000}
           onClose={() => setIsSnackbarOpen(false)}
           anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
>
          <Alert onClose={() => setIsSnackbarOpen(false)} severity="error" variant='filled'>
          {errorMessage}
          </Alert>
          </Snackbar>

            <h1 className='text-3xl font-bold  ml-8 text-white mb-4' style={{ textAlign: isSmallScreen ? 'center' : 'left' }}>Create Account</h1>
            <p className='mb-2 ml-7 mb-2 text-white text-xl'> </p>
            <div className='input-container form-floating ml-6'>
                <input type='text' id='firstName' name='firstName'className='form-control' placeholder='Enter your first name' required 
                style={{width:isSmallScreen? '100%':'90%'}}/>
                <label htmlFor='firstName'><span><DriveFileRenameOutlineIcon/> </span>First Name</label>
            </div>
            <div className='input-container form-floating ml-6'>
                <input type='text' id='lastName' name='lastName' className='form-control' placeholder='Enter your surname' required
                style={{width:isSmallScreen? '100%':'90%'}} />
                <label htmlFor='lastName'><span><DriveFileRenameOutlineIcon/> </span>Last Name</label>
            </div>
            <div className='input-container form-floating ml-6'>
                <input type='email' id='email' name='email' className='form-control' placeholder='you@gmail.com'
                style={{width:isSmallScreen? '100%':'90%'}}  />
                <label htmlFor='email'><span><EmailIcon/> </span>Email</label>
            </div>
            <div className='input-container form-floating ml-6'>
                <input type='password' id='password' name='password' className='form-control' placeholder='Enter your password'
                style={{width:isSmallScreen? '100%':'90%'}}  />
                <label htmlFor='email'><span><LockIcon/> </span>Password</label>
            </div>
            <div className='input-container form-floating ml-6'>
                <input type='phone' id='phone' name='phone' className='form-control' placeholder='+255*********' required 
                style={{width:isSmallScreen? '100%':'90%'}} />
                <label htmlFor='phone'><span><PhoneAndroidIcon/> </span>Mobile Number</label>
            </div>
           
            <button className=' bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3 text-xl ml-7'
             style={{ 
              marginTop: isSmallScreen ? '200px' : '0', 
              width: isSmallScreen ? '88%' : 'auto',
            }}>
                Next
            </button>

          

            <p className='mt-1 ml-7 text-white'>Already have an account? <a href='/login' className='text-white font-bold' style={{textDecoration: 'none'}}>Login</a></p>
        </div>
        </form>
        </div>
        </div>
      </div>

      <div style={{flex:'1',
    // backgroundColor:'pink',
      width:'100%',
      height:'100%'
     
      }}>
    <Footer/>
    </div>
        </div>
      </div>
    );
};

export default CreateAccount;