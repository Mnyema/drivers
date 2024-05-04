import React from 'react';
import '../App.css';
import Sidebar from '../Components/Sidebar';

function MyCertificate() {
    const isMediumScreen = window.matchMedia('(min-width: 768px)').matches;
      const isSmallScreen = window.matchMedia('(max-width: 768px)').matches;
    return (
        <div className='certificate-container' style={{ display:'flex', backgroundColor:'rgb(241, 245, 249)'}}>
            {!isSmallScreen && (
        <div className='sidebar' style={{ flex: '1'}}>
          <Sidebar/>
        </div>
      )}
            <div style={{flex:'3'}}>
            <h3 className='mt-5'>Certificate</h3>

            </div>
            
            
        </div>
    );
}

export default MyCertificate;