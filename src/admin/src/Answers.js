import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Accordion, Form, Button, List } from 'semantic-ui-react';

import AccordionHeader from './AccordionHeader.js';
import { getAnswers, remove, add, setTitle, up, down, setImageURL, setResultID } from './store/answers.js';

function Answers(props) {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
            <List>
                <Accordion styled fluid>
                    {props.answers.map((a,i) => (
                        <List.Item key={a.id}>
                            <Accordion.Title index={i} active={activeIndex === i} onClick={() => setActiveIndex(i)}>
                                <AccordionHeader
                                    index={i}
                                    name='Answer'
                                    title={a.title}
                                    id={a.id}
                                    remove={props.remove}
                                    up={props.up}
                                    down={props.down}
                                    as='h4'
                                    size='mini'/>
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
                        </List.Item>
                    ))}
                </Accordion>
                <Button as='a' onClick={e => props.add(props.question_id)}>&#43; Add Answer</Button>
            </List>
    );
}

const mapStateToProps = (state, ownProps) => ({ answers: getAnswers(state, ownProps.question_id) });
export default connect(mapStateToProps, {remove, add, setTitle, up, down, setImageURL, setResultID})(Answers);

