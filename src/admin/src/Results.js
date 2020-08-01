import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Grid, Accordion, Divider, Header, Form, Segment, Input, Button, TextArea, Card } from 'semantic-ui-react';

import { getResults, remove, add, setTitle, setDescription, setImageURL } from './store/results.js';

function Results(props) {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <>
            <Accordion styled fluid>
                {props.results.map((r, i) => (
                    <>
                        <Accordion.Title index={i} active={activeIndex === i} onClick={ () => setActiveIndex(i) }>
                            <Grid columns={2}>
                                <Grid.Column>
                                    <Header as='h3'>Result {i + 1}: {r.title}</Header>
                                </Grid.Column>
                                <Grid.Column textAlign='right'>
                                    <Button.Group  size='mini'>
                                        <Button as='a' onClick={e => props.remove(r.id)} color='red'>&times; Delete</Button>
                                    </Button.Group>
                                </Grid.Column>
                            </Grid>
                        </Accordion.Title>
                        <Accordion.Content active={activeIndex === i}>
                            <Form.Field
                                placeholder='Title text'
                                control={Input}
                                data-testid="result-input"
                                name="title"
                                value={r.title}
                                onChange={e => props.setTitle(r.id, e.target.value)}
                            />
                            <Form.Field
                                placeholder='Description'
                                control={TextArea}
                                name="description"
                                value={r.description}
                                onChange={e => props.setDescription(r.id, e.target.value)}
                            />
                        </Accordion.Content>
                    </>
                ))}
            </Accordion>
            <Button as='a' onClick={e => props.add()}>&#43; Add Result</Button>
        </>
    );
}

const mapStateToProps = (state) => ({ results: getResults(state) });
export default connect(mapStateToProps, { remove, add, setTitle, setDescription, setImageURL })(Results);
