import { createStore, combineReducers, applyMiddleware } from 'redux';
import produce from 'immer';

import { intro } from './store-intro.js';
import { results } from './store-results.js';
import { questions } from './store-questions.js';

const { debounce } = lodash;

const combined = combineReducers({intro, results});

export const getNewStore = (data, saveCallback) => {
    const debounceSave = debounce(() => saveCallback(), 500);

    const debounceSaveMiddleware = store => next => action => {
        const returnValue = next(action);
        console.log("debouncing saveCallback...");
        debounceSave();
        return returnValue;
    }
    return createStore(combined, data ? JSON.parse(data) : undefined, applyMiddleware(debounceSaveMiddleware));
}


