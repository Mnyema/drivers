import React from 'react';
import '../App.css';
import Sidebar from '../Components/Sidebar';
import results from '../Images/results.jpg';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

function MyResults() {
    const isMediumScreen = window.matchMedia('(min-width: 768px)').matches;
      const isSmallScreen = window.matchMedia('(max-width: 768px)').matches;
    return (
        <div className='results-container' style={{ display:'flex', backgroundColor:'rgb(241, 245, 249)'}}>
           {!isSmallScreen && (
        <div className='sidebar' style={{ flex: '1'}}>
          <Sidebar/>
        </div>
      )}
            <div style={{flex:'4',
        display:'flex',
         alignItems:'center',
         //flexDirection:'row',
         justifyContent:'center',
          height:'calc(100vh - 56px)',
          backgroundColor:'rgb(241, 245, 249)',
          padding:'20px',
          borderRadius:'5px',
        }}>
            <div style={{height:'100%',
             width:'90%',
             display:'flex',
             flexDirection:'row',
         alignItems:'center',
         justifyContent:'center',
         borderRadius:'5px',
        }}>
            <div className='results-div-one ' style={{flex:'2', height:'80%', display:'flex',flexDirection:'row', alignItems:'center', justifyContent:'center', backgroundColor:'white'}}>
            <img src={results} alt='results' style={{width:'90%', height:'90%'}}/>
            </div>
            <div className='results-div-two ' style={{flex:'3', height:'80%', display:'flex',justifyContent:'center',alignItems:'center', backgroundColor:'white'}}>
<TableContainer className='' component={Paper} style={{width:'90%', border: '1px solid orange'}}>
    <Table>
    <TableHead>
            
                <TableRow  style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <TableCell className='font-semibold'>
                        Examination Results
                    </TableCell>
                </TableRow>
            
        </TableHead>
        <TableBody>
                        <TableRow >
                            <TableCell>
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <span className='font-semibold'> Name:</span>
                                    <span></span>
                                </div>
                            </TableCell>
                        </TableRow>
                        <TableRow >
                            <TableCell>
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <span className='font-semibold'>Score:</span>
                                    <span></span>
                                </div>
                            </TableCell>
                        </TableRow>
                        <TableRow >
                            <TableCell>
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <span className='font-semibold'>Status:</span>
                                    <span></span>
                                </div>
                            </TableCell>
                        </TableRow>
        </TableBody>
    </Table>
</TableContainer>
            </div>
            </div>
            </div>
            
            
        </div>
    );
}

export default MyResults;