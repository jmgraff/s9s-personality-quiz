import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Grid, Accordion, Form, List, Button, Segment, Header } from 'semantic-ui-react';

import Answers from './Answers.js';

import { getQuestions, remove, add, up, down, setTitle, setImageURL } from './store/questions.js';

function Questions(props) {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <>
            <Accordion styled fluid>
                {props.questions.map((q,i) => (
                    <>
                        <Accordion.Title index={i} active={activeIndex === i} onClick={() => setActiveIndex(i)}>
                            <Grid columns={2}>
                                <Grid.Column>
                                    <Header as='h3'>Question {i + 1}: {q.title}</Header>
                                </Grid.Column>
                                <Grid.Column textAlign='right'>
                                    <Button.Group  size='mini'>
                                        <Button as='a' onClick={e => props.up(i)}>&#9650; Move Up</Button>
                                        <Button as='a' onClick={e => props.down(i)}>&#9660; Move Down</Button>
                                        <Button as='a' onClick={e => props.remove(q.id)} color='red'>&times; Delete</Button>
                                    </Button.Group>
                                </Grid.Column>
                            </Grid>
                        </Accordion.Title>
                        <Accordion.Content active={activeIndex === i}>
                            <Form.Input
                                type="text"
                                name='title' placeholder='Question text'
                                value={q.title}
                                fluid
                                onChange={e => props.setTitle(q.id, e.target.value)} />
                            <Form.Input
                                type="text"
                                name='image_url'
                                value={q.image_url}
                                fluid
                                onChange={e => props.setImageURL(q.id, e.target.value)} />
                            <Answers question_id={q.id} />
                        </Accordion.Content>
                    </>
                ))}
                <Button as='a' id='reactquiz-add-question-button' onClick={e => props.add()}>&#43; Add Question </Button>
            </Accordion>
        </>
    );
}

const mapStateToProps = state => ({ questions: getQuestions(state) });
export default connect(mapStateToProps, {remove, add, up, down, setTitle, setImageURL})(Questions);
