import React from 'react';
import { useNavigate } from 'react-router-dom';
import car from '../Images/10385594.png'

function IntroToQuestion(){
    const navigate = useNavigate();
const isMediumScreen = window.matchMedia('(min-width: 768px)').matches;
const isSmallScreen = window.matchMedia('(max-width: 768px)').matches;

const redirectToQuestion = () => {
    navigate('/question');
  };

return(
    <div className='' style={{display:'flex', height:'100vh', width:'100vw',position:'fixed', alignItems:'center',justifyContent:'center',backgroundColor:'#f9f5fd'}}>
     <div className='' style={{height:'100%', width:'95%',display:'flex', flexDirection:'column'}}>
        <div className='' style={{display:'flex', flex:'1', width:'100%', alignItems:'center',justifyContent:'flex-start'}}>
        <h3 className='text-2xl text-center font-mono font-bold'>SaferDriving</h3>
        </div>
       <div className='' style={{display:'flex', flex:'9',width:'100%', justifyContent:'center', }}>
        <div className='' style={{display:'flex',alignItems:'center',justifyContent:'center',width:'90%', height:'90%', flexDirection:'column',backgroundColor:'white'}}>
        <p className='text-xl font-semibold'>Driver's Theory Test</p>
        <img src={car} alt='car' 
        style={{
            height:isSmallScreen?'40%':'50%', width:isSmallScreen?'':'25%', 
            objectFit:'contain', }}
        />
        <p className='text-lg'>Attempts allowed : <span className='font-semibold'>1</span></p>
        <p className='text-lg'>Time limit : <span className='font-semibold'>30 minutes</span></p>
        <button className='btn btn-primary text-white p-2 font-bold rounded-lg' onClick={redirectToQuestion}
         style={{width:isSmallScreen?'90%':'50%'}}>
            Start
        </button>
        </div>
       </div>
     
     </div>
    </div>
);
}
export default IntroToQuestion;