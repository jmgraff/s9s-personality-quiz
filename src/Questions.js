import { connect } from 'react-redux';
const { Button, Card, CardHeader, CardBody, CardFooter, TextareaControl, TextControl } = wp.components;

import Answers from './Answers.js';

import { getQuestions, remove, add, up, down, setTitle, setImageURL } from './store-questions.js';

function Questions(props) {

    return (
        <div>
            {props.questions.map((q,i) => (
                <Card>
                    <CardBody>
                        <TextControl
                            label="Question Title"
                            onChange={ val => props.setTitle(q.id, val) }
                            value={ q.title }
                        />
                        <Answers question_id={q.id} />
                    </CardBody>
                    <CardFooter>
                        <Button onClick={e => props.remove(q.id)} isDestructive>&times; Remove Question </Button>
                    </CardFooter>
                </Card>
            ))}
            <Button onClick={e => props.add()} isPrimary>&#43; Add Question </Button>
        </div>
    );
}

const mapStateToProps = state => ({ questions: getQuestions(state) });
export default connect(mapStateToProps, {remove, add, up, down, setTitle, setImageURL})(Questions);
