import React, {useState} from 'react';
import Answers from './Answers.js';

function Questions(props) {
  const [questions, setQuestions] = useState(props.data);

  function onQuestionChange(e, i) {
    const currentState = [...questions];
    currentState[i].question = e.target.data;
    setQuestions(currentState);
    props.onChange(currentState);
  }

  function onAnswerChange(data, i) {
    const currentState = [...questions];
    currentState[i].answers = data;
    setQuestions(currentState);
    props.onChange(currentState);
  }

  function handleAdd(e) {
    setQuestions([...questions, {question: '', answers: []}]);
  }

  function handleRemove(e, index) {
    setQuestions(questions.filter((q,i) => i !== index));
  }

  function renderQuestions(data) {
    return data.map((k,v) => {
      return (
        <li key={v} data-testid={`question-${v}`}>
          <input 
            type="text" 
            name="question" 
            value={k.question} 
            onChange={e => onQuestionChange(e, v)}
          />
          <button 
            data-testid="remove-question-button"
            onClick={e => handleRemove(e,v) }>
              &times;
          </button>
          <Answers 
            data={k.answers} 
            onChange={data => onAnswerChange(data, v)}
          />
        </li>
      );
    });
  }

  return(
    <div>
      <ul>
        {renderQuestions(questions)}
      </ul>
      <button onClick={e => handleAdd(e)} >Add Question</button>
    </div>
  );
}

export default Questions;
