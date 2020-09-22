import { connect } from 'react-redux';
const { TextControl, Card, CardBody, CardFooter, Button, SelectControl } = wp.components;

import { getAnswers, remove, add, setTitle, up, down, setImageURL, setResultID } from './store-answers.js';
import { getResults } from './store-results.js';

function Answers(props) {
    let resultOptions = props.results.map((r) => {
        return { value: r.id, label: r.title };
    });

    resultOptions.unshift({ value: '', label: 'None'});

    return (
        <div>
            {props.answers.map((a,i) => (
                <Card>
                    <CardBody>
                        <TextControl
                            label="Answer Text"
                            value={a.title}
                            onChange={val => props.setTitle(a.id, val)}
                        />
                        <SelectControl
                            label="Associated Result"
                            value={a.result_id}
                            options={resultOptions}
                            onChange={val => props.setResultID(a.id, val)}
                        />
                    </CardBody>
                    <CardFooter>
                        <Button onClick={e => props.remove(a.id)} isDestructive>&times; Remove Answer </Button>
                    </CardFooter>
                </Card>
            ))}
            <Button onClick={e => props.add(props.question_id)} isPrimary>&#43; Add Answer</Button>
        </div>
    );
}

const mapStateToProps = (state, ownProps) => ({
    answers: getAnswers(state, ownProps.question_id),
    results: getResults(state)
});
export default connect(mapStateToProps, {remove, add, setTitle, up, down, setImageURL, setResultID})(Answers);
