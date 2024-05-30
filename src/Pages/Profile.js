import React, { useContext, useEffect ,useState} from 'react';
import { UserContext } from '../Components/UserContext';
import Sidebar from '../Components/Sidebar';
import NavbarTwo from '../Components/NavbarTwo';
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

const translations = {
  english: {
    "First Name": "First Name",
    "Last Name": "Last Name",
    "Email": "Email",
    "Mobile Number": "Mobile Number",
  },
  swahili: {
    "Mobile Number": "Namba ya Simu",
    "First Name": "Jina la Kwanza",
    "Last Name": "Jina la Mwisho",
    "Email": "Barua pepe",
  },
};

function Profile() {
  const isMediumScreen = window.matchMedia('(min-width: 768px)').matches;
      const isSmallScreen = window.matchMedia('(max-width: 768px)').matches;
      const [language, setLanguage] = useState('swahili');
      const dictionary = translations[language];
  
  const {user, setUser}= useContext(UserContext);
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    console.log(loggedInUser);
    setUser(loggedInUser);
}, []);

  return (
    <div style={{display:'flex', flexDirection:'row', position:'fixed', height:'100vh', width:'100vw'}}>
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
         height:'100vh',
         width:'100%', 
         backgroundColor:'#f9f5fd'
         }}>
    <div className='navtwo' style={{flex:'1', padding:'5px', width:isSmallScreen?'100vw':'100%'}}>
                    <NavbarTwo/>
                </div>
<div style={{display:'flex', flex:'8', justifyContent:'center'}}>
<div className='profile-crd' 
style={{ display:'flex', 
flexDirection:'column',
 backgroundColor:'white',
  width:isSmallScreen?'95%':'80%',
  height:'80%',
  borderRadius:'5px',
  boxShadow:'0 0 10px rgba(0,0,0,0.2)',
  padding:'20px',
  }}>

<div className='mt-3 ml-3 pic' style={{flex:isSmallScreen?'1':'2',  display:'flex', flexDirection:isSmallScreen?'column':'row', justifyContent:'flex-end'}}>
<div className='' style={{flex:isSmallScreen?'1':'3', display:'flex', alignItems:'center', justifyContent:'flex-start'}}>
<h2 >{language === 'english' ? 'Profile' : 'Wasifu'}</h2>
</div>
<div className='' style={{flex:isSmallScreen?'3':'1',display:'flex', alignItems:'center', justifyContent:'center'}}>
<img src={profile} alt='avatar' style={{width:isSmallScreen?'50%':'100%', height:isSmallScreen?'80%':'100%', borderRadius:'50%'}}/>
</div>
</div>

<div className='input-one  mb-4' style={{flex:'1',display:'flex', flexDirection:isSmallScreen?'column':'row', gap:'30px'}}>
<div style={{flex:'1', display:'flex', alignItems:'center', justifyContent:'center'}}>
<TextField style={{width:'90%'}}
          id="standard-read-only-input"
          label={dictionary["First Name"]}
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
          label={dictionary["Last Name"]}
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
<div className='mb-5' style={{flex:'1', display:'flex', flexDirection:isSmallScreen?'column':'row', gap:'30px'}}>
  <div style={{flex:'1', display:'flex', alignItems:'center', justifyContent:'center'}}>
<TextField style={{width:'90%'}}
          id="standard-read-only-input"
          label={dictionary["Email"]}
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
          label={dictionary["Mobile Number"]}
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
    </div>

    

  );
}

export default Profile;