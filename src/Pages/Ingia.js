import React,{useState} from "react";
import { Box, Button } from "@mui/material";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router";
import { TextField, Grid } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import LockIcon from '@mui/icons-material/Lock';
import PhoneIcon from '@mui/icons-material/Phone';

const translations = {
    english: {
      
      "Mobile Number": "Mobile Number",
      "Password": "Password",
    
     
    },
    swahili: {
      
      "Mobile Number": "Namba ya Simu",
      "Password": "Nenosiri",
      
      
    },
  };

function Ingia() {
    const [isSmallScreen, setIsSmallScreen] = React.useState(window.matchMedia('(max-width: 768px)').matches);
    const [language, setLanguage] = React.useState('swahili');
    const dictionary = translations[language];
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
    const navigate = useNavigate();
    const redirectToDashboard = () => {
        navigate('/dashboard');
      };
  return (
    <div className='register' 

    style={{ 
      display:'flex',
    flexDirection:'column',
     justifyContent:'center', 
     alignItems:'center',
      height:'100vh',
       width:'100vw',
       position:'fixed',
       fontWeight:'bold'
       }}>
        <div style={{flex:'1', width:'100%', zIndex:'9999'}}>
      <Navbar/>
       </div>

      <div style={{display:'flex',flex:'9', justifyContent:'center',alignItems:'center', width:'100vw'}}> 
          <div className="" style={{display:'flex',justifyContent:'center',width:isSmallScreen?'95%': '70%'}}>
              
              <Box className='bg-white p-2' 
              style={{display:'flex', 
              alignItems:'center',justifyContent:'center',
              flexDirection:'column',borderRadius:'5px',
              backgroundColor:'rgba(0, 0, 0, 0.1)',
           backdropFilter: 'blur(8px)',
           fontWeight:'bold',
          // WebkitBackdropFilter: 'blur(10px)',
              }}>
                <div className='' style={{display:'flex', alignItems:'center',justifyContent:'center', width:'100%',fontWeight:'bold'}}>
                <h1 className='text-lg font-mono p-2'>Tafadhali ingiza taarifa zinazohitajika kuingia kwenye mfumo</h1>
                </div>
    
    <form onSubmit={redirectToDashboard}  className='p-4' style={{display:'flex',flexDirection:'column', alignItems:'center',justifyContents:'center'}} >
      
    <div className=' p-2' style={{display:'flex',flexDirection:'column', alignItems:'center',justifyContent:'center',height:'100%',width:isSmallScreen?'100%': '70%'}}>
    <Grid container spacing={2}>
        <Grid item xs={12} >
        {/* phone */}
        <TextField
          fullWidth
          id="phone"
          name="phone"
          label={dictionary["Mobile Number"]}
          size='small'
          InputProps={{
            startAdornment: <InputAdornment position="start"><PhoneIcon/></InputAdornment>,
          }}
        />
      </Grid>
      <Grid item xs={12} >
        {/* password */}
        <TextField
          fullWidth
          id="password"
          name="password"
          label={dictionary["Password"]}
          size='small'
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            startAdornment: <InputAdornment position="start"><LockIcon/></InputAdornment>,
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          
        />
      </Grid>
      </Grid>
            <div className="bg-blue-500 mt-4 w-full " style={{display:'flex',justifyContent:'center', borderRadius:'5px'}}>
            <span className={language === 'english' ? '':'hidden'}><Button type="submit" className="text-white" >
              Login
            </Button>
            </span>
            <span className={language === 'swahili' ? '':'hidden'}><Button type="submit" className="text-white">
              Ingia
            </Button>
            </span>
            </div>
            
          <div>
            <p className='text-sm font-mono mt-4 mb-0'>Haujajiandikisha? <a href='/register' className='text-blue-500'>Jisajili</a> hapa</p>
          </div>
          <div>
                <p className='text-sm font-mono mt-2 '>Umesahau neno la siri?</p>
            </div>
      </div> 
    </form>
  </Box>
              
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
  );
}
export default Ingia;