import React from 'react';
import { connect } from 'react-redux';
import { Form, List, Button, Segment, Header } from 'semantic-ui-react';

import Answers from './Answers.js';

import { getQuestions, remove, add, setTitle, setImageURL } from './store/questions.js';

function Questions(props) {
    console.log('Questions.props: ', props);

    return (
        <List>
            {props.questions.map((q,i) => (
                <List.Item key={q.id}>
                    <Segment>
                        <Header as='h3'>Question {i + 1}</Header>
                        <Form.Input type="text" name='title' value={q.title} onChange={e => props.setTitle(q.id, e.target.value)} />
                        <Form.Input type="text" name='image_url' value={q.image_url} onChange={e => props.setImageURL(q.id, e.target.value)} />
                        <Button onClick={e => props.remove(q.id)}> &times; </Button>
                    </Segment>
                </List.Item>
            ))}
            <Button id='reactquiz-add-question-button' onClick={e => props.add()}> Add Question </Button>
        </List>
    );
}

const mapStateToProps = state => ({ questions: getQuestions(state) });
export default connect(mapStateToProps, {remove, add, setTitle, setImageURL})(Questions);
