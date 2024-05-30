import React, {useState} from 'react';
import { TextField, Grid , MenuItem} from '@mui/material'; 
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';

const translations = {
  english: {
    "Email": "Email",
    "Mobile Number": "Mobile Number",
    "Educational Level": "Educational Level",
    "Primary": "Primary",
    "Secondary": "Secondary",
    "Diploma": "Diploma",
    "Degree": "Degree",
    "Masters": "Masters",
    "PhD": "PhD",
    "Password": "Password",
    "Confirm Password": "Confirm Password",

   
  },
  swahili: {
    "Email": "Barua pepe",
    "Mobile Number": "Namba ya Simu",
    "Educational Level": "Kiweko cha Elimu",
    "Primary": "Msingi",
    "Secondary": "Sekondari",
    "Diploma": "Diploma",
    "Degree": "Shahada",
    "Masters": "Uzamili",
    "PhD": "PhD",
    "Password": "Nenosiri",
    "Confirm Password": "Thibitisha Nenosiri",
    
  },
};

const ContactDetails = ({ formik }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.matchMedia('(max-width: 768px)').matches);
  const [language, setLanguage] = useState('swahili');
  const dictionary = translations[language];
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className=' p-2' style={{display:'flex', alignItems:'center',justifyContent:'center',height:'100%',width:isSmallScreen?'100%': '50%'}}>
    <Grid container spacing={2}>
    <Grid item xs={12}>
        {/* Email */}
        <TextField
          fullWidth
          id="email"
          name="email"
          label={dictionary["Email"]}
          size='small'
          value={formik.values.email}
          onChange={formik.handleChange} onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
      </Grid>
      <Grid item xs={12} >
        {/* phone */}
        <TextField
          fullWidth
          id="phone"
          name="phone"
          label={dictionary["Mobile Number"]}
          size='small'
          value={formik.values.phone}
          onChange={formik.handleChange} onBlur={formik.handleBlur}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
          InputProps={{
            startAdornment: <InputAdornment position="start">+255</InputAdornment>,
          }}
        />
      </Grid>
    <Grid item xs={12} >
        {/* Educational Level */}
        <TextField
        fullWidth
        size='small'
          id="educationalLevel"
          select
          label={dictionary["Educational Level"]}
          defaultValue=" " onBlur={formik.handleBlur}
          //helperText="Please select your Educational Level"
        >
        
        <MenuItem value="primary">{dictionary["Primary"]}</MenuItem>
        <MenuItem value="secondary">{dictionary["Secondary"]}</MenuItem>
        <MenuItem value="diploma">{dictionary["Diploma"]}</MenuItem>
        <MenuItem value="degree">{dictionary["Degree"]}</MenuItem>
        <MenuItem value="masters">{dictionary["Masters"]}</MenuItem>
        <MenuItem value="PhD">{dictionary["PhD"]}</MenuItem>
        
        </TextField>
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
          value={formik.values.password}
          onChange={formik.handleChange} onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
      </Grid>
      <Grid item xs={12} >
        {/* Confirm Password */}
        <TextField
          fullWidth
          id="confirmPassword"
          name="confirmPassword"
          label={dictionary["Confirm Password"]}
          size='small'
          type={showPassword ? 'text' : 'password'}
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
          value={formik.values.confirmPassword}
          onChange={formik.handleChange} onBlur={formik.handleBlur}
          error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
          helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
        />
      </Grid>
      
      
    </Grid>
    </div>
  );
};

export default ContactDetails;