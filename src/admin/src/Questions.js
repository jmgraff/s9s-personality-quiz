import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Accordion, Form, Button, List } from 'semantic-ui-react';

import Answers from './Answers.js';

import { getQuestions, remove, add, up, down, setTitle, setImageURL } from './store/questions.js';
import AccordionHeader from './AccordionHeader.js';

function Questions(props) {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <List>
            <Accordion styled fluid>
                {props.questions.map((q,i) => (
                    <List.Item key={q.id}>
                        <Accordion.Title index={i} active={activeIndex === i} onClick={() => setActiveIndex(i)}>
                            <AccordionHeader
                                index={i}
                                name='Question'
                                title={q.title}
                                id={q.id}
                                remove={props.remove}
                                up={props.up}
                                down={props.down} />
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
                    </List.Item>
                ))}
                <Button as='a' id='reactquiz-add-question-button' onClick={e => props.add()}>&#43; Add Question </Button>
            </Accordion>
        </List>
    );
}

const mapStateToProps = state => ({ questions: getQuestions(state) });
export default connect(mapStateToProps, {remove, add, up, down, setTitle, setImageURL})(Questions);
