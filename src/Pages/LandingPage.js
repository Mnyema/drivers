import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import Navbar from '../Components/Navbar';
import '../App.css';
import img1 from '../Images/image1.jpg';
import img2 from '../Images/image2.jpg';
import img3 from '../Images/pexels-omar-ramadan-1739260-6743568.jpg';
import img4 from '../Images/pexels-carlos-oliva-3586966.jpg'
import img5 from '../Images/pexels-ruiyang-zhang-915467-3717242.jpg'

function LandingPage() {
  const [currentImage, setCurrentImage] = useState(img1);
  const navigate = useNavigate();

  const redirectToCreateAccount = () => {
    navigate('/create-account');
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
    <div className="home-content mt-0 font-serif" style={{ 
      
        backgroundImage: `url(${currentImage})`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
         //backgroundColor: 'rgba(0, 0, 0, 0.3)',
        // boxShadow: '0 0 10px rgba(181, 179, 179, 0.8)',
        
        }}>
     
     

          <div className='home-div mt-0 '>
      <div className="ml-20 mt-20 text-white">
        <h1 className="text-5xl font-bold">Drive Better, Live Safer!</h1>
        <p className="mt-4 text-xl mr-20">Secure a seat for your theoretical driving test fast and conveniently, take the test, and contribute to safer roads for a greater community.</p>
        <p className="mt-1 text-xl">Your journey to becoming a better driver starts here!</p>
        <button onClick={redirectToCreateAccount} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-16 rounded mt-4 text-xl ">
            Get Started
        </button>
      </div>
      </div>
    </div>
  );
}

export default LandingPage;