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

  function handleMoveUp(e, index) {
    if ((index - 1) < 0) {
      console.log("Can't move up");
      return;
    }
    const state = [...answers];
    const [movedItem] = state.splice(index, 1);
    state.splice(index - 1, 0, movedItem);
    setAnswers(state);
    props.onChange(state);
  }

  function handleMoveDown(e, index) {
    if ((index + 1) >= answers.length) {
      console.log("Can't move down");
      return;
    }
    const state = [...answers];
    const [movedItem] = state.splice(index, 1);
    state.splice(index + 1, 0, movedItem);
    setAnswers(state);
    props.onChange(state);
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
           data-testid="answer-input"
           type="text" 
           name='answer' 
           value={a.answer}
           onChange={e => onChange(e,i)}
         />
         <input 
           data-testid="value-input"
           type="text" 
           name='value' 
           size="3" 
           value={a.value} 
           onChange={e => onChange(e,i)}/>
         <button 
            data-testid="move-up-button" 
            onClick={e => handleMoveUp(e,i)}>
             &9650; 
         </button>
         <button 
            data-testid="move-down-button" 
            onClick={e => handleMoveDown(e,i)}>
             &9660; 
         </button>
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
