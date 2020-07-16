import React, {useState, useEffect} from 'react';
import {v4 as uuidv4} from 'uuid';
import { Divider, Header, Form, Segment, Input, Button, TextArea, Card } from 'semantic-ui-react';

function Results(props) {
    const [results, setResults] = useState(props.data.map(r => {
        if (!r.id) {
            r.id = uuidv4();
        }
        return r;
    }));

    const onChange = props.onChange;

    useEffect(() => {
        onChange(results);
    }, [results]);

    function handleAdd(e) {
        e.preventDefault();
        setResults([...results, {id: uuidv4(), title: '', value: uuidv4()}]);
    }

    function handleRemove(e, index) {
        e.preventDefault();
        setResults(results.filter((a,i) => i !== index));
    }

    function onLocalChange(e, i) {
        const currentState = [...results];
        currentState[i][e.target.name] = e.target.value;
        setResults(currentState);
    }

    function renderResults() {
        return (
            <Card.Group>
                {results.map((x,i) => (
                    <Card>
                        <Card.Content>
                            <Card.Header>
                                Result {i + 1}
                            </Card.Header>
                        </Card.Content>
                        <Card.Content>
                            <Form.Field
                                label='Title'
                                control={Input}
                                data-testid="result-input"
                                name="title"
                                value={x.title}
                                onChange={e => onLocalChange(e,i)}
                            />
                            <Form.Field
                                label='Description'
                                control={TextArea}
                                name="description"
                                value={x.description}
                                onChange={e => onLocalChange(e,i)}
                            />
                        </Card.Content>
                        <Card.Content extra>
                            <Button
                                data-testid="remove-button"
                                onClick={e => handleRemove(e,i)}
                                basic color='red'
                            >
                                Delete
                            </Button>
                        </Card.Content>
                    </Card>
                ))}
            </Card.Group>
        );
    }

    return (
        <Segment>
            <Header as='h3'>Results</Header>
            { results.length > 0 ? renderResults() : 'No results. Click button below to add.' }
            <Divider />
            <Button onClick={e => handleAdd(e)}>Add Result</Button>
        </Segment>
    );
}

export default Results;
