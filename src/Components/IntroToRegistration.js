import React ,{ useState}from 'react';
import { TextField, Grid , MenuItem} from '@mui/material'; 
import InputAdornment from '@mui/material/InputAdornment';

const translations = {
  english: {
    "IntroToRegistration": "IntroToRegistration",
    "Tanzanian": "Tanzanian",
    "Not Tanzanian": "Not Tanzanian",
    "NIDA Number": "NIDA Number",
    "Passport Number": "Passport Number",
    "Resident Address": "Resident Address",
    "Occupation": "Occupation",
    "License Class": "License Class",
    "Class A": "Class A",
    "Class B": "Class B",
    "Class C": "Class C",
    "Class D": "Class D",
    "Class E": "Class E",
    "Class F": "Class F",
    "Class G": "Class G",
    "Class H": "Class H",
  },
  swahili: {
    "IntroToRegistration": "Uraia",
    "Tanzanian": "Mtanzania",
    "Not Tanzanian": "Si Mtanzania",
    "NIDA Number": "Namba ya NIDA",
    "Passport Number": "Namba ya Pasipoti",
    "Resident Address": "Anuani ya Makazi",
    "Occupation": "Kazi",
    "License Class": "Aina ya Leseni",
    "Class A": "Darasa A",
    "Class B": "Darasa B",
    "Class C": "Darasa C",
    "Class D": "Darasa D",
    "Class E": "Darasa E",
    "Class F": "Darasa F",
    "Class G": "Darasa G",
    "Class H": "Darasa H",
  },
};





const IntroToRegistration= ({ formik }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.matchMedia('(max-width: 768px)').matches);
  const [language, setLanguage] = useState('swahili');
  const dictionary = translations[language];
  return (
    <div className=' p-2' style={{display:'flex', alignItems:'center',justifyContent:'center',height:'90%',width:isSmallScreen?'100%': '50%'}}>
   Hakikisha una mambo yafuatayo kabla ya kuendelea na usajili:
    </div>
  );
};

export default IntroToRegistration;