import {createStore, combineReducers} from 'redux';
import {devToolsEnhancer} from 'redux-devtools-extension';

import {intro} from './intro.js';
import {questions} from './questions.js';
import {answers} from './answers.js';

/*
const initialState = window.quizData || { quizData: {
    intro: {
        title: '',
        description: '',
        image_url: '',
    },
    results: [
        {
            id: uuidv4(),
            title: '',
            description: '',
            image_url: ''
        }
    ],
}};
*/

export const getQuizDataJSON = store => {
    return { quizDataJSON: JSON.stringify(store) };
}

export const store = createStore(combineReducers({intro, questions, answers}), devToolsEnhancer());



