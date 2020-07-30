import React from 'react';
import { connect } from 'react-redux';
import { Form, List, Button } from 'semantic-ui-react';

import { getAnswers, remove, add, setTitle, setImageURL, setResultID } from './store/answers.js';

function Answers(props) {
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
            <Button as='a' onClick={e => props.add(props.question_id)}>Add Answer</Button>
        </List>
    );
}

const mapStateToProps = (state, ownProps) => ({ answers: getAnswers(state, ownProps.question_id) });
export default connect(mapStateToProps, {remove, add, setTitle, setImageURL, setResultID})(Answers);

