import { connect } from 'react-redux';
import { Button, TextControl, Icon } from '@wordpress/components';
import { image } from '@wordpress/icons';

import ItemTabs from './ItemTabs.js';
import Answers from './Answers.js';

import { getQuestions, remove, add, moveLeft, moveRight, setTitle, setImageURL } from './store-questions.js';


function Questions({questions, remove, add, moveLeft, moveRight, setTitle, setImageURL}) {

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
export default connect(mapStateToProps, {remove, add, moveLeft, moveRight, setTitle, setImageURL})(Questions);
