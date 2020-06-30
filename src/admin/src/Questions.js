import React, {useState, useEffect} from 'react';
import Answers from './Answers.js';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import {v4 as uuidv4} from 'uuid';

function Questions(props) {
    let propQuestions = props.data ? props.data : [];

    const [questions, setQuestions] = useState(propQuestions.map(q => {
        if (!q.id) {
            q.id = uuidv4();
        }
        return q;
    }));

    useEffect(() => {
        if (props.onChange) {
            props.onChange(questions);
        }
    }, [questions]);

    function onQuestionChange(e, i) {
        const currentState = [...questions];
        currentState[i].question = e.target.value;
        setQuestions(currentState);
    }

    function onImageChange(e, i) {
        const currentState = [...questions];
        currentState[i].image = e.target.value;
        setQuestions(currentState);
    }

    function onAnswerChange(data, i) {
        const currentState = [...questions];
        currentState[i].answers = data;
        setQuestions(currentState);
    }

    function handleAdd(e) {
        e.preventDefault();
        const currentState = [...questions, {id: uuidv4(), question: '', image: '', answers: []}];
        setQuestions(currentState);
    }

    function handleRemove(e, index) {
        const currentState = questions.filter((q,i) => i !== index);
        setQuestions(currentState);
    }

    function handleDragEnd(r) {
        if (!r.destination) {
            return;
        }
        const state = [...questions];
        const [movedItem] = state.splice(r.source.index, 1);
        state.splice(r.destination.index, 0, movedItem);
        setQuestions(state);
    }

    function renderQuestions(data) {
        if (data == undefined) return;
        return data.map((q,i) => {
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
                            <input
                                type="text"
                                name="image"
                                value={q.image}
                                onChange={e => onImageChange(e, i)}
                            />
                            <button 
                                data-testid="remove-question-button"
                                onClick={e => handleRemove(e,i) }
                            >
                                &times;
                            </button>
                            <Answers
                                data={q.answers}
                                results={props.results}
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
                        {props.data ? renderQuestions(questions): null}
                        {provided.placeholder}
                        <button
                            id='reactquiz-add-question-button'
                            onClick={e => handleAdd(e)}
                        >
                            Add Question
                        </button>
                    </ul>
                )}
            </Droppable>
        </DragDropContext>
    );
}

export default Questions;
