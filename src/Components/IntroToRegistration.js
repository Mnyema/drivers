import React ,{ useState}from 'react';
import { TextField, Grid , MenuItem} from '@mui/material'; 
import InputAdornment from '@mui/material/InputAdornment';

const translations = {
  english: {
    "IntroToRegistration": "IntroToRegistration",
    
  },
  swahili: {
    "IntroToRegistration": "Uraia",
 
  },
};





const IntroToRegistration= ({ formik }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.matchMedia('(max-width: 768px)').matches);
  const [language, setLanguage] = useState('swahili');
  const dictionary = translations[language];
  return (
    <div className=' p-2' style={{display:'flex', alignItems:'center',flexDirection:'column', justifyContent:'center',height:'90%',width:isSmallScreen?'100%': '50%'}}>
   <p>Hakikisha una mambo yafuatayo kabla ya kuendelea na usajili:</p>

   
    </div>
  );
};

export default IntroToRegistration;