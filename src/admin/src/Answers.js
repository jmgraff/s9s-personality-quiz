import React from 'react';
import { connect } from 'react-redux';
import { Form, List, Select, Button } from 'semantic-ui-react';
import {v4 as uuidv4} from 'uuid';

import { getAnswers, remove, add, setTitle, setImageURL, setResultID } from './store/answers.js';

function Answers(props) {
    const results = ['foo', 'bar', 'baz']; //FIXME

    return (
        <List>
            {props.answers.map((a,i) => (
                <List.Item key={a.id}>

                    <Form.Input
                        placeholder="Answer..."
                        type="text"
                        name='title'
                        value={a.title}
                        onChange={e => props.setTitle(a.id, e.target.value)}
                    />

                    <Button onClick={e => props.remove(a.id)} >
                        &times;
                    </Button>

                </List.Item>

            ))}

            <Button onClick={e => props.add(props.question_id)}>Add Answer</Button>
        </List>
    );
}

const mapStateToProps = (state, ownProps) => ({ answers: getAnswers(state, ownProps.question_id) });
export default connect(mapStateToProps, {remove, add, setTitle, setImageURL, setResultID})(Answers);

