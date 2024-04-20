import React from 'react';
import '../App.css';
import Sidebar from '../Components/Sidebar';

function MyResults() {
    return (
        <div className='results-container' style={{ display:'flex', backgroundColor:'rgb(241, 245, 249)'}}>
            <div style={{ flex:'1'}}>
             <Sidebar/>
            </div>
            <div style={{flex:'3'}}>
            <h1>My Results Page</h1>
            </div>
            
            
        </div>
    );
}

export default MyResults;