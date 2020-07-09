import React, {useState, useEffect} from 'react';
import { Form, List, Select, Button } from 'semantic-ui-react';
import {v4 as uuidv4} from 'uuid';

function Answers(props) {
    const [answers, setAnswers] = useState(props.data.map(a => {
        if (!a.id) {
            a.id = uuidv4();
        }
        return a;
    }));

    useEffect(() => {
        props.onChange(answers);
    }, [answers]);

    function onChange(e, i) {
        console.log('onChange fired: ', e);
        const currentState = [...answers];
        currentState[i][e.target.name] = e.target.value;
        setAnswers(currentState);
    }

    function handleAdd(e) {
        e.preventDefault();
        setAnswers([...answers, {id: uuidv4(), answer: '', value: ''}]);
    }

    function handleRemove(e, index) {
        e.preventDefault();
        setAnswers(answers.filter((a,i) => i !== index));
    }

    function handleMoveUp(e, index) {
        e.preventDefault();
        if ((index - 1) < 0) {
            return;
        }
        const state = [...answers];
        const [movedItem] = state.splice(index, 1);
        state.splice(index - 1, 0, movedItem);
        setAnswers(state);
    }

    function handleMoveDown(e, index) {
        e.preventDefault();
        if ((index + 1) >= answers.length) {
            return;
        }
        const state = [...answers];
        const [movedItem] = state.splice(index, 1);
        state.splice(index + 1, 0, movedItem);
        setAnswers(state);
    }

    function handleDragEnd(r) {
        if (!r.destination) {
            return;
        }
        const state = [...answers];
        const [movedItem] = state.splice(r.source.index, 1);
        state.splice(r.destination.index, 0, movedItem);
        setAnswers(state);
    }

    const results = props.results.map((r) => {
        return { key: r.id, text: r.title, value: r.value }
    });

    function renderAnswers(answers) {
        // TODO: add answer background image
        return answers.map((a,i) => {
            return (
                <List.Item key={a.id} data-testid={`answer-${i}`}>

                    <Form.Input
                        placeholder="Answer..."
                        data-testid="answer-input"
                        type="text"
                        name='answer'
                        value={a.answer}
                        onChange={e => onChange(e,i)}
                    />

                    <Form.Field
                        control={Select}
                        label='Result'
                        options={results}
                        onChange={e => onChange(e,i)}
                    />

                    <Button.Group>

                        <Button
                            data-testid="move-up-button"
                            onClick={e => handleMoveUp(e,i)}
                        >
                            &#9650;
                        </Button>

                        <Button
                            data-testid="move-down-button"
                            onClick={e => handleMoveDown(e,i)}
                        >
                            &#9660;
                        </Button>

                        <Button
                            data-testid="remove-button"
                            onClick={e => handleRemove(e,i)}
                        >
                            &times;
                        </Button>

                    </Button.Group>

                </List.Item>
            )
        });
    }

    return (
        <List>
            {renderAnswers(answers)}
            <Button onClick={e => handleAdd(e)}>Add Answer</Button>
        </List>
    );
}

export default Answers;
