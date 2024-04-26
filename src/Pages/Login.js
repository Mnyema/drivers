import React, {useRef, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom'; 
import drivingLicense from '../Images/_9ed1cd6b-f639-4f38-ba66-6bf49e0837ea.jpg';
import '../App.css'; 
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LockIcon from '@mui/icons-material/Lock';
import { Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import { UserContext } from '../Components/UserContext';
import Loader from '../Components/Loader';

function Login() {
    const myRef = useRef(null);
    const navigate = useNavigate();
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const {setUser} = React.useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (event) => {
        event.preventDefault();

        const phone = document.getElementById('phone').value;
        const password = document.getElementById('password').value;
        
        setIsLoading(true);
        fetch('https://rsallies.azurewebsites.net/api/user/authenticate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phone, password }),
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            console.log(data);
            setIsLoading(false);
            if (data.isSuccess) {
              localStorage.setItem('user', JSON.stringify(data.value));
              setUser(data.value);
              setIsLoading(false);
              navigate('/dashboard');
            } else {
              setIsSnackbarOpen(true);
              setErrorMessage('Invalid phone number or password.');
              setIsLoading(false);
            }
          })
        .catch((error) => {
            console.error('Error:', error);
          setIsSnackbarOpen(true);
          setErrorMessage('An error has occurred.');
          setIsLoading(false);
        });
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
    <div className='login' ref={myRef}>
        <div className='login-container '>
        <div className='login-left-column'>
        <img src={drivingLicense} alt="Left column image" className="" />
        </div>

           <div className='login-right-column'> 
         <form onSubmit={handleLogin}> 
         <div className=' mt-8'>

         <Snackbar className='w-50 p-10 mb-2'
           open={isSnackbarOpen}
          //  autoHideDuration={6000}
           onClose={() => setIsSnackbarOpen(false)}
           anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
>
          <Alert onClose={() => setIsSnackbarOpen(false)} severity="error" variant='filled'>
          {errorMessage}
          </Alert>
          </Snackbar>

            <h1 className='text-3xl font-bold justify-center ml-8 text-white mb-3'>Log In</h1>
             <p> </p>
            <div className='input-container form-floating ml-6'>
                <input type='phone' id='phone' name='phone' className='form-control' placeholder='+255*********' required />
                <label htmlFor='phone'><span><PhoneAndroidIcon/> </span>Mobile Number</label>
            </div>
            <div className='input-container form-floating ml-6'>
                <input type='password' id='password' name='password' className='form-control' placeholder='' />
                <label htmlFor='email'><span><LockIcon/> </span>Password</label>
            </div>
           
            <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 text-xl ml-7'>
                Login
            </button>

            <p className='mt-3 ml-7 text-white'>Create account <a href='/create-account' className='text-white font-bold' style={{textDecoration:'none'}}>Here</a></p>
        </div>
        </form>
        </div>

        </div>

        </div>
      
        </div>
  );
}
export default Login;