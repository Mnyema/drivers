import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CircularProgress, {circularProgressClasses} from '@mui/material/CircularProgress';
import  Dialog  from '@mui/material/Dialog';

function GradientCircularProgress() {
    return (
      <React.Fragment>
        <svg width={0} height={0}>
          <defs>
            <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e01cd5" />
              <stop offset="100%" stopColor="#1CB5E0" />
            </linearGradient>
          </defs>
        </svg>
        <CircularProgress sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }} />
      </React.Fragment>
    );
  }

function Loader({isOpen}){
    
return(
  <div 
  //style={{
  //   display: 'flex',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   height: '100vh',
  //   width: '100vw',
  //   position: 'fixed',
  //   top: 0,
  //   left: 0,
  //   backgroundColor: 'rgba(0, 0, 0, 0.5)',
    
  // }}
  >
  <Dialog open={isOpen}>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '50px',
      }}>
        <GradientCircularProgress />
      </div>
    </Dialog>


    
    </div>
)
}
export default Loader;