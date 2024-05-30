import React, { useState, useEffect,useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Stepper, Step, StepLabel, Grid, FormHelperText, Button } from '@mui/material';
import PersonalInfo from '../Components/PersonalInfo'; // Child components
import Nationality from '../Components/Nationality';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import '../App.css'
import { useNavigate } from 'react-router';
import ContactDetails from '../Components/ContactDetails';
import IntroToRegistration from '../Components/IntroToRegistration';



//const steps = [ 'Personal Information','Nationality', 'Contact Details'];


function Register() {
    const [activeStep, setActiveStep] = useState(0);
    const [isValid, setIsValid] = useState(false);
    const [dirty, setDirty] = useState(false);
    const [language, setLanguage] = useState('swahili');
    const [isSmallScreen, setIsSmallScreen] = useState(window.matchMedia('(max-width: 768px)').matches);
  const navigate = useNavigate();
    const translations = {
      english: {
        "Introduction": "Introduction",
        "Personal Information": "Personal Information",
        "Nationality": "Nationality",
        "Contact Details": "Contact Details",
      },
      swahili: {
        "Introduction": "Utangulizi",
        "Personal Information": "Taarifa Binafsi",
        "Nationality": "Uraia",
        "Contact Details": "Taarifa za mawasiliano",
      },
    };
  
    const dictionary = translations[language];
  
    const steps = [ dictionary['Personal Information'], dictionary['Nationality'], dictionary['Contact Details']];
    const validationSchemas = [
     
      Yup.object({
        firstName: Yup.string().required('First Name is required'),
        middleName: Yup.string().required('Middle Name is required'),
        surname: Yup.string().required('Surname is required'),
        gender: Yup.string().required('Gender is required'),
        dob: Yup.date()
          .required('Required')
          .max(
            new Date(new Date().getFullYear() - 18, new Date().getMonth(), new Date().getDate()),
            'You must be at least 18 years old'
          ),
      }),
      Yup.object({
        nationality: Yup.string().required('Nationality is required'),
        nida: Yup.string()
        //.required('NIDA ID is required')
        .matches(/^\d{8}-\d{5}-\d{5}-\d{2}$/, 'Invalid NIDA ID format'),
        //passportNo: Yup.string()
        //.required('Required')
        //.matches(/^[A-Z]{2}\d{7}$/, 'Invalid Passport Number format'),
        address: Yup.string().required('Home Address is required'),
        occupation: Yup.string().required('Occupation is required'),
        licenseClass: Yup.string().required('License Class is required'),
        
      }),
      Yup.object({
        email: Yup.string().required('Email is required').email('Invalid email'),
        password: Yup.string().min(8),
        confirmPassword: Yup.string().min(8).oneOf([Yup.ref('password')], 'Passwords do not match'),
      }),
    ];
    
    const formik = useFormik({
      initialValues: {
        email: '',
        password: '',
        confirmPassword: '',
        gender:'',
        firstName: '',
        middleName: '',
        surname: '',
        phone: '',
        nida: '',
        passportNo: '',
        nationality: '',
        address: '',
        occupation: '',
        licenseClass: '',
        dob:'',
      },
      validate: (values) => {
        let errors = {};
        let schema = validationSchemas[activeStep];
        try {
          schema.validateSync(values, { abortEarly: false });
        } catch (error) {
          error.inner.forEach((err) => {
            if (!errors[err.path]) {
              errors[err.path] = err.message;
            }
          });
        }
        console.log(errors);
        return errors;
      },
      onSubmit: () => {
        if (activeStep === steps.length - 1) {
          console.log('Form submitted'); // Handle form submission here
          navigate('/ingia');
        } else {
          setActiveStep((prevStep) => prevStep + 1);
        }
      },
    });
    useEffect(() => {
      formik.validateForm().then((errors) => {
        setIsValid(Object.keys(errors).length === 0);
      });
    }, [formik.values]);

    useEffect(() => {
      setDirty(formik.dirty);
    }, [formik.dirty]);
    
    useEffect(() => {
      if (activeStep !== formik.values.step) {
        setDirty(false);
        formik.setValues({ ...formik.values, step: activeStep });
      }
    }, [activeStep]);
    
    // useEffect(() => {
    //   formik.setValidationSchema(validationSchemas[activeStep]);
    // }, [activeStep]);
    const formContent = (step) => {
      switch (step) {
      
        case 0:
          return <PersonalInfo formik={formik} />;
        case 1:
          return <Nationality formik={formik} />;
        case 2:
          return <ContactDetails formik={formik} />;
        default:
          return null;
      }
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
         }}>
          <div style={{flex:'1', width:'100%', zIndex:'9999'}}>
        <Navbar/>
         </div>

        <div style={{display:'flex',flex:'9', justifyContent:'center',alignItems:'center', width:'100vw'}}> 
            <div className="" style={{display:'flex',justifyContent:'center',width:isSmallScreen?'95%': '70%'}}>
                
                <Box className='bg-white p-2' 
                style={{display:'flex', boxShadow: '0 0 10px rgba(80, 79, 79, 0.5)',
                                borderRadius: '5px',
                alignItems:'center',justifyContent:'center',
                flexDirection:'column',borderRadius:'5px',
                backgroundColor:'rgba(0, 0, 0, 0.1)',
             backdropFilter: 'blur(8px)',
            // WebkitBackdropFilter: 'blur(10px)',
                }}>
                  <div className='' style={{display:'flex', alignItems:'center',justifyContent:'center', width:'100%'}}>
      <Stepper activeStep={activeStep} alternativeLabel className='text-white'>
        {steps.map((label) => (
          <Step className='text-white' key={label}>
            <StepLabel className='text-white'>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
                  </div>
      
      <form onSubmit={formik.handleSubmit} className='p-4' style={{display:'flex',flexDirection:'column', alignItems:'center',justifyContents:'center'}} >
        {formContent(activeStep) }
       <div style={{display:'flex', flexDirection:'row', width:isSmallScreen?'100%': '50%'}}>
       {activeStep > 0 && (
        <div style={{display:'flex',flex:'1',justifyContent:'flex-start'}}>
            <span className={language === 'english' ? '':'hidden'}>  <Button type="button" onClick={() => setActiveStep(activeStep - 1)} >
                Back
              </Button>
            </span>
            <span className={language === 'swahili' ? '':'hidden'}>  <Button type="button" onClick={() => setActiveStep(activeStep - 1)} >
                Rudi
              </Button>
              </span>
         </div>
            )}
            {activeStep < steps.length - 1 && (
              <div style={{display:'flex',flex:'1',justifyContent:'flex-end'}}>
             <span className={language === 'english' ? '':'hidden'}> <Button type="button" onClick={() => {formik.validateForm(); setActiveStep(activeStep + 1);}} disabled={!formik.dirty || !isValid}>
                Next
              </Button>
              </span>
              <span className={language === 'swahili' ? '':'hidden'}> <Button type="button" onClick={() => {formik.validateForm(); setActiveStep(activeStep + 1);}} disabled={!formik.dirty || !isValid}>
                Endelea
                </Button>
                </span>
              </div>
            )}
            {activeStep === steps.length - 1 && (
              <>
              <span className={language === 'english' ? '':'hidden'}><Button type="submit" >
                Submit
              </Button>
              </span>
              <span className={language === 'swahili' ? '':'hidden'}><Button type="submit" >
                Wasilisha
              </Button>
              </span>
              </>
              
            )}
            
        </div> 
        <p className='mt-0 mb-0 font-mono'>Umekwishajisajili? Bofya <a href='/ingia' style={{textDecoration:'none'}}> hapa</a> kuingia kwenye mfumo</p>
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
export default Register;