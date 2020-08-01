import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Header, Grid, Accordion, Segment, Form, List, Button } from 'semantic-ui-react';

import { getAnswers, remove, add, setTitle, up, down, setImageURL, setResultID } from './store/answers.js';

function Answers(props) {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
            <>
                <Accordion styled fluid>
                    {props.answers.map((a,i) => (
                        <>
                            <Accordion.Title index={i} active={activeIndex === i} onClick={() => setActiveIndex(i)}>
                                <Grid columns={2}>
                                    <Grid.Column>
                                        <Header as='h4'>Answer {i + 1}: {a.title}</Header>
                                    </Grid.Column>
                                    <Grid.Column textAlign='right'>
                                        <Button.Group  size='mini' basic>
                                            <Button as='a' onClick={e => props.up(i)}>&#9650; Move Up</Button>
                                            <Button as='a' onClick={e => props.down(i)}>&#9660; Move Down</Button>
                                            <Button as='a' onClick={e => props.remove(a.id)}>&times; Delete</Button>
                                        </Button.Group>
                                    </Grid.Column>
                                </Grid>
                            </Accordion.Title>
                            <Accordion.Content active={activeIndex === i}>
                                <Form.Input
                                    placeholder="Answer text"
                                    type="text"
                                    name='title'
                                    value={a.title}
                                    onChange={e => props.setTitle(a.id, e.target.value)}
                                    fluid
                                />
                            </Accordion.Content>
                        </>
                    ))}
                </Accordion>
                <Button as='a' onClick={e => props.add(props.question_id)}>&#43; Add Answer</Button>
            </>
    );
}

const mapStateToProps = (state, ownProps) => ({ answers: getAnswers(state, ownProps.question_id) });
export default connect(mapStateToProps, {remove, add, setTitle, up, down, setImageURL, setResultID})(Answers);

