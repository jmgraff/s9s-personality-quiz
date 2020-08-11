import {createStore, combineReducers} from 'redux';
//import {devToolsEnhancer} from 'redux-devtools-extension';

import {intro} from './intro.js';
import {results} from './results.js';
import {questions} from './questions.js';
import {answers} from './answers.js';

export const getQuizDataJSON = store => ({ quizDataJSON: JSON.stringify(store) });
//export const store = createStore(combineReducers({intro, results, questions, answers}), devToolsEnhancer());

const combined = combineReducers({intro, results, questions, answers});

export const store = window.quizData ? createStore(combined, JSON.parse(window.quizData)) : createStore(combined);
