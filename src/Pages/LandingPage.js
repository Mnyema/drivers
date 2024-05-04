import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import Navbar from '../Components/Navbar';
import '../App.css';
import img1 from '../Images/image1.jpg';
import img2 from '../Images/image2.jpg';
import img3 from '../Images/pexels-omar-ramadan-1739260-6743568.jpg';
import img4 from '../Images/pexels-carlos-oliva-3586966.jpg'
import img5 from '../Images/pexels-ruiyang-zhang-915467-3717242.jpg';
import Loader from '../Components/Loader';
import Footer from '../Components/Footer';

function LandingPage() {
  const [currentImage, setCurrentImage] = useState(img1);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const redirectToCreateAccount = () => {
    setIsLoading(true);
    navigate('/create-account');
    setIsLoading(false);
  };

  useEffect(() => {
    const images = [img1, img2, img3, img4, img5];
    let i = 0;
    const changeImage = () => {
      setCurrentImage(images[i]);
      i = i === images.length - 1 ? 0 : i + 1;
    };
    const intervalId = setInterval(changeImage, 5000); // change every 5 seconds
    return () => clearInterval(intervalId); // clean up on unmount
  }, []);

  return (
    <div style={{
      display:'flex',
       flexDirection:'column',
        justifyContent:'center', 
        alignItems:'center',
         height:'100vh',
          width:'100vw',
          position:'relative',
          backgroundImage: `url(${currentImage})`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
          }}>
      <div style={{flex:'1', width:'100%', zIndex:'9999'}}>
        <Navbar/>
      </div>

    <div className="home-content mt-0 font-serif " style={{ 
        flex: '9',
       // alignItems: 'center',
        display: 'flex',
        // backgroundColor: 'pink',
         marginTop: '0',
       // justifyContent: 'center',
       position:'relative',
        
        }}>
     
     

      <div className='home-div mt-0 ' style={{padding:'30px', zIndex:'1'}}>
      <div className=" text-white" style={{padding:'20px',
       backgroundColor:'rgba(0,0,0,0.2)',
       backdropFilter: 'blur(2px)',
        zIndex:'1'
        }}>
        <h1 className="text-5xl font-bold">Drive Better, Live Safer!</h1>
        <p className="mt-4 text-xl mr-20">Secure a seat for your theoretical driving test fast and conveniently, take the test, and contribute to safer roads for a greater community.</p>
        <p className="mt-1 text-xl">Your journey to becoming a better driver starts here!</p>
        <button onClick={redirectToCreateAccount} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-16 rounded mt-4 text-lg ">
            Get Started
        </button>
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