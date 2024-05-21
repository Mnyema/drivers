import React, {useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

function Question(){
    const navigate = useNavigate();
const isSmallScreen = window.matchMedia('(max-width: 768px)').matches;
const [questions, setQuestions] = useState([]);
const [answers, setAnswers] = useState(Array(questions.length).fill(null));
const [seconds, setSeconds] = useState(parseInt(localStorage.getItem('timer')) || 30*60);
const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

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

  useEffect(() => {
    fetch('https://rsallies.azurewebsites.net/api/questions')
      .then(response => response.json())
      .then(data => {
        setQuestions(data.value);
        const savedAnswers = localStorage.getItem('answers');
        if (savedAnswers) {
          setAnswers(JSON.parse(savedAnswers)); // Load from local storage
        } else {
          setAnswers(Array(data.value.length).fill(null)); // Initialize answers here
        }
      });
  }, []);

  function handleChoiceClick(index, choiceId) {
    // Update the answers state with the new answer
    setAnswers(prevAnswers => {
      const newAnswers = [...prevAnswers];
      newAnswers[index] = choiceId;
      localStorage.setItem('answers', JSON.stringify(newAnswers)); // Save to local storage 
      return newAnswers;
    });
  }

  function handleSubmitClick() {
    // Here you can send the answers to MyResults.js
    // For example, you can use the useHistory hook from react-router-dom to navigate to the MyResults component and pass the answers as state
  }

  const redirecttofinish = () => {
    navigate('/finish-attempt');
  };
  const goBack = () => {
   navigate('/question')
  };
 

  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

return(
    <div className='' style={{display:'flex', height:'100vh', width:'100vw', alignItems:'center',justifyContent:'center',position:'fixed'}}>
     <div className='' style={{height:'100vh', width:'95%',display:'flex', flexDirection:'column',justifyContent:'center'}}>
        <div className='' style={{display:'flex',flexDirection:'row', flex:'1',
         width:'100%',top:'0',position:'sticky', zIndex:'10000', alignItems:'center',
         backgroundColor:'',
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
    <Button onClick={() => { redirecttofinish(); handleCloseDialog(); handleSubmitClick();}} style={{width:'30%'}}
    color="success" variant='contained'>
      Submit
    </Button>
  </DialogActions>
</Dialog>

        <div className='' style={{flex:3, alignItems:'center', justifyContent:'flex-start'}}>
        <h3 className='text-2xl text-center font-mono font-bold' style={{display:'flex', justifyContent:'flex-start'}}>Driver-Centric Theoretical Testing System</h3>
        </div>
        
        <div className='' style={{flex:'1',display:'flex',width:'100%', height:'90%', alignItems:'center',justifyContent:'flex-end'}}>
         <p className='bg-blue-600 font-bold text-lg text-white' 
         style={{height:isSmallScreen?'80%':'90%',width:isSmallScreen?'90%':'40%', marginBottom:'0',display:'flex', justifyContent:'center', alignItems:'center', borderRadius:'5px'}}>
           {Math.floor(seconds / 60)}:{seconds % 60 < 10 ? '0' : ''}{seconds % 60}
         </p>
        </div>
        </div>
        
       <div className='' style={{display:'flex', flex:'12',width:'100%',height:'100%', justifyContent:'center',overflow:'auto' }}>
        <div className='' style={{display:'flex',alignItems:'center',justifyContent:'center',width:'95%', height:'100%', flexDirection:'column',backgroundColor:'white',overflow:'auto'}}>

        <div className='question' style={{display:'flex',alignItems:'center',width:'95%', height:'100%', flexDirection:'column',backgroundColor:'white',position:'relative', }}>
  
        {Array.isArray(questions) && questions.slice(currentQuestionIndex, currentQuestionIndex + 5).map((question, index) => (
  <div key={question.id} className='qn mt-2 mb-2 p-3 bg-blue-100' style={{height:'fit-content', width:isSmallScreen?'100%':'90%',borderRadius:'5px'}} >
    <p>{currentQuestionIndex + index + 1}. {question.questionText}</p>
    {question.choices.map(choice => (
  <div key={choice.id} style={{ display: 'flex', alignItems: 'center' }}>
    <input className='mr-2 ml-2'
      type="radio" 
      id={choice.id} 
      name={question.id} 
      value={choice.choiceText} 
      onChange={() => handleChoiceClick(currentQuestionIndex + index, choice.id)}
      checked={answers[currentQuestionIndex + index] === choice.id} 
    />
    <label htmlFor={choice.id} style={{ flex: 1 }}>{choice.choiceText}</label>
  </div>
))}
  </div>
))}


<div className='' style={{display: 'flex', flexDirection:'row', width:isSmallScreen?'100%':'90%'}}>
<button className='btn btn-primary' style={{flex:'1',}}
    onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 5)}
    disabled={currentQuestionIndex === 0}
  >
    Previous
  </button>
    <p className='rang' style={{flex:'3', display:'flex',justifyContent:'center',alignItems:'center',height:'100%'}}>
    {currentQuestionIndex + 1} - {Math.min(currentQuestionIndex + 5, questions.length)} 
    </p>
    {currentQuestionIndex + 5 < questions.length ? (
    <button className='btn btn-primary' style={{flex:'1'}}
      onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 5)}
    >
      Next
    </button>
  ) : (
    <button className='btn btn-primary' style={{flex:'1'}}
      onClick={handleOpenDialog}
    >
      Finish Attempt
    </button>
  )}
  </div>
</div>
        
        </div>
       </div>

       <div className='question-status-container' style={{display: 'flex', justifyContent: 'center',width:'95%', flexDirection:'column',margin:'5px'}}>
        <div className='' style={{flex:'2',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',borderBottom:'1px solid gray',borderTop:'1px solid gray'}}>
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
   {Array.isArray(answers) && answers.map((answer, index) => (
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