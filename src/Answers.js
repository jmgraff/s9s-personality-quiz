import { connect } from 'react-redux';
const { TextControl, Card, CardBody, CardFooter, Button, SelectControl, TabPanel } = wp.components;

import { getAnswers, remove, add, setTitle, up, down, setImageURL, setResultID } from './store-answers.js';
import { getResults } from './store-results.js';

function Answers({question_id, results, answers, remove, add, setTitle, up, down, setImageURL, setResultID}) {
    const tabs = answers.map((a,i) => ({
        name: i,
        title: a.title ? a.title : `Answer ${i + 1}`,
        className: 'answer'
    }));

    const resultOptions = results.map((r) => {
        return { value: r.id, label: r.title };
    });

    resultOptions.unshift({ value: '', label: 'None'});

    return (
        <>
            <TabPanel tabs={tabs}>
                {(tab) => (
                    <Card>
                        <CardBody>
                            <TextControl
                                label="Answer Text"
                                value={answers[tab.name].title}
                                onChange={val => setTitle(answers[tab.name].id, val)}
                            />
                            <SelectControl
                                label="Associated Result"
                                value={answers[tab.name].result_id}
                                options={resultOptions}
                                onChange={val => setResultID(answers[tab.name].id, val)}
                            />
                        </CardBody>
                        <CardFooter>
                            <Button onClick={e => remove(answers[tab.name].id)} isDestructive>&times; Remove Answer </Button>
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
