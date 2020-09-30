import { connect } from 'react-redux';
import ellipsize from 'ellipsize';

const { TextControl, Card, CardBody, CardFooter, Button, SelectControl, TabPanel } = wp.components;

import { getAnswers, remove, add, setTitle, up, down, setImageURL, setResultID } from './store-answers.js';
import { getResults } from './store-results.js';

function Answers({question_id, results, answers, remove, add, setTitle, up, down, setImageURL, setResultID}) {
    const tabs = answers.map((a,i) => ({
        name: i,
        title: a.title ? ellipsize(a.title, 16) : `Answer ${i + 1}`,
        answer: a
    }));

    const resultOptions = results.map((r) => {
        return { value: r.id, label: r.title };
    });

    resultOptions.unshift({ value: '', label: 'None' });

    return (
        <>
            <TabPanel tabs={ tabs }>
                {(tab) => (
                    <Card>
                        <CardBody>
                            <TextControl
                                label="Answer Text"
                                value={tab.answer.title}
                                onChange={val => setTitle(tab.answer.id, val)}
                            />
                            <SelectControl
                                label="Associated Result"
                                value={tab.answer.result_id}
                                options={resultOptions}
                                onChange={val => setResultID(tab.answer.id, val)}
                            />
                        </CardBody>
                        <CardFooter>
                            <Button onClick={e => remove(tab.answer.id)} isDestructive>&times; Remove Answer </Button>
                        </CardFooter>
                    </Card>
                )}
            </TabPanel>
            <Button onClick={e => add(question_id)} isPrimary>&#43; Add Answer</Button>
        </>
    );
}

const mapStateToProps = (state, ownProps) => ({
    answers: getAnswers(state, ownProps.question_id),
    results: getResults(state)
});
export default connect(mapStateToProps, {remove, add, setTitle, up, down, setImageURL, setResultID})(Answers);
