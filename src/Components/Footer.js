import React from 'react';
import '../App.css';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';

function Footer() {

    const isSmallScreen = window.matchMedia('(max-width: 768px)').matches;
    return (
        <div className="footer" style={{width:'100%',
        // backgroundColor:'red',
         alignItems:'center',
         display:'flex',
         flexDirection:'row',
         justifyContent:'center',
         position:'fixed',
         bottom:'0',
            marginBottom:'0',
             backgroundColor:'rgba(0,0,0,0.5)',
             backdropFilter: 'blur(10px)',
             WebkitBackdropFilter: 'blur(10px)',
         }}>
            <div className='copy-div h-full text-sm' style={{flex:'3', height:'100%',display:'flex', alignItems:'center'}}>
           <p className='ml-4 h-full text-white' style={{display:'flex', alignItems:'center', justifyContent:'center', height:'100%'}}>
            Copyright @ 2024. SaferDriving</p> 
            </div>
            <div className='icon-div h-full' style={{flex:'2', height:'100%',display:'flex', alignItems:'center'}}>
            <ul className='hidden md:flex md:flex-row md:items-center md:gap-10 h-full' style={{ display: 'flex',
             listStyle: 'none',
             flex: '2',
              gap: '15px',
              display:'flex',
              alignItems:'center',
              justifyContent:'center',
              height:'100%',
              color:'white',
              marginTop:'0',
              margin:'0',
              padding:'0',
              marginRight:'10px',
            }}
             >
                <li className='' style={{display: isSmallScreen ? 'none' : 'block'}}><FacebookIcon /></li>
                <li className='' style={{display: isSmallScreen ? 'none' : 'block'}}><InstagramIcon /></li>
                <li className='' style={{display: isSmallScreen ? 'none' : 'block'}}><LinkedInIcon /></li>
                <li className='' style={{display: isSmallScreen ? 'none' : 'block'}}><XIcon /></li>
            </ul>
            </div>
        </div>
);
}
export default Footer;