import React, {useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

function Question(){
    const navigate = useNavigate();
const isSmallScreen = window.matchMedia('(max-width: 768px)').matches;
const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
const [questions, setQuestions] = useState([
    'Question 1','Question 2','Question 3','Question 4','Question 5','Question 6','Question 7','Question 8','Question 9','Question 10',
    'Question 11','Question 12','Question 13','Question 14','Question 15','Question 16','Question 17','Question 18','Question 19','Question 20',
    'Question 21','Question 22','Question 23','Question 24','Question 25',,
    
  ]);
  //const [seconds, setSeconds] = useState(30*60);
  const [seconds, setSeconds] = useState(parseInt(localStorage.getItem('timer')) || 30*60);
//   useEffect(() => {
//     if (seconds > 0) {
//       const timerId = setTimeout(() => {
//         setSeconds(seconds - 1);
//       }, 1000);
//       return () => clearTimeout(timerId); // This will clear the timer if the component is unmounted
//     } else {
//       navigate('/finish-attempt');
//     }
//   }, [seconds, navigate]);

useEffect(() => {
    const timerId = setInterval(() => {
      setSeconds(prevSeconds => {
        const newSeconds = prevSeconds - 1;
        localStorage.setItem('timer', newSeconds); // Save the new time to localStorage
        if (newSeconds <= 0) {
            navigate('/finish-attempt');
          }
        return newSeconds;
      });
    }, 1000);
  
    // Clear the interval when the component unmounts
    return () => clearInterval(timerId);
  }, []);

  const handleNextClick = () => {
    if (currentQuestionIndex < questions.length - 1) {
      const remainingQuestions = questions.length - currentQuestionIndex - 1;
      const increment = Math.min(5, remainingQuestions);
      setCurrentQuestionIndex(currentQuestionIndex + increment);
    }
  };
  const handleBackClick = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 5);
  };
  const redirecttofinish = () => {
    navigate('/finish-attempt');
  };
  const goBack = () => {
   navigate('/question')
  };
  const hasNext = currentQuestionIndex + 5 < questions.length-1;
  const hasPrevious = currentQuestionIndex - 5 >= 0;
  const firstQuestionNumber = currentQuestionIndex+1 ;
  const lastQuestionNumber = currentQuestionIndex + Math.min(5, questions.length - currentQuestionIndex);
  const [answers, setAnswers] = useState(new Array(questions.length).fill(null));
  const handleAnswerChange = (questionIndex, selectedAnswer) => {
    setAnswers(prevAnswers => {
      const newAnswers = [...prevAnswers];
      newAnswers[questionIndex] = selectedAnswer;
      return newAnswers;
    });
  };

  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

return(
    <div className='' style={{display:'flex', height:'100vh', width:'100vw', alignItems:'center',justifyContent:'center'}}>
     <div className='' style={{height:'100%', width:'95%',display:'flex', flexDirection:'column',justifyContent:'center'}}>
        <div className='' style={{display:'flex',flexDirection:'row', flex:'1',
         width:'100%',position:'sticky',top:'0', zIndex:'10000', alignItems:'center',
         backgroundColor:'rgba(255, 255, 255, 0.3)',
             backdropFilter: 'blur(10px)',
             WebkitBackdropFilter: 'blur(10px)',}}>

<Dialog open={openDialog} onClose={handleCloseDialog}>
  <DialogContent>
  <DialogContentText style={{display:'flex',justifyContent:'center',alignItems:'center', flexDirection:'column'}}>
     <p><span><ErrorOutlineIcon color='error'/> </span> You are about to finish your attempt!</p>
     <p>Once you submit you will not be allowed to resume the test.</p>
     
    </DialogContentText>
  </DialogContent>
  <DialogActions style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
    <Button onClick={handleCloseDialog} color="primary" variant='outlined' style={{width:'30%'}}>
      Back
    </Button>
    <Button onClick={() => { redirecttofinish(); handleCloseDialog();}} style={{width:'30%'}}
    color="success" variant='contained'>
      Submit
    </Button>
  </DialogActions>
</Dialog>

        <div className='' style={{flex:3, alignItems:'center', justifyContent:'flex-start'}}>
        <h3 className='text-2xl text-center font-mono font-bold' style={{display:'flex', justifyContent:'flex-start'}}>SaferDriving</h3>
        </div>
        
        <div className='' style={{flex:'1',display:'flex',width:'100%', height:'90%', alignItems:'center',justifyContent:'flex-end'}}>
         <p className='bg-blue-600 font-bold text-lg text-white' 
         style={{height:isSmallScreen?'80%':'90%',width:isSmallScreen?'90%':'40%', marginBottom:'0',display:'flex', justifyContent:'center', alignItems:'center', borderRadius:'5px'}}>
           {Math.floor(seconds / 60)}:{seconds % 60 < 10 ? '0' : ''}{seconds % 60}
         </p>
        </div>
        </div>
        
       <div className='' style={{display:'flex', flex:'10',width:'100%', justifyContent:'center',marginTop:isSmallScreen?'80%':'50%' }}>
        <div className='' style={{display:'flex',alignItems:'center',justifyContent:'center',width:'95%', height:'100%', flexDirection:'column',backgroundColor:'white',overflow:'auto'}}>

        <div className='question' style={{display:'flex',alignItems:'center',width:'95%', height:'100%', flexDirection:'column',backgroundColor:'white',position:'relative', overflow:'auto'}}>
  
        {questions.slice(currentQuestionIndex, currentQuestionIndex + 5).map((question, index) => (
  <div className='qn mt-2 mb-2 p-3 bg-blue-100' style={{height:'fit-content', width:isSmallScreen?'100%':'90%',borderRadius:'5px'}} key={index}>
    <form className='' style={{display:'flex', flexDirection:'column'}}>
      <p>{index + 1 + currentQuestionIndex}. Your question here?</p>
      <label>
        <input type="radio" name={`choice${index}`} value="choice1" className='ml-2 mr-2'
          checked={answers[currentQuestionIndex + index] === 'choice1'}
          onChange={() => handleAnswerChange(currentQuestionIndex + index, 'choice1')}
        />
        Choice 1
      </label>
      <label>
        <input type="radio" name={`choice${index}`} value="choice2" className='ml-2 mr-2'
          checked={answers[currentQuestionIndex + index] === 'choice2'}
          onChange={() => handleAnswerChange(currentQuestionIndex + index, 'choice2')}
        />
        Choice 2
      </label>
      <label>
        <input type="radio" name={`choice${index}`} value="choice3" className='ml-2 mr-2'
          checked={answers[currentQuestionIndex + index] === 'choice3'}
          onChange={() => handleAnswerChange(currentQuestionIndex + index, 'choice3')}
        />
        Choice 3
      </label>
      <label>
        <input type="radio" name={`choice${index}`} value="choice4" className='ml-2 mr-2'
          checked={answers[currentQuestionIndex + index] === 'choice4'}
          onChange={() => handleAnswerChange(currentQuestionIndex + index, 'choice4')}
        />
        Choice 4
      </label>
    </form>
  </div>
))}

<div className='' style={{display: 'flex', flexDirection:'row', width:isSmallScreen?'100%':'90%'}}>
<button style={{flex:'1'}} className='btn btn-primary' onClick={handleBackClick} disabled={!hasPrevious}>
        Back
      </button>
    <p className='rang' style={{flex:'3', display:'flex',justifyContent:'center',alignItems:'center',height:'100%'}}>{firstQuestionNumber}-{lastQuestionNumber}</p>
    <button style={{flex:'1', display:hasNext?'':'none'}} className='btn btn-primary' onClick={handleNextClick}>
        Next
      </button>
      <button style={{flex:'1', display:hasNext?'none':''}} className='btn btn-primary' onClick={handleOpenDialog}>
        Finish Attempt
      </button>
  </div>
</div>
        
        </div>
       </div>

       <div className='question-status-container' style={{display: 'flex', justifyContent: 'center',width:'95%', flexDirection:'column',margin:'5px'}}>
        <div className='' style={{flex:'3',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',borderBottom:'1px solid gray',borderTop:'1px solid gray'}}>
            <div className='' style={{flex:'1',display:'flex', flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
                <p style={{
        width: '30px',
        height: '30px',
        margin: '5px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border:'1px solid black',
        borderRadius:'3px',
        backgroundColor:'gray' ,
      }}>
                </p>
                <p className='' 
                style={{display:'flex',alignItems:'center',justifyContent:'center',textAlign:'center',height:'100%',margin:'0'}}>Answered</p>
            </div>
            <div className='' style={{flex:'1',display:'flex', flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                <p style={{
        width: '30px',
        height: '30px',
        margin: '5px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:'3px',
        border:'1px solid black',
        backgroundColor:'white' ,
      }}>
                </p>
                <p className='' 
                style={{display:'flex',alignItems:'center',justifyContent:'center',textAlign:'center',height:'100%',margin:'0'}}>Unanswered</p>
            </div>
        </div>
        <div className='' style={{flex:'3', display:'flex',flexDirection:'row',
        flexWrap:'wrap',alignContent:'start'
        }}>
  {answers.map((answer, index) => (
    <div 
      key={index}
      className={`question-status-box ${answer !== null ? 'answered' : ''}`}
      style={{
        width: '40px',
        height: '35px',
        margin: '5px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border:'1px solid black',
        borderRadius:'3px',
        backgroundColor: answer !== null ? 'grey' : 'white',
      }}
    >
      {index + 1}
    </div>
  ))}
</div>
     </div>
     </div>
    </div>
);
}
export default Question;