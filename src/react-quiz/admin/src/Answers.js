import React, {useState} from 'react';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';

function Answers(props) {
  const [answers, setAnswers] = useState(props.data);

  function onChange(e, i) {
    const currentState = [...answers];
    currentState[i][e.target.name] = e.target.value;
    setAnswers(currentState);
    props.onChange(currentState);
  }

  function handleAdd(e) {
    setAnswers([...answers, {answer: '', value: ''}]);
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
    return answers.map((k,v) => {
      return (
        <Draggable key={v} draggableId={`${v}`} index={v}>
          {(provided, snapshot) => (
            <li
              key={v} 
              data-testid={`answer-${v}`}
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
           >
             <input 
               type="text" 
               name='answer' 
               value={k.answer} 
               onChange={e => onChange(e,v)}
             />
             <input 
               type="text" 
               name='value' 
               size="3" 
               value={k.value} 
               onChange={e => onChange(e,v)}/>
             <button 
                data-testid="remove-button" 
                onClick={e => handleRemove(e, v)}>
                  &times;
             </button>
            </li>
          )}
        </Draggable>
      );
    });
  }

  return (
      <DragDropContext onDragEnd={r => handleDragEnd(r)}>
        <Droppable droppableId="1">
          {(provided, snapshot) => (
            <ul
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {renderAnswers(answers)}
              {provided.placeholder}
              <button onClick={e => handleAdd(e)}>Add Answer</button>
            </ul>
          )}        
        </Droppable>
      </DragDropContext>
  );
}

export default Answers;
