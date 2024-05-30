import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import Navbar from '../Components/Navbar';
import '../App.css';
import img1 from '../Images/image1.jpg';
import img2 from '../Images/image2.jpg';
import img3 from '../Images/udart.jpg';
import img4 from '../Images/interchange.jpg';
import img5 from '../Images/pexels-ruiyang-zhang-915467-3717242.jpg';
import Loader from '../Components/Loader';
import Footer from '../Components/Footer';
import jeshi from '../Images/jeshiLogo.jpg';
import emblem from '../Images/coat-of-arms-of-tanzania-logo.png';
import polisi from '../Images/Portal_header_sw.png';


function LandingPage() {
  const [currentImage, setCurrentImage] = useState(img1);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState('swahili');
  const [isSmallScreen, setIsSmallScreen] = useState(window.matchMedia('(max-width: 768px)').matches);

  const redirectToCreateAccount = () => {
    setIsLoading(true);
    navigate('/register');
    setIsLoading(false);
  };

  const redirectToLogin = () => {
    setIsLoading(true);
    navigate('/ingia');
    setIsLoading(false);
  };

  // useEffect(() => {
  //   const images = [img1, img2, img3, img4, img5];
  //   let i = 0;
  //   const changeImage = () => {
  //     setCurrentImage(images[i]);
  //     i = i === images.length - 1 ? 0 : i + 1;
  //   };
  //   const intervalId = setInterval(changeImage, 5000); // change every 5 seconds
  //   return () => clearInterval(intervalId); // clean up on unmount
  // }, []);

  return (
    <div className='landing-page' style={{ 
      display:'flex',
       flexDirection:'column',
        justifyContent:'center', 
        alignItems:'center',
         height:'100vh',
          width:'100vw',
          position:'relative',
          
          }}>
      <div style={{flex:'1', width:'100%', zIndex:'9999'}}>
        <Navbar/>
      </div>

    <div className="home-content mt-0 font-serif " style={{ 
        flex: '9',
        width: '100%',
        height: '100%',
       // alignItems: 'center',
        display: 'flex',
        // backgroundColor: 'pink',
         marginTop: '0',
       // justifyContent: 'center',
       position:'relative',
        
        }}>
     
     

      <div className='home-div mt-0 ' style={{ zIndex:'1',marginTop:'0',height:'100%',display:'flex',flexDirection:'column', alignItems:'center',justifyContent:'center'}}>
      <div className='' style={{display:'flex',height:'90px', flexDirection:'row',alignItems:'center',justifyContent:'center', backgroundColor:'white',marginTop:'0', borderRadius:'5px'}}>
        {/* <div style={{flex:'1'}}><img src={emblem} style={{width:'70px', height:'70px',marginLeft:'5px'}}/></div>
        <div className='p-4' style={{flex:'5', display:'flex',flexDirection:'column' ,alignItems:'center',justifyContent:'center'}}>
         <p className='mt-0 mb-0'>JAMHURI YA MUUNGANO WA TANZANIA</p> 
         <p className='mb-0'>WIZARA YA MAMBO YA NDANI YA NCHI</p>
         <p className='mb-0'>JESHI LA POLISI TANZANIA</p>
          </div>
        <div style={{flex:'1'}}><img src={jeshi} style={{padding:'40px'}} /></div> */}
        <img src={polisi} style={{width:'100vw',}}/>
      </div>

<div className='p-2 mb-0 mt-3' style={{display:'flex',gap:'5px', flexDirection:'row',alignItems:'center',justifyContent:'center',height:'80%'}}>
      <div className="landingp1 text-white" style={{padding:'20px',
       backgroundColor:'rgba(0,0,0,0.4)',height:'100%', 
       backdropFilter: 'blur(2px)',flex:'1', justifyContent:'center', display:'flex', flexDirection:'column',
        zIndex:'1', borderRadius:'5px', marginTop:'0',
        }}>
         <span className={language === 'english' ? '' : 'hidden'}> <p style={{borderBottom:'1px solid orange', fontSize:'15px'}}>ROAD SAFETY UNIT</p></span>
          <span className={language === 'swahili' ? '' : 'hidden'}> <p style={{borderBottom:'1px solid orange', fontSize:'15px',width:'fit-content'}}>KITENGO CHA USALAMA BARABARANI</p></span>
          {/* <span className={language === 'english' ? '' : 'hidden'}> <h1 className="text-5xl font-bold">Drive Better, Live Safer!</h1></span>
          <span className={language === 'swahili' ? '' : 'hidden'}> <h1 className="text-5xl font-bold">Usalama wa Barabarani</h1></span> */}
       <span className={language === 'english' ? '':'hidden'} style={{width:isSmallScreen?'100%':''}}> <p className="mt-4 text-xl mr-20" style={{width:isSmallScreen?'100%':''}}>Secure a seat for your theoretical driving test fast and conveniently, take the test, and contribute to safer roads for a greater community.</p></span>
        <span className={language === 'swahili' ? '':'hidden'} style={{width:isSmallScreen?'100%':''}}> <p className="mt-1 text-lg mr-20" style={{width:isSmallScreen?'100%':''}}>
        Huu ni mfumo unaomwezesha dereva anayetafuta leseni kuweka nafasi ya kituo kwa ajili ya mtihani wa nadharia ya udereva kwa njia ya mtandao. </p></span>
        <div className='' style={{display:'flex',flexDirection:isSmallScreen?'column': 'row', width:'100%'}}>
          <div style={{flex:'1', display:'flex',alignItems:'center',justifyContent:'center'}}>
        <button onClick={redirectToCreateAccount} className="btn btn-success font-bold p-2  text-white rounded  text-lg " style={{width:isSmallScreen?'95%':'90%'}} >
        {language === 'english' ? 'REGISTER' : 'JISAJILI'}
        </button>
          </div>
          <div style={{flex:'1', display:'flex',alignItems:'center',justifyContent:'center'}}>
          <button onClick={redirectToLogin} className="btn btn-primary font-bold p-2 text-white  rounded text-lg " style={{width:isSmallScreen?'95%':'90%'}}>
          {language === 'english' ? 'LOGIN' : 'INGIA'}
        </button>
          </div>
          </div>
      </div>
      <div className='bg-yellow-500' style={{flex:'1',width:'100%',height:'100%',borderRadius:'5px',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}> 
      <p>u</p>
      </div>
</div>
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

export default LandingPage;