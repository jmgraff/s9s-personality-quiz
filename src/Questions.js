import { connect } from 'react-redux';
const { Button, TextControl, Icon } = wp.components;
import { image } from '@wordpress/icons';

import ItemTabs from './ItemTabs.js';
import Answers from './Answers.js';

import { getQuestions, remove as removeQuestion, add, moveLeft, moveRight, setTitle, setImageURL } from './store-questions.js';
import { removeQuestionAnswers } from './store-answers.js';


function Questions({questions, removeQuestion, removeQuestionAnswers, add, moveLeft, moveRight, setTitle, setImageURL}) {

    const remove = (id) => {
        removeQuestion(id);
        removeQuestionAnswers(id);
    }

    return (
        <ItemTabs
            items={questions}
            itemName={'Question'}
            onAdd={() => add()}
            onRemove={q => remove(q.id)}
            onMoveLeft={q => moveLeft(q.id)}
            onMoveRight={q => moveRight(q.id)}
            onMediaChange={(q, url) => setImageURL(q.id, url) }
            renderItem={(q) => (
                <>
                    <TextControl
                        label="Question Title"
                        onChange={ val => setTitle(q.id, val) }
                        value={ q.title }
                    />
                    <Answers question_id={ q.id } />
                </>
            )}
        />
    )
}

const mapStateToProps = state => ({ questions: getQuestions(state) });
export default connect(mapStateToProps, { removeQuestion, removeQuestionAnswers, add, moveLeft, moveRight, setTitle, setImageURL })(Questions);
