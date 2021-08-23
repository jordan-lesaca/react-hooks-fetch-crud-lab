import React, {useState,useEffect} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const FETCH_URL = 'http://localhost:4000/questions'
  const [questions,setQuestions] = useState([])
  useEffect( () => {
    fetch(FETCH_URL)
      .then(r => r.json())
      .then(resp =>setQuestions(resp))

  },[]);

  function handleDelete(question) {
    const deleteConfigObj = {method: 'DELETE'}
    fetch(`${FETCH_URL}/${question.id}`,deleteConfigObj)
      .then(r => r.json())
      .then(resp => {
        const newQuestions = questions.filter((q)=>{
          return q.id !== question.id
        })
        setQuestions(newQuestions)
      } )

  }

  function handleNewAnswer(question,newIndex) {
    const patchConfigObj = {
      method:'PATCH',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({"correctIndex": newIndex})
    }
    const newQuestion = {...question, correctIndex:newIndex}

    fetch(`${FETCH_URL}/${question.id}`,patchConfigObj)
      .then(r => r.json())
      .then(resp => {

        const newQuestions = questions.map((q)=>{
          if (q.id === question.id) {
            return newQuestion
          } else {
           return q
          }
        })
        setQuestions(newQuestions)
      })
  }


  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => {
          return <QuestionItem key={question.prompt} 
          question={question} 
          handleDelete={handleDelete} 
          handleNewAnswer={handleNewAnswer}/>
      })}
      </ul>
    </section>
  );
}
export default QuestionList;