import React ,{ useState}from 'react';
import { TextField, Grid , MenuItem} from '@mui/material'; 
import InputAdornment from '@mui/material/InputAdornment';

const translations = {
  english: {
    "Nationality": "Nationality",
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
    "Nationality": "Uraia",
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





const Nationality= ({ formik }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.matchMedia('(max-width: 768px)').matches);
  const [language, setLanguage] = useState('swahili');
  const dictionary = translations[language];
  return (
    <div className=' p-2' style={{display:'flex', alignItems:'center',justifyContent:'center',height:'90%',width:isSmallScreen?'100%': '50%'}}>
    <Grid container spacing={2}>
    <Grid item xs={12} >
        {/* Nationality */}
        <TextField
        fullWidth
        size='small'
          id="Nationality"
          select
          label={dictionary["Nationality"]}
          name='nationality'
          defaultValue=" "
          onBlur={formik.handleBlur}
          error={formik.touched.nationality &&  Boolean(formik.errors.nationality)}
          helperText={formik.touched.nationality && formik.errors.nationality}
          onChange={(e) => {
            formik.handleChange(e);
            if (e.target.value === 'tanzanian') {
              formik.setFieldValue('passportNo', '');
            } else {
              formik.setFieldValue('nida', '');
            }
          }}
          
        >
        
        <MenuItem value="tanzanian">{dictionary["Tanzanian"]}</MenuItem>
        <MenuItem value="not-tanzanian">{dictionary["Not Tanzanian"]}</MenuItem>
        
        </TextField>
      </Grid>
      {formik.values.nationality === 'tanzanian' && (
      <Grid item xs={12} >
        {/* NIDA */}
        <TextField
          fullWidth
          id="nida"
          name="nida"
          label={dictionary["NIDA Number"]}
          size='small'
          value={formik.values.nida}
          onChange={formik.handleChange} onBlur={formik.handleBlur}
          error={formik.touched.nida && Boolean(formik.errors.nida)}
          helperText={formik.touched.nida && formik.errors.nida}
        />
      </Grid>
      )}

{formik.values.nationality === 'not-tanzanian' && ( 
      <Grid item xs={12} >
        {/* Passport */}
        <TextField
          fullWidth
          id="passportNo"
          name="passportNo"
          label={dictionary["Passport Number"]}
          size='small'
          value={formik.values.passportNo}
          onChange={formik.handleChange} onBlur={formik.handleBlur}
          error={formik.touched.passportNo && Boolean(formik.errors.passportNo)}
          helperText={formik.touched.passportNo && formik.errors.passportNo}
        />
      </Grid>
)}

      <Grid item xs={12} >
        {/* Resident Address */}
        <TextField
          fullWidth
          id="address"
          name="address"
          label={dictionary["Resident Address"]}
          size='small'
          value={formik.values.address}
          onChange={formik.handleChange} onBlur={formik.handleBlur}
          error={formik.touched.address && Boolean(formik.errors.address)}
          helperText={formik.touched.address && formik.errors.address}
        />
      </Grid>
      <Grid item xs={12}>
        {/* Surname */}
        <TextField
          fullWidth
          id="occupation"
          name="occupation"
          label={dictionary["Occupation"]}
          size='small'
          value={formik.values.occupation}
          onChange={formik.handleChange} onBlur={formik.handleBlur}
          error={formik.touched.occupation && Boolean(formik.errors.occupation)}
          helperText={formik.touched.occupation && formik.errors.occupation}
          />
      </Grid>
      <Grid item xs={12} >
        {/* License Class */}
        <TextField
        fullWidth
        size='small'
          id="licenseClass"
          select
          name='licenseClass'
          label={dictionary["License Class"]}
          defaultValue=" "
          helperText={formik.touched.licenseClass && formik.errors.licenseClass}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        >
        
        <MenuItem value="classA">{dictionary["Class A"]}</MenuItem>
        <MenuItem value="classB">{dictionary["Class B"]}</MenuItem>
        <MenuItem value="classC">{dictionary["Class C"]}</MenuItem>
        <MenuItem value="classD">{dictionary["Class D"]}</MenuItem>
        <MenuItem value="classE">{dictionary["Class E"]}</MenuItem>
        <MenuItem value="classF">{dictionary["Class F"]}</MenuItem>
        <MenuItem value="classG">{dictionary["Class G"]}</MenuItem>
        <MenuItem value="classH">{dictionary["Class H"]}</MenuItem>
        </TextField>
      </Grid>
      
    </Grid>
    </div>
  );
};

export default Nationality;