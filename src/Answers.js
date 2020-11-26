import ellipsize from 'ellipsize';
import { connect } from 'react-redux';
import { TextControl, SelectControl, Snackbar } from '@wordpress/components';

import { getAnswers, remove, add, setTitle, moveLeft, moveRight, setResultID } from './store-answers.js';
import { getResults } from './store-results.js';

import QuizMediaUpload from './QuizMediaUpload.js';
import ItemTabs from './ItemTabs.js';

function Answers({question_id, results, answers, remove, add, setTitle, moveLeft, moveRight, setResultID}) {
    const resultOptions = results.map((r) => {
        return { value: r.id, label: r.title };
    });

    resultOptions.unshift({ value: '', label: 'None' });

    return (
        <ItemTabs
            items={answers}
            itemName={'Answer'}
            onAdd={() => add(question_id)}
            onRemove={a => remove(a.id)}
            onMoveLeft={a => moveLeft(a.id)}
            onMoveRight={a => moveRight(a.id)}
            renderItem = {a => (
                <>
                    <TextControl
                        label="Answer Text"
                        value={a.title}
                        onChange={val => setTitle(a.id, val)}
                    />
                    <SelectControl
                        label="Associated Result"
                        value={a.result_id}
                        options={resultOptions}
                        disabled={resultOptions.length <= 1}
                        onChange={val => setResultID(a.id, val)}
                    />
                    { resultOptions.length === 1 &&
                        <p style={{font: '.5em sans-serif', color: 'gray', fontStyle: 'italic', textAlign: 'right', margin: 0, padding: 0}}>
                            No results yet, add some on the Results tab!
                        </p>
                    }
                </>
            )}
        />
    );
}

const mapStateToProps = (state, ownProps) => ({
    answers: getAnswers(state, ownProps.question_id),
    results: getResults(state)
});
export default connect(mapStateToProps, {remove, add, setTitle, moveLeft, moveRight, setResultID})(Answers);
