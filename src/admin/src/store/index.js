import {createStore, combineReducers} from 'redux';
import {devToolsEnhancer} from 'redux-devtools-extension';

import {intro} from './intro.js';
import {results} from './results.js';
import {questions} from './questions.js';
import {answers} from './answers.js';

export const getQuizDataJSON = store => ({ quizDataJSON: JSON.stringify(store) });
export const store = createStore(combineReducers({intro, results, questions, answers}), devToolsEnhancer());



