import React from 'react';
import { connect } from 'react-redux';
import { Divider, Header, Form, Segment, Input, Button, TextArea, Card } from 'semantic-ui-react';

import { getResults, remove, add, setTitle, setDescription, setImageURL } from './store/results.js';

function Results(props) {

    function renderResults() {
        return (
            <Card.Group>
                {props.results.map((x,i) => (
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
                                onChange={e => props.setTitle(x.id, e.target.value)}
                            />
                            <Form.Field
                                label='Description'
                                control={TextArea}
                                name="description"
                                value={x.description}
                                onChange={e => props.setDescription(x.id, e.target.value)}
                            />
                        </Card.Content>
                        <Card.Content extra>
                            <Button
                                as='a'
                                data-testid="remove-button"
                                onClick={e => props.remove(x.id)}
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
            { props.results.length > 0 ? renderResults() : 'No results. Click button below to add.' }
            <Divider />
            <Button as='a' onClick={e => props.add()}>Add Result</Button>
        </Segment>
    );
}

const mapStateToProps = (state) => ({ results: getResults(state) });
export default connect(mapStateToProps, { remove, add, setTitle, setDescription, setImageURL })(Results);
