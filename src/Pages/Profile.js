import React, { useContext, useEffect } from 'react';
import { UserContext } from '../Components/UserContext';
import Sidebar from '../Components/Sidebar';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Avatar } from '@material-tailwind/react';
import avatar from '../Images/avatar.jpg';
import profile from '../Images/profile.gif';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import '../App.css';

function Profile() {
  const isMediumScreen = window.matchMedia('(min-width: 768px)').matches;
      const isSmallScreen = window.matchMedia('(max-width: 768px)').matches;
  
  const {user, setUser}= useContext(UserContext);
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    console.log(loggedInUser);
    setUser(loggedInUser);
}, []);

  return (
    <div style={{display:'flex'}}>
       {!isSmallScreen && (
        <div className='sidebar' style={{ flex: '1'}}>
          <Sidebar/>
        </div>
      )}
      <div className='' style={{flex:'4',
       display:'flex',
        alignItems:'center',
        flexDirection:'column',
        //justifyContent:'center',
         height:'calc(100vh - 56px)',
         backgroundColor:'rgb(241, 245, 249)'
         }}>
    

<div className='profile-crd mt-5' 
style={{ display:'flex', 
flexDirection:'column',
 backgroundColor:'white',
  width:'70%',
  height:'70%',
  borderRadius:'5px',
  boxShadow:'0 0 10px rgba(0,0,0,0.2)',
  padding:'20px',
  }}>

<div className='mt-3 ml-3 pic' style={{flex:'2',  display:'flex', flexDirection:'row', justifyContent:'flex-end'}}>
<h2 style={{flex:'3'}}>Profile</h2>
<div style={{flex:'1'}}>
<img src={profile} alt='avatar' style={{width:'100%', height:'100%', borderRadius:'50%'}}/>
</div>
</div>

<div className='input-one  mb-4' style={{flex:'1',display:'flex', flexDirection:'row', justifyContent:'flex-end', alignItems:'center', gap:'30px'}}>
<div style={{flex:'1', display:'flex', alignItems:'center', justifyContent:'center'}}>
<TextField style={{width:'90%'}}
          id="standard-read-only-input"
          label="First Name"
          defaultValue={user.firstName}
          InputProps={{
            readOnly: true,
            startAdornment: (
              <InputAdornment position="start">
                <DriveFileRenameOutlineIcon className='profile-icon'/>
              </InputAdornment>
            ),
          }}
          InputLabelProps={{
            style: { color: 'blue' },
          }}
          variant="standard"
        />
</div>
<div style={{flex:'1', display:'flex', alignItems:'center', justifyContent:'center'}}>
<TextField style={{width:'90%'}}
          id="standard-read-only-input"
          label="Last Name"
          defaultValue={user.lastName}
          InputProps={{
            readOnly: true,
            startAdornment: (
              <InputAdornment position="start">
                <DriveFileRenameOutlineIcon className='profile-icon'/>
              </InputAdornment>
            ),
          }}
          InputLabelProps={{
            style: { color: 'blue' },
          }}
          variant="standard"
        />
 </div>
</div>
<div className='mb-5' style={{flex:'1', display:'flex', flexDirection:'row', gap:'30px'}}>
  <div style={{flex:'1', display:'flex', alignItems:'center', justifyContent:'center'}}>
<TextField style={{width:'90%'}}
          id="standard-read-only-input"
          label="Email"
          defaultValue={user.email}
          InputProps={{
            readOnly: true,
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon className='profile-icon' />
              </InputAdornment>
            ),
          }}
          InputLabelProps={{
            style: { color: 'blue' },
          }}
          variant="standard"
        />
</div>
<div style={{flex:'1', display:'flex', alignItems:'center', justifyContent:'center'}}>
<TextField style={{width:'90%'}}
          id="standard-read-only-input"
          label="Mobile Number"
          defaultValue={user.phone}
          InputProps={{
            readOnly: true,
            startAdornment: (
              <InputAdornment position="start">
                <PhoneIcon className='profile-icon' />
              </InputAdornment>
            ), 
          }}
          InputLabelProps={{
            style: { color: 'blue' },
          }}
          variant="standard"
        />
</div>
      </div>
</div>
      </div>  
    </div>

    

  );
}

export default Profile;