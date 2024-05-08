import React from 'react';
import '../App.css';
import Sidebar from '../Components/Sidebar';
import NavbarTwo from '../Components/NavbarTwo';
import score from '../Images/score.gif';
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
        <div className='results-container' style={{ display:'flex',flexDirection:'row', backgroundColor:'#f9f5fd', height:'100vh',width:'100vw',position:'fixed'}}>
           {!isSmallScreen && (
        <div className='sidebar' style={{ flex: '1'}}>
          <Sidebar/>
        </div>
      )}
            <div className='' style={{flex:'4',
        display:'flex',
         alignItems:'center',
         flexDirection:'column',
         justifyContent:'center',
         height:'100vh',
          backgroundColor:'#f9f5fd',
          //padding:'20px',
          borderRadius:'5px',
        }}>
            <div className='navtwo' style={{flex:'1',width:'100%'}}>
                    <NavbarTwo/>
                </div>
            <div className='' style={{flexGrow:'1', flex:'9',
             width:isSmallScreen?'100vw':'90%',
             display:'flex',
             flexDirection:'column',
         alignItems:'center',
         justifyContent:'center',
         borderRadius:'5px',
         backgroundColor:'white',
        }}>
            <div className='results-div-one ' style={{flex:'2',width:isSmallScreen?'50%':'30%', display:'flex',flexDirection:'row', alignItems:'center', justifyContent:'center', overflow:'hidden'}}>
            <img src={score} alt='results' style={{width:isMediumScreen?'40%':'70%', height:isSmallScreen?'40%':'50%',}}/>
            </div>
            <div className='results-div-two  ' style={{flex:'3',width:isSmallScreen?'100vw':'99%', display:'flex',justifyContent:'center',overflow:'hidden'}}>
<TableContainer className='' component={Paper} style={{width:isSmallScreen?'95%':'80%',height:isSmallScreen?'60%': '70%', border: '1px solid orange'}}>
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