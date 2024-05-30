import React, {useState} from 'react';
import { TextField, Grid , MenuItem} from '@mui/material'; 
import InputAdornment from '@mui/material/InputAdornment';

const translations = {
  english: {
    "First Name": "First Name",
    "Middle Name": "Middle Name",
    "Surname": "Surname",
    "Date of Birth": "Date of Birth",
    "Gender": "Gender",
    "Male":"Male",
    "Female":"Female",
  },
  swahili: {
    "First Name": "Jina la Kwanza",
    "Middle Name": "Jina la Kati",
    "Surname": "Jina la Mwisho",
    "Date of Birth": "Tarehe ya Kuzaliwa",
    "Gender": "Jinsia",
    "Male": "Mwanaume",
    "Female": "Mwanamke",
  },
};

const PersonalInfo = ({ formik }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.matchMedia('(max-width: 768px)').matches);
  const [language, setLanguage] = useState('swahili');
  const dictionary = translations[language];

  return (

    
    <div className=' p-2' style={{display:'flex', alignItems:'center',justifyContent:'center',height:'100%',width:isSmallScreen?'100%': '50%', fontWeight:'bold',color:'white'}}>
    <Grid container spacing={2} style={{fontWeight:'bold',color:'white'}}>
      <Grid item xs={12} >
        {/* First Name */}
        <TextField
          fullWidth
          id="firstName"
          name="firstName"
          label={dictionary["First Name"]}
          size='small'
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
        />
      </Grid>
      <Grid item xs={12} >
        {/* Middle Name */}
        <TextField
          fullWidth
          id="middleName"
          name="middleName"
          label={dictionary["Middle Name"]}
          size='small'
          value={formik.values.middleName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.middleName && Boolean(formik.errors.middleName)}
          helperText={formik.touched.middleName && formik.errors.middleName}
        />
      </Grid>
      <Grid item xs={12}>
        {/* Surname */}
        <TextField
          fullWidth
          id="surname"
          name="surname"
          label={dictionary["Surname"]}
          size='small'
          value={formik.values.surname}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.surname && Boolean(formik.errors.surname)}
          helperText={formik.touched.surname && formik.errors.surname}
          />
      </Grid>
      <Grid item xs={12} >
        {/* dob */}
        <TextField
         fullWidth
        id="dob"
        name="dob"
        label={dictionary["Date of Birth"]}
        type="date"
        size='small'
        InputLabelProps={{
        shrink: true,
        }}
        inputProps={{
            max: `${new Date().getFullYear() - 18}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}`,
          }}
        value={formik.values.dob}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.dob && Boolean(formik.errors.dob)}
        helperText={formik.touched.dob && formik.errors.dob}
/>
      </Grid>
      <Grid item xs={12} >
        {/* gender */}
        <TextField
        fullWidth
        size='small'
          id="gender"
          name='gender'
          select
          label={dictionary["Gender"]}
          defaultValue=" "
          onBlur={formik.handleBlur}
          error={formik.touched.gender &&  Boolean(formik.errors.gender)}
          helperText={formik.touched.gender && formik.errors.gender}
          onChange={formik.handleChange}
        >
        
        <MenuItem value="male">{dictionary["Male"]}</MenuItem>
        <MenuItem value="female">{dictionary["Female"]}</MenuItem>
        
        </TextField>
      </Grid>
     
      
      {/* Add more fields (e.g., phone number, address, etc.) as needed */}
    </Grid>
    </div>
  );
};

export default PersonalInfo;