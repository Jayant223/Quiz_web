import {useEffect, useState,useRef} from "react";
import FlashCardList from "./FlashCardList"
import Title from "./Title";
import "./app.css"
import axios from "axios";
function App() {
  const [flashcards,setflashcard]=useState([])
  const [categories,setCategories]=useState([]);
  const selectEl=useRef();
  const amountEl=useRef();
  useEffect(() =>{

  axios.get("https://opentdb.com/api_category.php")
  .then(res=>{
    setCategories( res.data.trivia_categories);
  })
  }, [])
  
  
  
  
  useEffect(() => {
    
  
  }, [])


  //use it to convert html text into string we want
  function decodeString(str){
    const textArea=document.createElement('textArea')
    textArea.innerHTML=str
    return textArea.value;
  }

  const onSubmitHandler=(e)=>{
   e.preventDefault();
   axios.get("https://opentdb.com/api.php?",{
  params:{
    amount:amountEl.current.value,
    category:selectEl.current.value
  }
  })
    .then(res=>{
     
      setflashcard(res.data.results.map((questionItem,index)=>{
        const answer=decodeString(questionItem.correct_answer)
        const options=[...questionItem.incorrect_answers.map(a=>
          decodeString(a)),answer]
         return{
           id:`${index}-${Date.now()}`,
           question:decodeString(questionItem.question),
           answer:answer,
           options:options.sort(()=>Math.random()-.5)

         }
      }))
      
    })
  }
  return (
    <>
    <Title></Title>
    <form className="header" onSubmit={onSubmitHandler}>
    <div className="form-group">
     <label htmlFor="category">Category</label>
     <select id="category" ref={selectEl}>
       {categories.map(categorie=>{
         return <option value={categorie.id} key={categorie.id} >{categorie.name}</option>
       })}
     </select>
     </div>
     <div className="form-group">
       <label htmlFor="amount">Number of Questions</label>
       <input type="number" id="amoount" min="1" step="1" defaultValue={10} ref={amountEl} />
     </div>
     <div className="form-group">
      <button className="btn">Submit</button>
     </div>
    </form>

     <div className="container">
    <FlashCardList flashcards={flashcards}></FlashCardList>
    </div>
    </>
  );
}



export default App;
