import { connect } from 'react-redux';
const { Button, Card, CardHeader, CardBody, CardFooter, TextareaControl, TextControl, TabPanel } = wp.components;

import ellipsize from 'ellipsize';

import Answers from './Answers.js';

import { getQuestions, remove, add, up, down, setTitle, setImageURL } from './store-questions.js';

function Questions({questions, remove, add, up, down, setTitle, setImageURL}) {
    const tabs = questions.map((q,i) => ({
        name: i,
        title: q.title ? ellipsize(q.title, 16) : `Question ${i + 1}`,
        question: q
    }));

    return (
        <>
            <TabPanel tabs={ tabs }>
                { (tab) => (
                    <Card>
                        <CardBody>
                            <TextControl
                                label="Question Title"
                                onChange={ val => setTitle(tab.question.id, val) }
                                value={ tab.question.title }
                            />
                            <Answers question_id={ tab.question.id } />
                        </CardBody>
                        <CardFooter>
                            <Button onClick={ e => remove(tab.question.id) } isDestructive>&times; Remove Question </Button>
                        </CardFooter>
                    </Card>
                )}
            </TabPanel>
            <Button onClick={ e => add() } isPrimary>&#43; Add Question </Button>
        </>
    );
}

const mapStateToProps = state => ({ questions: getQuestions(state) });
export default connect(mapStateToProps, {remove, add, up, down, setTitle, setImageURL})(Questions);
