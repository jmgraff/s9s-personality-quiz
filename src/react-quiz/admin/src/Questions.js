import React, {useState} from 'react';
import Answers from './Answers.js';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import {v4 as uuidv4} from 'uuid';

function Questions(props) {
  const [questions, setQuestions] = useState(props.data.map(q => {
    if (!q.id) { 
      q.id = uuidv4();
    }
    return q;
  }));

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
    setQuestions([...questions, {id: uuidv4(), question: '', answers: []}]);
  }

  function handleRemove(e, index) {
    setQuestions(questions.filter((q,i) => i !== index));
  }

  function handleDragEnd(r) {
    if (!r.destination) {
      console.log("Dropped outside drop zone!");
      return;
    }
    const state = [...questions]; 
    const [movedItem] = state.splice(r.source.index, 1);
    state.splice(r.destination.index, 0, movedItem);
    setQuestions(state);
    props.onChange(state);
  }

  function renderQuestions(data) {
    return data.map((q,i) => {
      console.log(`Question: ${q.question}`);
      return (
        <Draggable key={q.id} draggableId={q.id} index={i}>
          {(provided, snapshot) => (
            <li 
             key={q.id} 
             data-testid={`question-${i}`}
             ref={provided.innerRef}
             {...provided.draggableProps}
             {...provided.dragHandleProps}
            >
              <input 
                type="text" 
                name="question" 
                value={q.question} 
                onChange={e => onQuestionChange(e, i)}
              />
              <button 
                data-testid="remove-question-button"
                onClick={e => handleRemove(e,i) }>
                  &times;
              </button>
              <Answers 
                data={q.answers} 
                onChange={data => onAnswerChange(data, i)}
              />
            </li>
          )}
        </Draggable>
      );
    });
  }

  return(
    <DragDropContext onDragEnd={r => handleDragEnd(r)}>
      <Droppable type="questions" droppableId="questions">
        {(provided, snapshot) => (
          <ul
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {renderQuestions(questions)}
            {provided.placeholder}
            <button onClick={e => handleAdd(e)} >Add Question</button>
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Questions;
