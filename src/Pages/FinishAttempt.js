import React from 'react';
import { useNavigate } from 'react-router-dom';
import finish from '../Images/goal.gif'

function FinishAttempt(){
    const navigate = useNavigate();
const isMediumScreen = window.matchMedia('(min-width: 768px)').matches;
const isSmallScreen = window.matchMedia('(max-width: 768px)').matches;

const redirecttoresults = () => {
    navigate('/results');
  };

return(
    <div className='' style={{display:'flex', height:'100vh', width:'100vw',position:'fixed', alignItems:'center',justifyContent:'center',backgroundColor:'#f9f5fd'}}>
     <div className='' style={{height:'100%', width:'95%',display:'flex', flexDirection:'column'}}>
        <div className='' style={{display:'flex', flex:'1', width:'100%', alignItems:'center',justifyContent:'flex-start'}}>
        <h3 className='text-2xl text-center font-mono font-bold'>SaferDriving</h3>
        </div>
       <div className='' style={{display:'flex', flex:'9',width:'100%', justifyContent:'center', }}>
        <div className='' style={{display:'flex',alignItems:'center',justifyContent:'center',width:'90%', height:'90%', flexDirection:'column',backgroundColor:'white'}}>
        <p className='text-xl font-semibold'>Attempt Ended</p>
        <img src={finish} alt='car' 
        style={{
            height:isSmallScreen?'20%':'30%', width:isSmallScreen?'':'25%', 
            objectFit:'contain', }}
        />
       <p>Click button below to see your results</p>
        <button className='btn btn-primary text-white p-2 font-bold rounded-lg mt-2' onClick={redirecttoresults}
         style={{width:isSmallScreen?'90%':'30%'}}>
            Results
        </button>
        </div>
       </div>
     
     </div>
    </div>
);
}
export default FinishAttempt;