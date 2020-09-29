import { connect } from 'react-redux';
const { Button, Card, CardHeader, CardBody, CardFooter, TextareaControl, TextControl, TabPanel } = wp.components;

import Answers from './Answers.js';

import { getQuestions, remove, add, up, down, setTitle, setImageURL } from './store-questions.js';

function Questions({questions, remove, add, up, down, setTitle, setImageURL}) {
    const tabs = questions.map((q,i) => ({
        name: i,
        title: q.title ? q.title : `Question ${i + 1}`,
        className: 'question'
    }));

    return (
        <>
            <TabPanel tabs={tabs}>
                { (tab) => (
                    <Card>
                        <CardBody>
                            <TextControl
                                label="Question Title"
                                onChange={ val => setTitle(questions[tab.name].id, val) }
                                value={ questions[tab.name].title }
                            />
                            <Answers question_id={questions[tab.name].id} />
                        </CardBody>
                        <CardFooter>
                            <Button onClick={e => remove(questions[tab.name].id)} isDestructive>&times; Remove Question </Button>
                        </CardFooter>
                    </Card>
                )}
            </TabPanel>
            <Button onClick={e => add()} isPrimary>&#43; Add Question </Button>
        </>
    );
}

const mapStateToProps = state => ({ questions: getQuestions(state) });
export default connect(mapStateToProps, {remove, add, up, down, setTitle, setImageURL})(Questions);
