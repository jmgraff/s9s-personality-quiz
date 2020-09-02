import { createStore, combineReducers, applyMiddleware } from 'redux';
import produce from 'immer';

const { debounce } = lodash;

const SET_THING_TITLE = 'SET_THING_TITLE';
const SET_THING_TEXT = 'SET_THING_TEXT';

const initialState = {
    title: '',
    text: ''
}

//actions
export const setThingTitle = (title) => ({ type: SET_THING_TITLE, payload: { title } });
export const setThingText = (text) => ({ type: SET_THING_TEXT, payload: { text } });

//selectors
export const getThing = ({thing}) => thing;

const thing = produce((draft, action) => {
    switch (action.type) {
        case SET_THING_TITLE:
            draft.title = action.payload.title
            break;
        case SET_THING_TEXT:
            draft.text = action.payload.text
            break;
        default:
            return;
    }
}, initialState);

const combined = combineReducers({thing});

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


