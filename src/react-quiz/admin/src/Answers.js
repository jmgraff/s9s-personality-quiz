import React, {useState} from 'react';
import {v4 as uuidv4} from 'uuid';

function Answers(props) {
  const [answers, setAnswers] = useState(props.data.map(a => {
    if (!a.id) { 
      a.id = uuidv4();
    }
    return a;
  }));

  function onChange(e, i) {
    const currentState = [...answers];
    currentState[i][e.target.name] = e.target.value;
    setAnswers(currentState);
    props.onChange(currentState);
  }

  function handleAdd(e) {
    setAnswers([...answers, {id: uuidv4(), answer: '', value: ''}]);
  }

  function handleRemove(e, index) {
    setAnswers(answers.filter((a,i) => i !== index));
  }

  function handleDragEnd(r) {
    if (!r.destination) {
      console.log("Dropped outside drop zone!");
      return;
    }
    const state = [...answers]; 
    const [movedItem] = state.splice(r.source.index, 1);
    state.splice(r.destination.index, 0, movedItem);
    setAnswers(state);
    props.onChange(state);
  }


  function renderAnswers(answers) {
    return answers.map((a,i) => {
      return (
        <li key={a.id} data-testid={`answer-${i}`}>
         <input 
           type="text" 
           name='answer' 
           value={a.answer}
           onChange={e => onChange(e,i)}
         />
         <input 
           type="text" 
           name='value' 
           size="3" 
           value={a.value} 
           onChange={e => onChange(e,i)}/>
         <button 
            data-testid="remove-button" 
            onClick={e => handleRemove(e,i)}>
              &times;
         </button>
        </li>
      )
    });
  }

  return (
    <ul>
      {renderAnswers(answers)}
      <button onClick={e => handleAdd(e)}>Add Answer</button>
    </ul>
  );
}

export default Answers;
