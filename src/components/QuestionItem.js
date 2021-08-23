import React from "react";

function QuestionItem({ question,handleDelete,handleNewAnswer }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function onDelete() {
    handleDelete(question);
  }

  function onAnswerIndexChange(e) {

    handleNewAnswer(question,e.target.value)
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange={onAnswerIndexChange} defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={onDelete}>Delete Question</button>
    </li>
  );
}
export default QuestionItem;
