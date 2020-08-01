import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Accordion, Form, Input, Button, TextArea, List } from 'semantic-ui-react';

import { getResults, remove, add, setTitle, setDescription, setImageURL } from './store/results.js';

import AccordionHeader from './AccordionHeader.js';

function Results(props) {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <List>
            <Accordion styled fluid>
                {props.results.map((r, i) => (
                    <List.Item key={r.id}>
                        <Accordion.Title index={i} active={activeIndex === i} onClick={ () => setActiveIndex(i) }>
                            <AccordionHeader
                                index={i}
                                name='Result'
                                title={r.title}
                                id={r.id}
                                remove={props.remove} />
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
                    </List.Item>
                ))}
            </Accordion>
            <Button as='a' onClick={e => props.add()}>&#43; Add Result</Button>
        </List>
    );
}

const mapStateToProps = (state) => ({ results: getResults(state) });
export default connect(mapStateToProps, { remove, add, setTitle, setDescription, setImageURL })(Results);
