import { createStore, combineReducers, applyMiddleware } from 'redux';
import produce from 'immer';

import { intro } from './store-intro.js';
import { results } from './store-results.js';
import { questions } from './store-questions.js';
import { answers } from './store-answers.js';

const { debounce } = lodash;

const combined = combineReducers({intro, results, questions, answers});

export const getNewStore = (data, saveCallback) => {
    const debounceSave = debounce(() => saveCallback(), 500);

    const debounceSaveMiddleware = store => next => action => {
        const returnValue = next(action);
        debounceSave();
        return returnValue;
    }
    return createStore(combined, data ? JSON.parse(data) : undefined, applyMiddleware(debounceSaveMiddleware));
}


